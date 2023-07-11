package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		jsonData := `{
			"id": "et0wg1x7mdn55wc",
			"created": "2023-06-25 12:59:30.966Z",
			"updated": "2023-06-25 12:59:30.966Z",
			"name": "user_maps",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "oanxt6tc",
					"name": "name",
					"type": "text",
					"required": true,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"pattern": ""
					}
				},
				{
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
				},
				{
					"system": false,
					"id": "dyxszfnw",
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
				}
			],
			"indexes": [],
			"listRule": null,
			"viewRule": null,
			"createRule": null,
			"updateRule": null,
			"deleteRule": null,
			"options": {}
		}`

		collection := &models.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return daos.New(db).SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("et0wg1x7mdn55wc")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}
