import {SQLiteDatabase} from 'react-native-sqlite-storage';

// Fetch all comments for a specific post
export const getCommentsByPost = async (db: any, postId: any) => {
    try {
      const results = await db.executeSql(
        `SELECT c.text, c.created_at, c.post_id, c.user_id, u.name as user_name
         FROM comments c
         JOIN users u ON c.user_id = u.id
         WHERE c.post_id = ?
         ORDER BY c.created_at DESC;`,
        [postId]
      );
  
      const rows = results[0].rows;
      const comments = [];
  
      for (let i = 0; i < rows.length; i++) {
        comments.push(rows.item(i));
      }
  
      return comments;
    } catch (error) {
      console.error('Failed to fetch comments with user names', error);
      throw error;
    }
  };
  

// Create a new comment
export const createComment = async (
  db: SQLiteDatabase,
  text: string,
  createdAt: string,
  postId: string,
  userId: string,
) => {
  try {
    const query = `INSERT INTO comments (text, created_at, post_id, user_id) VALUES (?, ?, ?, ?)`;
    const result = await db.executeSql(query, [
      text,
      createdAt,
      postId,
      userId,
    ]);
    console.log('Comment inserted:', result);
  } catch (error) {
    console.error('Error inserting comment into DB:', error);
    throw error;
  }
};

// Count total comments for a specific post
export const countCommentsByPost = async (
  db: SQLiteDatabase,
  postId: string,
): Promise<number> => {
  try {
    const query = `SELECT COUNT(*) as count FROM comments WHERE post_id = ?`;
    const results = await db.executeSql(query, [postId]);

    if (results.length > 0 && results[0].rows.length > 0) {
      return results[0].rows.item(0).count;
    }

    return 0;
  } catch (error) {
    console.error('Error counting comments:', error);
    return 0;
  }
};

// Fetch all comments made by a specific user
export const getCommentsByUser = async (
  db: SQLiteDatabase,
  userId: string,
): Promise<any[]> => {
  try {
    const comments: any[] = [];
    const query = `SELECT * FROM comments WHERE user_id = ? ORDER BY created_at DESC`;
    const results = await db.executeSql(query, [userId]);

    results.forEach(result => {
      result.rows.raw().forEach((item: any) => {
        comments.push(item);
      });
    });

    return comments;
  } catch (error) {
    console.error('Failed to get comments by user:', error);
    throw Error('Failed to get user comments!');
  }
};
