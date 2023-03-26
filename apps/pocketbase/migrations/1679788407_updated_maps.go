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
		edit_hash := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "eh3qiu7y",
			"name": "hash",
			"type": "text",
			"required": false,
			"unique": true,
			"options": {
				"min": 24,
				"max": 24,
				"pattern": ""
			}
		}`), edit_hash)
		collection.Schema.AddField(edit_hash)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("tgcm0cd7l7jj0ze")
		if err != nil {
			return err
		}

		// update
		edit_hash := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "eh3qiu7y",
			"name": "hash",
			"type": "text",
			"required": true,
			"unique": true,
			"options": {
				"min": 24,
				"max": 24,
				"pattern": ""
			}
		}`), edit_hash)
		collection.Schema.AddField(edit_hash)

		return dao.SaveCollection(collection)
	})
}
