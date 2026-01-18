import { pool } from "../utils/db.js";

export const getLevelData = async (userId) => {
  try {
    const sql = `SELECT * FROM level WHERE id = $1`;
    const values = [userId];
    const result = await pool.query(sql, values);
    return result.rows[0];
  } catch (err) {
    console.error("Error getting Level Data", err);
  }
};

export const updateLevelData = async (userId, newLevel, newXP) => {
  try {
    const sql = `INSERT INTO level (level, xp, id) VALUES ($1, $2, $3) ON CONFLICT (id) DO UPDATE SET level = EXCLUDED.level, xp = EXCLUDED.xp`;
    const values = [newLevel, newXP, userId];
    await pool.query(sql, values);
  } catch (err) {
    console.error("Error updating Level Data", err);
  }
};
