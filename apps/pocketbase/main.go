package main

import (
	"bytes"
	"compress/gzip"
	"context"
	"crypto/md5"
	"encoding/base64"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"mime/multipart"
	"net/http"
	"os"

	"github.com/chromedp/chromedp"
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/models"
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

	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {

		e.Router.AddRoute(echo.Route{
			Method: http.MethodGet,
			Path: "/api/yapms.com/test",
			Handler: func(c echo.Context) error {
				return c.String(http.StatusOK, "test")
			},
			Middlewares: []echo.MiddlewareFunc{
				apis.ActivityLogger(app),
			},
		})

		e.Router.AddRoute(echo.Route{
			Method: http.MethodPost,
			Path: "/api/yapms.com/map",
			Handler: func(c echo.Context) error {

				// get the maps collection
				mapsCollection, err := app.Dao().FindCollectionByNameOrId("maps")
				if err != nil {
					return err
				}
			
				// create a new record to be inserted
				record := models.NewRecord(mapsCollection)
				form := forms.NewRecordUpsert(app, record)

				// parse the multipart form
				c.Request().ParseMultipartForm(0)

				// get the file from the form
				file, _, err := c.Request().FormFile("data")
				if err != nil {
					return err
				}
				defer file.Close()

				// read the file
				data, err := ioutil.ReadAll(file)
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

				// generate a hash of the compressed data
				hash := md5.Sum(compressedData.Bytes())
				hashEncoded := base64.StdEncoding.EncodeToString(hash[:])
				form.LoadData(map[string]any{
					"hash": hashEncoded,
				})

				// check if the hash already exists
				existingRecord, _ := app.Dao().FindFirstRecordByData("maps", "hash", hashEncoded)
				if existingRecord != nil {
					return c.JSON(http.StatusOK, MapRouteReturn{
						Id: existingRecord.Id,
					})
				}

				// create a multipart writer to create a form
				var newMultipartData bytes.Buffer
				writer := multipart.NewWriter(&newMultipartData)
				fileWriter, err := writer.CreateFormFile("data", "temp")
				if err != nil {
					return err
				}

				// write the compressed data to memory
				_, err = fileWriter.Write(compressedData.Bytes())
				if err != nil {
					return err
				}
				writer.Close()

				// create a new multipart reader
				newMultipartReader := multipart.NewReader(&newMultipartData, writer.Boundary())

				// read the form from the reader
				newForm, err := newMultipartReader.ReadForm(0)
				if err != nil {
					fmt.Println("ERROR: ", err)
					return err
				}

				// create a new file from the form
				newFile, err := filesystem.NewFileFromMultipart(newForm.File["data"][0])
				newFile.Name = "data.json.gz"
				if err != nil {
					return err
				}

				// add the file to the form
				err = form.AddFiles("data", newFile)
				if err != nil {
					return err
				}

				// submit the form & create the record
				err = form.Submit()
				if err != nil {
					return err
				}

				// create a new browserless context
				allocatorContext, cancel := chromedp.NewRemoteAllocator(context.Background(), *browserlessConnection)
				defer cancel()

				/*ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
				defer cancel()*/
				ctx, cancel := chromedp.NewContext(allocatorContext)
				defer cancel()

				// create a new browserless task
				var screenshot []byte
				if err := chromedp.Run(ctx,
					chromedp.EmulateViewport(1600, 900),
					chromedp.Navigate(browserlessFrontendURI + "/app?m=" + record.Id),
					chromedp.WaitReady("#testing-map"),
					chromedp.FullScreenshot(&screenshot, 100),
				); err != nil {
					log.Default().Println(err)
					// return the new record
					return c.JSON(http.StatusOK, MapRouteReturn{
						Id: record.Id,
					})
				}

				// create a new file from the screenshot
				screenshotFile, err := filesystem.NewFileFromBytes(screenshot, "screenshot.png")
				if err != nil {
					log.Default().Println(err)
					// return the new record
					return c.JSON(http.StatusOK, MapRouteReturn{
						Id: record.Id,
					})
				}

				// add the screenshot to the form
				form = forms.NewRecordUpsert(app, record)
				form.AddFiles("screenshot", screenshotFile)

				// submit the form & create the record
				err = form.Submit()
				if err != nil {
					log.Default().Println(err)
					// return the new record
					return c.JSON(http.StatusOK, MapRouteReturn{
						Id: record.Id,
					})
				}

				// return the new record
				return c.JSON(http.StatusOK, MapRouteReturn{
					Id: record.Id,
				})
			},
			Middlewares: []echo.MiddlewareFunc{
				apis.ActivityLogger(app),
			},
		})

		return nil

	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}