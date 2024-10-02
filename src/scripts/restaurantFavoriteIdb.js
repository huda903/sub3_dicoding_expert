import { openDB } from 'idb';

const DATABASE_NAME = 'restaurant-database';
const OBJECT_STORE_NAME = 'restaurant';

const dbPromise = openDB(DATABASE_NAME, 1, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const semuaDataFavorite = async () => (await dbPromise).getAll(OBJECT_STORE_NAME);

const tambahFavorite = async (resto) => (await dbPromise).put(OBJECT_STORE_NAME, resto);

const hapusFavorite = async (id) => (await dbPromise).delete(OBJECT_STORE_NAME, id);

const ngecekFavorite = async (id) => {
  const db = await dbPromise;
  const item = await db.get(OBJECT_STORE_NAME, id);
  return !!item;
};

export {
  semuaDataFavorite, tambahFavorite, hapusFavorite, ngecekFavorite,
};
