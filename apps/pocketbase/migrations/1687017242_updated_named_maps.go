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

		collection, err := dao.FindCollectionByNameOrId("t97j5i9c5cv8q2a")
		if err != nil {
			return err
		}

		// update
		edit_data := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "mt6pwhgp",
			"name": "data",
			"type": "file",
			"required": false,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"maxSize": 5242880,
				"mimeTypes": [],
				"thumbs": [],
				"protected": false
			}
		}`), edit_data)
		collection.Schema.AddField(edit_data)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("t97j5i9c5cv8q2a")
		if err != nil {
			return err
		}

		// update
		edit_data := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "mt6pwhgp",
			"name": "data",
			"type": "file",
			"required": true,
			"unique": false,
			"options": {
				"maxSelect": 1,
				"maxSize": 5242880,
				"mimeTypes": [],
				"thumbs": [],
				"protected": false
			}
		}`), edit_data)
		collection.Schema.AddField(edit_data)

		return dao.SaveCollection(collection)
	})
}
