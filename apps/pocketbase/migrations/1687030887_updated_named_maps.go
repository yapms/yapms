package migrations

import (
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("t97j5i9c5cv8q2a")
		if err != nil {
			return err
		}

		collection.Name = "account_maps"

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("t97j5i9c5cv8q2a")
		if err != nil {
			return err
		}

		collection.Name = "named_maps"

		return dao.SaveCollection(collection)
	})
}
