package main

import (
	"bytes"
	"compress/gzip"
	"fmt"
	"io/ioutil"
	"log"
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
				fmt.Println("A")
				record := models.NewRecord(mapsCollection)
				form := forms.NewRecordUpsert(app, record)

				body, err := ioutil.ReadAll(c.Request().Body)
				if err != nil {
					return err
				}
				fmt.Println("B")

				var buffer bytes.Buffer

				gzip := gzip.NewWriter(&buffer)
				if _, err := gzip.Write(body); err != nil {
					return err
				}
				fmt.Println("C")

				if err := gzip.Close(); err != nil {
					return err
				}
				fmt.Println("D")

			
				myfile, nil := filesystem.NewFileFromPath("./file1.txt")
				if err != nil {
					fmt.Println("ERROR: ", err)
					return err
				}
				fmt.Println("E")
				myfile.Reader.Open()
				form.AddFiles("data", myfile)

				err = form.Submit()
				if err != nil {
					return err
				}
				fmt.Println("F")
				fmt.Printf("%s\n", body)
				fmt.Printf("%s\n", buffer.Bytes())

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