import { pool } from "../utils/db.js";

export const createTempChannel = async (userId, channelId) => {
  try {
    const sql = `INSERT INTO activeTemp (userId, channelId) VALUES ($1, $2)`;
    const values = [userId, channelId];
    await pool.query(sql, values);
  } catch (err) {
    console.error("Error creating temp channel record:", err);
  }
};

export const getTempChannel = async (channelId) => {
  try {
    const sql = `SELECT * FROM activeTemp WHERE channelId = $1`;
    const values = [channelId];
    const result = await pool.query(sql, values);
    return result.rows[0];
  } catch (err) {
    console.error("Error getting tempchannel:", err);
    return null;
  }
};

export const deleteTempChannel = async (channelId) => {
  try {
    const sql = `DELETE FROM activeTemp WHERE channelId = $1`;
    const values = [channelId];
    await pool.query(sql, values);
  } catch (err) {
    console.error("Error deleting tempchannel:", err);
  }
};

export const createUserTempSetting = async (userId) => {
  try {
    const sql = `INSERT INTO tempSettings (userId) VALUES ($1)`;
    const values = [userId];
    await pool.query(sql, values);
  } catch (err) {
    console.error("Error creating user temp setting:", err);
  }
};

export const getUserTempSetting = async (userId) => {
  try {
    const sql = `SELECT * FROM tempSettings WHERE userId = $1`;
    const values = [userId];
    const result = await pool.query(sql, values);
    return result.rows[0];
  } catch (err) {
    console.error("Error getting user temp setting:", err);
  }
};

export const addUserTempSetting = async (userId, options = {}) => {
  try {
    console.log(options.privacy_status);
    console.log(options);
    const userSettings = await getUserTempSetting(userId);
    const channelName = options.channelName ?? userSettings.channelname;
    const userLimit = options.userLimit ?? userSettings.userlimit;
    const emoji = options.emoji ?? userSettings.emoji;
    const privacy_status =
      options.privacy_status ?? userSettings.privacy_status;

    const sql = `UPDATE tempSettings SET channelName = $1, userLimit = $2, emoji = $3, privacy_status = $4 WHERE userId = $5`;
    const values = [channelName, userLimit, emoji, privacy_status, userId];
    await pool.query(sql, values);
  } catch (err) {
    console.error("Error adding user temp setting:", err);
  }
};

export const getUserTempSettings = async (userId) => {
  try {
    const sql = `SELECT * FROM tempSettings WHERE userId = $1`;
    const values = [userId];
    const result = await pool.query(sql, values);
    if (result.rows[0] === undefined) {
      await createUserTempSetting(userId, null, null);
      return await getUserTempSetting(userId);
    } else {
      return result.rows[0];
    }
  } catch (err) {
    console.error("Error getting user temp settings:", err);
    return null;
  }
};

export const setCooldowns = async (userId, cooldownTime, tag) => {
  try {
    const sql = `INSERT INTO tempChannelCooldowns (userId, cooldownTime, tag) VALUES ($1, $2, $3)`;
    const values = [userId, cooldownTime, tag];
    await pool.query(sql, values);
  } catch (err) {
    console.error("Error setting cooldowns:", err);
  }
};

export const getCooldowns = async (userId, tag) => {
  try {
    const sql = `SELECT * FROM tempChannelCooldowns where userId = $1 AND tag = $2`;
    const values = [userId, tag];
    const result = await pool.query(sql, values);
    return result.rows[0];
  } catch (err) {
    console.error("Error getting cooldowns:", err);
  }
};

export const delCooldowns = async (userId, tag) => {
  try {
    const sql = "DELETE * WHERE userId = $1 AND tag = $2";
    const values = [userId, tag];
    await pool.query(sql, values);
  } catch (err) {
    console.error("Error deleting cooldowns:", err);
  }
};
