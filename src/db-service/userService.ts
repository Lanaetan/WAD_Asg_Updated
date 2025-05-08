import {SQLiteDatabase} from 'react-native-sqlite-storage';

export const getUsers = async( db: SQLiteDatabase ): Promise<any> => {
    try{
        const usersData : any = [];
        const query = `SELECT * FROM users ORDER BY name`;
        const results = await db.executeSql(query);
        results.forEach((result: any) => {
            (result.rows.raw()).forEach(( item:any ) => {
                usersData.push(item);
            })
          });
        return usersData;
      } catch (error) {
        console.error(error);
        throw Error('Failed to get users !!!');
      }
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


export const getUserById = async( db: SQLiteDatabase, userId: string ): Promise<any> => {
    try{
        const userData : any = [];
        const query = `SELECT * FROM users WHERE id=?`;
        const results = await db.executeSql(query,[userId]);
        return results[0].rows.item(0)
      } catch (error) {
        console.error(error);
        throw Error('Failed to get user !!!');
      }
}


export const getUserByEmail = async( db: SQLiteDatabase, email: string ): Promise<any> => {
  try{
      const userData : any = [];
      const query = `SELECT * FROM users WHERE email=?`;
      const results = await db.executeSql(query,[email]);
      return results[0].rows.item(0)
    } catch (error) {
      console.error(error);
      throw Error('Failed to get user !!!');
    }
}


export const createUser = async( 
        db: SQLiteDatabase,
        name: string,
        username: string,
        password: string,
        email : string,
        image: string,
        bio: string
    ) => {
    try{
        const query = 'INSERT INTO users(name,username,password,email,image,bio) VALUES(?,?,?,?,?,?)';
        const parameters = [name,username,password,email,image,bio]
        await db.executeSql(query,parameters);
      } catch (error) {
        console.error(error);
        throw Error('Failed to create user !!!');
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
export const updateUserById = async (
  db: SQLiteDatabase,
  userID: string,
  name: string,
  username: string,
  bio: string,
  image: string
) => {
  try {
    const query = 'UPDATE users SET name=?, username=?, bio=?, image=? WHERE id=?';
    const parameters = [name, username, bio, image, userID];
    await db.executeSql(query, parameters);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update user by ID!');  // Changed to 'new Error'
  }
};


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
