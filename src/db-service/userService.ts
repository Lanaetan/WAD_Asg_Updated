import {SQLiteDatabase, enablePromise, openDatabase} from 'react-native-sqlite-storage';

const databaseName = 'myplaces.sqlite';

// Enable promise for SQLite
enablePromise(true);

export const getDBConnection = async() => {
    return openDatabase(
        {
            name: 'myplaces.sqlite',
            createFromLocation: 1         
        },
          openCallback,
          errorCallback
        
        // {name: `${databaseName}`, createFromLocation: '~db.sqlite'},
        // openCallback,
        // errorCallback,
    );
}


export const getUsers = async( db: SQLiteDatabase ): Promise<any> => {
    try{
        const usersData : any = [];
        const query = `SELECT * FROM users ORDER BY name`;
        const results = await db.executeSql(query);
        results.forEach(result => {
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

const openCallback = () => {
    console.log('database open success');
}

const errorCallback = (err: any) => {
    console.log('Error in opening the database: ' + err);
}