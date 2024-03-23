package support

import (
	"bytes"
	"context"
	"fmt"
	"image/png"
	_ "image/png"

	"github.com/chromedp/chromedp"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/tools/filesystem"
	"github.com/yapms/gopngquant"
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
		chromedp.WaitVisible("#map-div > svg", chromedp.ByQuery),
		chromedp.FullScreenshot(&screenshotBuffer, 100),
	)
	if err != nil {
		fmt.Println("error: ", err)
		return nil
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
		return nil
	}
	newFile.Name = "screenshot.png"

	// update record
	form := forms.NewRecordUpsert(app, e.Record)
	form.AddFiles("screenshot", newFile)
	form.Submit()
	if err != nil {
		fmt.Println("error: ", err)
		return nil
	}

	return nil
}

func compressImage(input []byte) ([]byte, error) {
	// parse image from bytes
	img, err := png.Decode(bytes.NewReader(input))
	if err != nil {
		return nil, err
	}

	// compress image
	img, err = gopngquant.CompressImage(img, gopngquant.Options{
		Speed:         1,
		MinQuality:    0,
		TargetQuality: 50,
	})
	if err != nil {
		return nil, err
	}

	// convert image back to bytes
	buffer := new(bytes.Buffer)
	encoder := png.Encoder{
		CompressionLevel: png.BestCompression,
	}
	encoder.Encode(buffer, img)
	return buffer.Bytes(), nil
}
