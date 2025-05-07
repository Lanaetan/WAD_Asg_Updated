import {SQLiteDatabase} from 'react-native-sqlite-storage';


// Fetch all posts created by users (excluding the current user if necessary)
export const getPosts = async (db: SQLiteDatabase, currentUserId: string): Promise<any[]> => {
  try {
    const postsData: any[] = [];
    const query = `SELECT * FROM posts WHERE user_id != ? ORDER BY created_at DESC`;
    const results = await db.executeSql(query, [currentUserId]);

    results.forEach((result: any) => {
      result.rows.raw().forEach((item: any) => {
        postsData.push(item);
      });
    });

    return postsData;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get posts!');
  }
};

// Fetch a single post by its ID
export const getPostById = async (db: SQLiteDatabase, postId: string): Promise<any> => {
  try {
    const query = `SELECT * FROM posts WHERE id = ?`;
    const results = await db.executeSql(query, [postId]);

    if (results.length > 0 && results[0].rows.length > 0) {
      return results[0].rows.item(0); // return the post
    }

    return null; // post not found
  } catch (error) {
    console.error(error);
    throw Error('Failed to get post by ID!');
  }
};

// Create a new post
export const createPost = async (
  db: SQLiteDatabase,
  imageUrl: string,
  caption: string,
  userId: string,
  createdAt: string
) => {
    try {
        const query = `INSERT INTO posts (image, caption, user_id, created_at) VALUES (?, ?, ?, ?)`;
        const result = await db.executeSql(query, [imageUrl, caption, userId, createdAt]);
        console.log('Post inserted into DB:', result);
      } catch (error) {
        console.error('Error inserting post into DB:', error);
        throw error;
      }
};

// Fetch posts made by a specific user
export const getPostsByUser = async (db: SQLiteDatabase, userId: string): Promise<any[]> => {
  try {
    const userPostsData: any[] = [];
    const query = `SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC`;
    const results = await db.executeSql(query, [userId]);

    results.forEach((result: any) => {
      result.rows.raw().forEach((item: any) => {
        userPostsData.push(item);
      });
    });

    return userPostsData;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get posts by user!');
  }
};


