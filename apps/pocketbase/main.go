package main

import (
	"bytes"
	"compress/gzip"
	"crypto/md5"
	"encoding/base64"
	"fmt"
	"io/ioutil"
	"log"
	"mime/multipart"
	"net/http"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/tools/filesystem"
)

func main() {
	app := pocketbase.New()

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

				// if the submition failed, find if there is an existing record with the same hash
				if err != nil {
					// if the hash exists, return the existing record
					existingRecord, err := app.Dao().FindFirstRecordByData("maps", "hash", hashEncoded)
					if err != nil {
						return err
					}
					if existingRecord != nil {
						return c.JSON(http.StatusOK, existingRecord)
					}
					return err
				}

				// return the new record
				return c.JSON(http.StatusOK, record)
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