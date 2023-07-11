package migrations

import (
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/tools/types"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("et0wg1x7mdn55wc")
		if err != nil {
			return err
		}

		collection.ViewRule = types.Pointer("")

		collection.CreateRule = types.Pointer("")

		collection.UpdateRule = types.Pointer("")

		collection.DeleteRule = types.Pointer("")

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("et0wg1x7mdn55wc")
		if err != nil {
			return err
		}

		collection.ViewRule = nil

		collection.CreateRule = nil

		collection.UpdateRule = nil

		collection.DeleteRule = nil

		return dao.SaveCollection(collection)
	})
}
