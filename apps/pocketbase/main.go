package main

import (
	"log"
	"os"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"

	_ "yapms/pocketbase/migrations"
	"yapms/pocketbase/support"
)

func main() {

	browserlessURI := os.Getenv("BROWSERLESS_URI")
	browserlessFrontendURI := os.Getenv("BROWSERLESS_FRONTEND_URI")
	turnstileSecret := os.Getenv("TURNSTILE_SECRET")

	app := pocketbase.New()

	migratecmd.MustRegister(app, app.RootCmd, &migratecmd.Options{
		Automigrate: true,
	})

	app.OnFileDownloadRequest().Add(func(e *core.FileDownloadEvent) error {
		if e.FileField.Name == "data" {
			e.HttpContext.Response().Header().Set("Content-Encoding", "gzip")
		}
		return nil
	})

	app.OnRecordBeforeCreateRequest().Add(func(e *core.RecordCreateEvent) error {
		if e.Record.Collection().Name == "maps" {
			err := support.VerifyCaptcha(e, &turnstileSecret)
			if err != nil {
				return apis.NewBadRequestError(
					"Failed to verify captcha",
					err,
				)
			}
			support.CompressMapData(e)
		} else if e.Record.Collection().Name == "user_maps" {
			support.CompressMapData(e)
		}
		return nil
	})

	app.OnRecordAfterCreateRequest().Add(func(e *core.RecordCreateEvent) error {
		if e.Record.Collection().Name == "maps" {
			support.TakeScreenshot(e, app, &browserlessURI, &browserlessFrontendURI)
		}
		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
