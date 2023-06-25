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

		collection.Name = "named_maps"

		// remove
		collection.Schema.RemoveField("7u4xq9ne")

		// add
		new_name := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "g6h9trbx",
			"name": "name",
			"type": "text",
			"required": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), new_name)
		collection.Schema.AddField(new_name)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("t97j5i9c5cv8q2a")
		if err != nil {
			return err
		}

		collection.Name = "test"

		// add
		del_test := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "7u4xq9ne",
			"name": "test",
			"type": "json",
			"required": false,
			"unique": false,
			"options": {}
		}`), del_test)
		collection.Schema.AddField(del_test)

		// remove
		collection.Schema.RemoveField("g6h9trbx")

		return dao.SaveCollection(collection)
	})
}
