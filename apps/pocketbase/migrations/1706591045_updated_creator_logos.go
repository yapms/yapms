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
		edit_label := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "6zoeojdo",
			"name": "label",
			"type": "text",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), edit_label)
		collection.Schema.AddField(edit_label)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("08wj68yrk4qteyk")
		if err != nil {
			return err
		}

		// update
		edit_label := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "6zoeojdo",
			"name": "title",
			"type": "text",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), edit_label)
		collection.Schema.AddField(edit_label)

		return dao.SaveCollection(collection)
	})
}
