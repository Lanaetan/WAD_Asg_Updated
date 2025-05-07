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

export const updateUser = async( 
    db: SQLiteDatabase,
    name: string,
    username: string,
    password: string,
    email : string,
    image: string,
    bio: string,
    userID: string
) => {
try{
    const query = 'UPDATE users SET name=?,username=?,password=?,email=?,image=?,bio=? WHERE id=?';
    const parameters = [name,username,password,email,image,bio, userID]
    await db.executeSql(query,parameters);
  } catch (error) {
    console.error(error);
    throw Error('Failed to update user !!!');
  }
}

export const deleteUser = async( 
    db: SQLiteDatabase,
    userId: string
    ) => {
    try{
        const query = 'DELETE FROM users WHERE id = ?' ;
        await db.executeSql(query,[userId]);
    } catch (error) {
        console.error(error);
        throw Error('Failed to delete user !!!');
    }
}
