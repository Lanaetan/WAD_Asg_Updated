import {SQLiteDatabase, enablePromise, openDatabase} from 'react-native-sqlite-storage';

const databaseName = 'db.sqlite';

// Enable promise for SQLite
enablePromise(true);

export const getDBConnection = async() => {
    return openDatabase(
        {name: `${databaseName}`, createFromLocation: '~db.sqlite'},
        openCallback,
        errorCallback,
    );
}

export const getUsersExceptCurrent = async (
    db: SQLiteDatabase,
    currentUserId: string
  ): Promise<any[]> => {
    try {
      const usersData: any[] = [];
      const query = `SELECT * FROM users WHERE id != ? ORDER BY name`;
      const results = await db.executeSql(query, [currentUserId]);
  
      results.forEach((result: any) => {
        result.rows.raw().forEach((item: any) => {
          usersData.push(item);
        });
      });
      return usersData;
    } catch (error) {
      console.error(error);
      throw Error('Failed to get users excluding current user!');
    }
  };

export const getMessagesBetween = async( 
    db: SQLiteDatabase, 
    currentUserId: string, 
    otherUserId: string 
): Promise<any> => {
    try{
        const chatData : any[] = [];
        const query = `SELECT * FROM messages WHERE receiver_id = ? AND sender_id = ? OR receiver_id = ? AND sender_id = ? ORDER BY created_at ASC`;
        const parameters = [currentUserId, otherUserId, otherUserId, currentUserId];
        const results = await db.executeSql(query, parameters);
        results.forEach((result: any) => {
        (result.rows.raw()).forEach(( item:any ) => {
            chatData.push(item);
        })
        });
        return chatData;
    }catch (error) {
        console.error(error);
        throw Error('Failed to get chat data !!!');
    }
}

export const createMessage = async( 
    db: SQLiteDatabase,
    receiver_id: string,
    sender_id: string,
    text: string,
) => {
try{
    const query = `INSERT INTO messages (receiver_id, sender_id, text, created_at) VALUES (?, ?, ?, datetime('now'))`;
    const parameters = [receiver_id, sender_id, text];
    await db.executeSql(query,parameters);
  } catch (error) {
    console.error(error);
    throw Error('Failed to create message !!!');
  }
}

export const getLastMessage = async (
  db: SQLiteDatabase,
  currentUserId: string,
  otherUserId: string
): Promise<any> => {
  try {
    const query = `
      SELECT * FROM messages
      WHERE 
        (receiver_id = ? AND sender_id = ?) 
        OR 
        (receiver_id = ? AND sender_id = ?)
      ORDER BY created_at DESC
      LIMIT 1
    `;
    const parameters = [currentUserId, otherUserId, otherUserId, currentUserId];
    const results = await db.executeSql(query, parameters);

    if (results.length > 0 && results[0].rows.length > 0) {
      return results[0].rows.item(0); // return the last (most recent) message
    }

    return null; // no messages found
  } catch (error) {
    console.error(error);
    throw Error('Failed to get last message!');
  }
};


const openCallback = () => {
    console.log('database open success');
}

const errorCallback = (err: any) => {
    console.log('Error in opening the database: ' + err);
}