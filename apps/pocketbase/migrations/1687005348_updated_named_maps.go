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
		edit_user2 := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "nxdpu3m4",
			"name": "user2",
			"type": "relation",
			"required": true,
			"unique": false,
			"options": {
				"collectionId": "_pb_users_auth_",
				"cascadeDelete": true,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": []
			}
		}`), edit_user2)
		collection.Schema.AddField(edit_user2)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("t97j5i9c5cv8q2a")
		if err != nil {
			return err
		}

		// update
		edit_user2 := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "nxdpu3m4",
			"name": "user",
			"type": "relation",
			"required": true,
			"unique": false,
			"options": {
				"collectionId": "_pb_users_auth_",
				"cascadeDelete": true,
				"minSelect": null,
				"maxSelect": 1,
				"displayFields": []
			}
		}`), edit_user2)
		collection.Schema.AddField(edit_user2)

		return dao.SaveCollection(collection)
	})
}
