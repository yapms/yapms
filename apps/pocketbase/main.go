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

	googleClientID := os.Getenv("GOOGLE_CLIENT_ID")
	googleClientSecret := os.Getenv("GOOGLE_CLIENT_SECRET")

	discordClientID := os.Getenv("DISCORD_CLIENT_ID")
	discordClientSecret := os.Getenv("DISCORD_CLIENT_SECRET")

	// write out file with environment variables
	err := ioutil.WriteFile("env.js", []byte(fmt.Sprintf(`
		window.env = {
			BROWSERLESS_URI: "%s",
			BROWSERLESS_FRONTEND_URI: "%s",
			GOOGLE_CLIENT_ID: "%s",
			GOOGLE_CLIENT_SECRET: "%s",
			DISCORD_CLIENT_ID: "%s",
			DISCORD_CLIENT_SECRET: "%s",
		}
	`, browserlessURI, browserlessFrontendURI, googleClientID, googleClientSecret, discordClientID, discordClientSecret)), 0644)
	if err != nil {
		log.Fatal(err)
	}


	browserlessConnection := flag.String("devtools-ws-url", browserlessURI, "DevTools websocket URL")
	flag.Parse()

	app := pocketbase.New()

	migratecmd.MustRegister(app, app.RootCmd, &migratecmd.Options{
		Automigrate: true,
	})

	app.OnAfterBootstrap().Add(func(e *core.BootstrapEvent) error {
		app.Settings().Meta.AppName = "YAPms"
		app.Settings().Meta.AppUrl = "https://yapms.com"

		app.Settings().GoogleAuth.Enabled = true
		app.Settings().GoogleAuth.ClientId = googleClientID
		app.Settings().GoogleAuth.ClientSecret = googleClientSecret

		app.Settings().DiscordAuth.Enabled = true
		app.Settings().DiscordAuth.ClientId = discordClientID
		app.Settings().DiscordAuth.ClientSecret = discordClientSecret

		return nil
	})

	app.OnFileDownloadRequest().Add(func(e *core.FileDownloadEvent) error {
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

			// open the file
			reader, err := file.Reader.Open()
			if err != nil {
				return err
			}
			defer reader.Close()

			// get the file data
			data, err := ioutil.ReadAll(reader)
			if err != nil {
				return err
			}

			// compress the data
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

			// take a screenshot
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
