import RNFS from 'react-native-fs';
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const DB_NAME = 'db.sqlite';
const DB_PATH = `${RNFS.DocumentDirectoryPath}/${DB_NAME}`;

export const initDatabase = async () => {
  try {
    const exists = await RNFS.exists(DB_PATH);
    if (exists) {
      await RNFS.unlink(DB_PATH);
      console.log('Old DB deleted');
    }

    const db = await SQLite.openDatabase({ name: DB_NAME, createFromLocation: 1 });
    console.log('DB reloaded from assets');
    return db;
  } catch (error) {
    console.error('DB init failed:', error);
  }
};