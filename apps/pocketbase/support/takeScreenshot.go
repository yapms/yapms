package support

import (
	"bytes"
	"context"
	"fmt"
	"os/exec"
	"strings"

	"github.com/chromedp/chromedp"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/filesystem"
)

func TakeScreenshot(e *core.RecordEvent, app *pocketbase.PocketBase, browserlessURI *string, browserlessFrontendURI *string) error {
	// create a screenshot with browserless
	allocator, cancel := chromedp.NewRemoteAllocator(context.Background(), *browserlessURI, chromedp.NoModifyURL)
	defer cancel()
	ctx, cancel := chromedp.NewContext(allocator)
	defer cancel()

	// take a screenshot
	var screenshotBuffer []byte
	err := chromedp.Run(ctx,
		chromedp.EmulateViewport(1200, 900),
		chromedp.Navigate(*browserlessFrontendURI+"/view?m="+e.Record.Id),
		chromedp.WaitVisible("#map-div > svg", chromedp.ByQuery),
		chromedp.FullScreenshot(&screenshotBuffer, 100),
	)
	if err != nil {
		fmt.Println("error: ", err)
		return err
	}

	// compress the byte data
	screenshotBuffer, err = compressImage(screenshotBuffer)
	if err != nil {
		fmt.Println("error: ", err)
	}

	// create a file from the screenshot
	newFile, err := filesystem.NewFileFromBytes(screenshotBuffer, "screenshot.png")
	if err != nil {
		fmt.Println("error: ", err)
		return err
	}
	newFile.Name = "screenshot.png"

	// update record
	e.Record.Set("screenshot", newFile)
	err = app.Save(e.Record)
	if err != nil {
		fmt.Println("error: ", err)
		return err
	}

	return nil
}

func compressImage(input []byte) (output []byte, err error) {
	cmd := exec.Command("pngquant", "-", "--quality=0-50", "-s1")
	cmd.Stdin = strings.NewReader(string(input))
	var out bytes.Buffer
	cmd.Stdout = &out
	err = cmd.Run()
	if err != nil {
		output = input
		return
	}
	output = out.Bytes()
	return
}
