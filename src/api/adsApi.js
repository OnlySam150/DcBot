import { pool } from "../utils/db";

export const set_user_ad_status = async (user_id, status) => {
  try {
    const sql =
      "INSERT INTO user_ad_status (user_id, ad_status) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET ad_status = EXCLUDED.ad_status";
    const values = [user_id, status];
    await pool.query(sql, values);
  } catch (err) {
    console.error("Error setting user ad status:", err);
  }
};

export const get_user_ad_status = async (user_id) => {
  try {
    const sql = "SELECT ad_status FROM user_ad_status WHERE user_id = $1";
    const values = [user_id];
    const result = await pool.query(sql, values);
    return result.rows[0];
  } catch (err) {
    console.error("Error getting user ad status:", err);
  }
};

export const set_ad_information = async (user_id, msg_id, expired_at) => {
  try {
    const sql =
      "INSERT INTO ad_table (user_id, message_id, expires_at) VALUES ($1, $2, $3)";
    const values = [user_id, msg_id, expired_at];
    await pool.query(sql, values);
    return true;
  } catch (err) {
    console.error("Error setting ad information:", err);
    return false;
  }
};

export const get_ad_information = async (user_id) => {
  try {
    const sql = "SELECT * FROM ad_table WHERE user_id = $1";
    const values = [user_id];
    const result = await pool.query(sql, values);
    return result.rows[0];
  } catch (err) {
    console.error("Error getting ad information:", err);
  }
};

export const delete_ad_information = async (user_id) => {
  try {
    const sql = "DELETE FROM ad_table WHERE user_id = $1";
    const values = [user_id];
    await pool.query(sql, values);
  } catch (err) {
    console.error("Error deleting ad information:", err);
  }
};

export const get_expired_ads = async () => {
  try {
    const sql = "SELECT * FROM ad_table WHERE expires_at < NOW()";
    const result = await pool.query(sql);
    return result.rows;
  } catch (err) {
    console.error("Error getting expired ads:", err);
  }
};
