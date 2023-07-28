package support

import (
	"bytes"
	"compress/gzip"
	"io"

	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/filesystem"
)

func CompressMapData(e *core.RecordCreateEvent) error {
	file := e.UploadedFiles["data"][0]

	// open the file
	reader, err := file.Reader.Open()
	if err != nil {
		return err
	}
	defer reader.Close()

	// get the file data
	data, err := io.ReadAll(reader)
	if err != nil {
		return err
	}

	// compress the data
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

	// create a file from the compressed data
	newFile, err := filesystem.NewFileFromBytes(compressedData.Bytes(), "data.json.gz")
	newFile.Name = "data.json.gz"
	if err != nil {
		return err
	}

	// set the file to the new file
	e.UploadedFiles["data"][0] = newFile

	// change the file name to .json.gz
	e.Record.Set("data", "data.json.gz")

	return nil
}

