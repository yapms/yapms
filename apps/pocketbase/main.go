package main

import (
	"log"
	"os"
	"strings"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"

	"yapms/pocketbase/support"

	_ "yapms/pocketbase/migrations"
)

func main() {

	browserlessURI := os.Getenv("BROWSERLESS_URI")
	browserlessFrontendURI := os.Getenv("BROWSERLESS_FRONTEND_URI")
	turnstileSecret := os.Getenv("TURNSTILE_SECRET")

	app := pocketbase.New()

	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		Automigrate: true,
	})

	app.OnFileDownloadRequest().BindFunc(func(e *core.FileDownloadRequestEvent) error {
		if e.FileField.Name == "data" {
			e.Response.Header().Set("Content-Encoding", "gzip")
			e.Response.Header().Set("Content-Disposition", "inline")
		}
		return e.Next()
	})

	app.OnRecordCreateRequest("user_maps").BindFunc(func(e *core.RecordRequestEvent) error {
		err := support.CompressMapData(e)
		if err != nil {
			return apis.NewApiError(
				500,
				err.Error(),
				nil,
			)
		}
		return e.Next()
	})

	app.OnRecordCreateRequest("maps").BindFunc(func(e *core.RecordRequestEvent) error {
		response, err := support.VerifyCaptcha(e, &turnstileSecret)

		if err != nil {
			return apis.NewApiError(
				500,
				err.Error(),
				nil,
			)
		}

		if response.Success == false {
			return apis.NewForbiddenError(
				strings.Join(response.ErrorCodes, ","),
				nil,
			)
		}

		err = support.CompressMapData(e)
		if err != nil {
			return apis.NewApiError(
				500,
				err.Error(),
				nil,
			)
		}

		return e.Next()
	})

	app.OnRecordAfterCreateSuccess("maps").BindFunc(func(e *core.RecordEvent) error {
		go support.TakeScreenshot(e, app, &browserlessURI, &browserlessFrontendURI)
		return e.Next()
	})

	app.OnRecordsListRequest("updates", "social_links").BindFunc(func(e *core.RecordsListRequestEvent) error {
		if e.HasSuperuserAuth() == false {
			e.Response.Header().Set("Cache-Control", "max-age=86400")
		}
		return e.Next()
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
