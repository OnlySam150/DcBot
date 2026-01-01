import { pool } from "../utils/db.js";

export const getCountData = async (channelId) => {
  try {
    const sql = `SELECT * FROM counting_table WHERE channel_id = $1`;
    const values = [channelId];
    const result = await pool.query(sql, values);
    return result.rows[0];
  } catch (err) {
    console.error("Error getting Count Data", err);
  }
};

export const updateCountData = async (
  channel_id,
  last_number,
  last_user_id
) => {
  try {
    const sql = `UPDATE counting_table SET last_number = $1, last_user_id = $2 WHERE channel_id = $3`;
    const values = [last_number, last_user_id, channel_id];
    await pool.query(sql, values);
  } catch (err) {
    console.error("Error updating Count Data", err);
  }
};

export const initCountData = async (channel_id) => {
  try {
    const sql = `INSERT INTO counting_table (channel_id, last_number, last_user_id) VALUES ($1, $2, $3)`;
    const values = [channel_id, 0, null];
    await pool.query(sql, values);
  } catch (err) {
    console.error("Error initializing Count Data", err);
  }
};
