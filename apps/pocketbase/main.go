package main

import (
	"log"
	"os"
	"strings"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"

	_ "yapms/pocketbase/migrations"
	"yapms/pocketbase/support"
)

func main() {

	browserlessURI := os.Getenv("BROWSERLESS_URI")
	browserlessFrontendURI := os.Getenv("BROWSERLESS_FRONTEND_URI")
	turnstileSecret := os.Getenv("TURNSTILE_SECRET")

	app := pocketbase.New()

	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		Automigrate: true,
	})

	app.OnFileDownloadRequest().Add(func(e *core.FileDownloadEvent) error {
		if e.FileField.Name == "data" {
			e.HttpContext.Response().Header().Set("Content-Encoding", "gzip")
			e.HttpContext.Response().Header().Set("Content-Disposition", "inline")
		}
		return nil
	})

	app.OnRecordBeforeCreateRequest("user_maps").Add(func(e *core.RecordCreateEvent) error {
		err := support.CompressMapData(e)
		if err != nil {
			return apis.NewApiError(
				500,
				err.Error(),
				nil,
			)
		}
		return nil
	})

	app.OnRecordBeforeCreateRequest("maps").Add(func(e *core.RecordCreateEvent) error {

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
		return nil
	})

	app.OnRecordAfterCreateRequest("maps").Add(func(e *core.RecordCreateEvent) error {
		go support.TakeScreenshot(e, app, &browserlessURI, &browserlessFrontendURI)
		return nil
	})

	app.OnRecordsListRequest("updates", "social_links").Add(func(e *core.RecordsListEvent) error {
		admin, _ := e.HttpContext.Get(apis.ContextAdminKey).(*models.Admin)
		if admin == nil {
			e.HttpContext.Response().Header().Set("Cache-Control", "max-age=86400")
		}
		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
