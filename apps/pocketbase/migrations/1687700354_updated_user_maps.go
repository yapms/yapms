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

		collection, err := dao.FindCollectionByNameOrId("et0wg1x7mdn55wc")
		if err != nil {
			return err
		}

		// update
		edit_data := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "c4cbfhux",
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
				"thumbs": [],
				"protected": false
			}
		}`), edit_data)
		collection.Schema.AddField(edit_data)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("et0wg1x7mdn55wc")
		if err != nil {
			return err
		}

		// update
		edit_data := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "c4cbfhux",
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
				"thumbs": [],
				"protected": false
			}
		}`), edit_data)
		collection.Schema.AddField(edit_data)

		return dao.SaveCollection(collection)
	})
}
