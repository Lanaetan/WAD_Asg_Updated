import {SQLiteDatabase} from 'react-native-sqlite-storage';

// Get all likes for a specific post
export const getLikesByPost = async (db: any, postId: any) => {
  try {
    const results = await db.executeSql(
      `SELECT l.*, u.name as user_name 
       FROM likes l
       JOIN users u ON l.user_id = u.id
       WHERE l.post_id = ?
       ORDER BY l.created_at DESC;`,
      [postId]
    );

    const rows = results[0].rows;
    const likes = [];

    for (let i = 0; i < rows.length; i++) {
      likes.push(rows.item(i));
    }

    return likes;
  } catch (error) {
    console.error('Failed to fetch likes', error);
    throw error;
  }
};

// Create a new like
export const createLike = async (
  db: SQLiteDatabase,
  postId: string,
  userId: string,
) => {
  try {
    const createdAt = new Date().toISOString();
    const query = `INSERT INTO likes (created_at, post_id, user_id) VALUES (?, ?, ?)`;
    const result = await db.executeSql(query, [createdAt, postId, userId]);
    console.log('Like inserted:', result);
    return result;
  } catch (error) {
    console.error('Error inserting like into DB:', error);
    throw error;
  }
};

// Remove a like
export const removeLike = async (
  db: SQLiteDatabase,
  postId: string,
  userId: string,
) => {
  try {
    const query = `DELETE FROM likes WHERE post_id = ? AND user_id = ?`;
    const result = await db.executeSql(query, [postId, userId]);
    console.log('Like removed:', result);
    return result;
  } catch (error) {
    console.error('Error removing like from DB:', error);
    throw error;
  }
};

// Check if a user has liked a post
export const hasUserLikedPost = async (
  db: SQLiteDatabase,
  postId: string,
  userId: string,
): Promise<boolean> => {
  try {
    const query = `SELECT COUNT(*) as count FROM likes WHERE post_id = ? AND user_id = ?`;
    const results = await db.executeSql(query, [postId, userId]);

    if (results.length > 0 && results[0].rows.length > 0) {
      return results[0].rows.item(0).count > 0;
    }
    return false;
  } catch (error) {
    console.error('Error checking like status:', error);
    return false;
  }
};

// Count total likes for a specific post
export const countLikesByPost = async (
  db: SQLiteDatabase,
  postId: string,
): Promise<number> => {
  try {
    const query = `SELECT COUNT(*) as count FROM likes WHERE post_id = ?`;
    const results = await db.executeSql(query, [postId]);

    if (results.length > 0 && results[0].rows.length > 0) {
      return results[0].rows.item(0).count;
    }
    return 0;
  } catch (error) {
    console.error('Error counting likes:', error);
    return 0;
  }
};