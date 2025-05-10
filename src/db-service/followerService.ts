import {SQLiteDatabase} from 'react-native-sqlite-storage';

export const getFollowersById = async( db: SQLiteDatabase, userId: string ): Promise<any> => {
  try{
      const followersData : any = [];
      const query = `SELECT * FROM followers WHERE user_id=?`;
      const results = await db.executeSql(query,[userId]);
      results.forEach((result: any) => {
          (result.rows.raw()).forEach(( item:any ) => {
              followersData.push(item);
          })
        });
      return followersData;
    } catch (error) {
      console.error(error);
      throw Error('Failed to get followers !!!');
    }
}

export const getFollowingById = async( db: SQLiteDatabase, userId: string ): Promise<any> => {
  try{
      const followingData : any = [];
      const query = `SELECT * FROM followers WHERE follower_id=?`;
      const results = await db.executeSql(query,[userId]);
      results.forEach((result: any) => {
          (result.rows.raw()).forEach(( item:any ) => {
              followingData.push(item);
          })
        });
      return followingData;
    } catch (error) {
      console.error(error);
      throw Error('Failed to get following users !!!');
    }
}


export const createFollower = async( 
        db: SQLiteDatabase,
        user_id: string,
        follower_id: string,
    ) => {
    const check = await db.executeSql(
        `SELECT 1 FROM followers WHERE user_id = ? AND follower_id = ?`,
        [user_id, follower_id]
    );
    if (check[0].rows.length > 0) {
        throw new Error("Follower already exists.");
    }
    try{
        const query = 'INSERT INTO followers(user_id, follower_id) VALUES(?,?)';
        const parameters = [user_id, follower_id]
        await db.executeSql(query,parameters);
      } catch (error) {
        console.error(error);
        throw Error('Failed to create follower !!!');
      }
}

export const deleteFollower = async( 
  db: SQLiteDatabase,
  user_id: string,
  follower_id: string,
    ) => {
    try{
        const query = 'DELETE FROM followers WHERE user_id = ? AND follower_id = ?' ;
        await db.executeSql(query,[user_id, follower_id]);
    } catch (error) {
        console.error(error);
        throw Error('Failed to delete follower !!!');
    }
}

export const isUserFollowing = async (
  db: SQLiteDatabase,
  user_id: string,
  follower_id: string,
) => {
  try {
    const results = await db.executeSql(
      `SELECT * FROM followers WHERE user_id = ? AND follower_id = ?`,
      [user_id, follower_id]
    );
    const rows = results[0].rows;
    return rows.length > 0;
  } catch (error) {
    console.error("Error checking follow status", error);
    return false;
  }
}

export const countFollowers = async (
  db: SQLiteDatabase,
  user_id: string,
) => {
  try {
    const results = await db.executeSql(
      `SELECT COUNT(*) as count FROM followers WHERE user_id = ?`,
      [user_id]
    );
    const count = results[0].rows.item(0).count;
    return count; 
  } catch (error) {
    console.error("Error checking followers count", error);
    return false;
  }
}

export const countFollowing = async (
  db: SQLiteDatabase,
  user_id: string,
) => {
  try {
    const results = await db.executeSql(
      `SELECT COUNT(*) as count FROM followers WHERE follower_id = ?`,
      [user_id]
    );
    const count = results[0].rows.item(0).count;
    return count; 
  } catch (error) {
    console.error("Error checking following count", error);
    return false;
  }
}
