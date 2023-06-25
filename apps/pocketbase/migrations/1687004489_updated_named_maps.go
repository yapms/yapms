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

		// add
		new_field := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "mt6pwhgp",
			"name": "field",
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
		}`), new_field)
		collection.Schema.AddField(new_field)

		// add
		new_field1 := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "nxdpu3m4",
			"name": "field1",
			"type": "relation",
			"required": false,
			"unique": false,
			"options": {
				"collectionId": "_pb_users_auth_",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": []
			}
		}`), new_field1)
		collection.Schema.AddField(new_field1)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("t97j5i9c5cv8q2a")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("mt6pwhgp")

		// remove
		collection.Schema.RemoveField("nxdpu3m4")

		return dao.SaveCollection(collection)
	})
}
