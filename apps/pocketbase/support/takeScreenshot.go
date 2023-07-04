package support

import (
	"context"
	"fmt"

	"github.com/chromedp/chromedp"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/tools/filesystem"
)

func TakeScreenshot(e *core.RecordCreateEvent, app *pocketbase.PocketBase, browserlessURI *string, browserlessFrontendURI *string) error {
	// create a screenshot with browserless
	ctx, cancel := chromedp.NewRemoteAllocator(context.Background(), *browserlessURI)
	defer cancel()
	ctx, cancel = chromedp.NewContext(ctx)
	defer cancel()

	// take a screenshot
	var screenshotBuffer []byte
	err := chromedp.Run(ctx,
		chromedp.EmulateViewport(1200, 900),
		chromedp.Navigate(*browserlessFrontendURI+"/view?m="+e.Record.Id),
		chromedp.WaitReady("#map-div > svg", chromedp.ByQuery),
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

	return nil
}
