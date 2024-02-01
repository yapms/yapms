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

		collection, err := dao.FindCollectionByNameOrId("08wj68yrk4qteyk")
		if err != nil {
			return err
		}

		// update
		edit_image := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "p30riyjh",
			"name": "image",
			"type": "file",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"mimeTypes": [],
				"thumbs": [],
				"maxSelect": 1,
				"maxSize": 5242880,
				"protected": false
			}
		}`), edit_image)
		collection.Schema.AddField(edit_image)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("08wj68yrk4qteyk")
		if err != nil {
			return err
		}

		// update
		edit_image := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "p30riyjh",
			"name": "field",
			"type": "file",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"mimeTypes": [],
				"thumbs": [],
				"maxSelect": 1,
				"maxSize": 5242880,
				"protected": false
			}
		}`), edit_image)
		collection.Schema.AddField(edit_image)

		return dao.SaveCollection(collection)
	})
}
