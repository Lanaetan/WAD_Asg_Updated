import {SQLiteDatabase, enablePromise, openDatabase} from 'react-native-sqlite-storage';

const databaseName = 'db.sqlite';

// Enable promise for SQLite
enablePromise(true);

let dbInstance: SQLiteDatabase | null = null;

export const getDBConnection = async() => {
  if (dbInstance) {
    return dbInstance;
  }

  dbInstance = await openDatabase(
    { name: databaseName, createFromLocation: '~db.sqlite' },
    openCallback,
    errorCallback
  );
  return dbInstance;
}

const openCallback = () => {
    console.log('database open success');
}

const errorCallback = (err: any) => {
    console.log('Error in opening the database: ' + err);
}