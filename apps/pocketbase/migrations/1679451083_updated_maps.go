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
		edit_screenshot := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "q3odadwo",
			"name": "screenshot",
			"type": "file",
			"required": false,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"maxSize": 5242880,
				"mimeTypes": [
					"image/webp"
				],
				"thumbs": []
			}
		}`), edit_screenshot)
		collection.Schema.AddField(edit_screenshot)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("tgcm0cd7l7jj0ze")
		if err != nil {
			return err
		}

		// update
		edit_screenshot := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "q3odadwo",
			"name": "image",
			"type": "file",
			"required": false,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"maxSize": 5242880,
				"mimeTypes": [
					"image/webp"
				],
				"thumbs": []
			}
		}`), edit_screenshot)
		collection.Schema.AddField(edit_screenshot)

		return dao.SaveCollection(collection)
	})
}
