package migrations

import (
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("s7hqm68a88yjzkt")
		if err != nil {
			return err
		}

		collection.Name = "social_links"

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("s7hqm68a88yjzkt")
		if err != nil {
			return err
		}

		collection.Name = "links"

		return dao.SaveCollection(collection)
	})
}
