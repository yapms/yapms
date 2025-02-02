package support

import (
	"bytes"
	"compress/gzip"
	"errors"
	"io"

	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/filesystem"
)

func CompressMapData(e *core.RecordRequestEvent) error {
	// get the file
	files, err := e.FindUploadedFiles("data")
	if err != nil {
		return err
	}
	if len(files) < 1 {
		return errors.New("no files found")
	}

	// get file reader
	reader, err := files[0].Reader.Open()
	if err != nil {
		return err
	}
	defer reader.Close()

	// read file into buffer
	buffer, err := io.ReadAll(reader)
	if err != nil {
		return err
	}

	// compress the data
	var compressedData bytes.Buffer
	gzip := gzip.NewWriter(&compressedData)
	_, err = gzip.Write(buffer)
	if err != nil {
		return err
	}
	err = gzip.Close()
	if err != nil {
		return err
	}

	// if more than 500000 bytes, then don't upload
	if len(compressedData.Bytes()) > 500000 {
		return errors.New("compressed file too big")
	}

	// create a file from the compressed data
	newFile, err := filesystem.NewFileFromBytes(compressedData.Bytes(), "data.json.gz")
	newFile.Name = "data.json.gz"
	if err != nil {
		return err
	}

	if newFile.Size > 500000 {
		return errors.New("compressed file too big")
	}

	// change the file name to .json.gz
	e.Record.Set("data", newFile)

	return nil
}
