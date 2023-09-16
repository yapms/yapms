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

		collection, err := dao.FindCollectionByNameOrId("s7hqm68a88yjzkt")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("fvwa3tol")

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("s7hqm68a88yjzkt")
		if err != nil {
			return err
		}

		// add
		del_category := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "fvwa3tol",
			"name": "category",
			"type": "text",
			"required": false,
			"presentable": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), del_category)
		collection.Schema.AddField(del_category)

		return dao.SaveCollection(collection)
	})
}
