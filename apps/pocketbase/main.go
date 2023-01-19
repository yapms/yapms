package main

import (
	"bytes"
	"compress/gzip"
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


	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {

		e.Router.AddRoute(echo.Route{
			Method: http.MethodPost,
			Path: "/api/yapms.com/map",
			Handler: func(c echo.Context) error {
				mapsCollection, err := app.Dao().FindCollectionByNameOrId("maps")
				if err != nil {
					return err
				}
				record := models.NewRecord(mapsCollection)
				form := forms.NewRecordUpsert(app, record)

				body, err := ioutil.ReadAll(c.Request().Body)
				if err != nil {
					return err
				}

				var buffer bytes.Buffer

				gzip := gzip.NewWriter(&buffer)
				if _, err := gzip.Write(body); err != nil {
					return err
				}

				if err := gzip.Close(); err != nil {
					return err
				}

				fmt.Printf("%s\n", body)
				fmt.Printf("%s\n", buffer.Bytes())

				reader := filesystem.MultipartReader{
					&multipart.FileHeader{
						Filename: "data",
						Size:     int64(buffer.Len()),
						Header:  http.Header{
							"Content-Type": []string{"application/gzip"},
						},
					},
				}
				form.AddFiles("data", &file)

				return c.JSON(http.StatusOK, "Hello World")
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