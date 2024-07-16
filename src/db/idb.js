import { openDB } from 'idb';

const DB_NAME = 'movie-watchlist';
const STORE_NAME = 'users';

const initDB = async () => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'email' });
      }
    },
  });
  return db;
};

export const addUser = async (user) => {
  const db = await initDB();
  await db.put(STORE_NAME, user);
};

export const getUserByEmail = async (email) => {
  const db = await initDB();
  return await db.get(STORE_NAME, email);
};

export const getAllUsers = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};

export const updateUser = async (user) => {
  const db = await initDB();
  await db.put(STORE_NAME, user);
};
