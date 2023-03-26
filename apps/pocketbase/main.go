package main

import (
	"bytes"
	"compress/gzip"
	"context"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"os"

	"github.com/chromedp/chromedp"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
	"github.com/pocketbase/pocketbase/tools/filesystem"

	_ "yapms/pocketbase/migrations"
)

type MapRouteReturn struct {
	Id string `json:"id"`
}

func main() {

	browserlessURI := os.Getenv("BROWSERLESS_URI")
	browserlessFrontendURI := os.Getenv("BROWSERLESS_FRONTEND_URI")
	fmt.Println("BROWSERLESS_URI: ", browserlessURI)

	app := pocketbase.New()

	browserlessConnection := flag.String("devtools-ws-url", browserlessURI, "DevTools websocket URL")
	flag.Parse()

	migratecmd.MustRegister(app, app.RootCmd, &migratecmd.Options{
		Automigrate: true,
	})

	app.OnFileDownloadRequest().Add(func (e *core.FileDownloadEvent) error {
		// if the file is the data file, set the content encoding to gzip
		if e.FileField.Name == "data" {
			e.HttpContext.Response().Header().Set("Content-Encoding", "gzip")
			e.HttpContext.Response().Header().Set("Cache-Control", "max-age=31536000, immutable")
		}
		return nil
	})

	app.OnRecordBeforeCreateRequest().Add(func (e *core.RecordCreateEvent) error {
		// if the record is in the maps collection, set the hash
		if e.Record.Collection().Name == "maps" {

			file := e.UploadedFiles["data"][0]

			reader, err := file.Reader.Open()
			if err != nil {
				return err
			}
			defer reader.Close()

			// read the file
			data, err := ioutil.ReadAll(reader)
			if err != nil {
				return err
			}

			// compress the file in memory
			var compressedData bytes.Buffer
			gzip := gzip.NewWriter(&compressedData)
			_, err = gzip.Write(data)
			if err != nil {
				return err
			}
			err = gzip.Close()
			if err != nil {
				return err
			}

			// create a file from the compressed data
			newFile, err := filesystem.NewFileFromBytes(compressedData.Bytes(), "data.json.gz")
			newFile.Name = "data.json.gz"
			if err != nil {
				return err
			}

			// set the file to the new file
			e.UploadedFiles["data"][0] = newFile	

			// change the file name to .json.gz
			e.Record.Set("data", "data.json.gz")
		}
		return nil
	})

	app.OnRecordAfterCreateRequest().Add(func (e *core.RecordCreateEvent) error {
		if e.Record.Collection().Name == "maps" {

			// create a screenshot with browserless
			ctx, cancel := chromedp.NewRemoteAllocator(context.Background(), *browserlessConnection)
			defer cancel()
			ctx, cancel = chromedp.NewContext(ctx)
			defer cancel()

			var screenshotBuffer []byte
			err := chromedp.Run(ctx,
				chromedp.EmulateViewport(1600, 900),
				chromedp.Navigate(browserlessFrontendURI + "/app?m=" + e.Record.Id),
				chromedp.WaitReady("#testing-map"),
				chromedp.FullScreenshot(&screenshotBuffer, 100),
			)
			if err != nil {
				fmt.Println("ERROR: ", err)
				return nil
			}

			// create a file from the screenshot
			newFile, err := filesystem.NewFileFromBytes(screenshotBuffer, "screenshot.png")
			if err != nil {
				fmt.Println("ERROR: ", err)
				return nil
			}
			newFile.Name = "screenshot.png"

			// update record
			form := forms.NewRecordUpsert(app, e.Record)
			form.AddFiles("screenshot", newFile)
			form.Submit()
			if err != nil {
				fmt.Println("ERROR: ", err)
				return nil
			}
		}
		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}