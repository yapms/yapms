package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models/schema"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("tgcm0cd7l7jj0ze")
		if err != nil {
			return err
		}

		// update
		edit_data := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "seh7ma4x",
			"name": "data",
			"type": "file",
			"required": true,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"maxSize": 250000,
				"mimeTypes": [
					"application/gzip",
					"application/json"
				],
				"thumbs": []
			}
		}`), edit_data)
		collection.Schema.AddField(edit_data)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("tgcm0cd7l7jj0ze")
		if err != nil {
			return err
		}

		// update
		edit_data := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "seh7ma4x",
			"name": "data",
			"type": "file",
			"required": true,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"maxSize": 250000,
				"mimeTypes": [
					"application/gzip"
				],
				"thumbs": []
			}
		}`), edit_data)
		collection.Schema.AddField(edit_data)

		return dao.SaveCollection(collection)
	})
}
