import { pool } from "../utils/db.ts";

export const getNoteId = async () => {
  try {
    const sql = `SELECT * FROM noteidtable`;
    const result = await pool.query(sql);
    return result.rows[0];
  } catch (err) {
    console.error(`Error get NoteId:`, err);
  }
};

export const updateNoteId = async () => {
  try {
    const noteId = await getNoteId();
    const newnoteId = Number(noteId.noteid) + 1;
    const sql = `UPDATE noteidtable SET noteid = $1`;
    const values = [String(newnoteId)];
    await pool.query(sql, values);
  } catch (err) {
    console.error(`Error update noteId:`, err);
  }
};

export const addUserNote = async (userId, modId, text) => {
  try {
    const sql = `INSERT INTO usernotes (userId, modId, text, noteid) VALUES ($1, $2, $3)`;
    const values = [userId, modId, text];
    await pool.query(sql, values);
  } catch (err) {
    console.error(`Error add UserNote:`, err);
  }
};

export const updateUserNote = async (userId, text, timestamp) => {
  try {
    const sql = `UPDATE usernotes SET text = $1 WHERE userId = $2 AND timestamp = $3`;
    const values = [text, userId, timestamp];
    await pool.query(sql, values);
  } catch (err) {
    console.error(`Error update UserNote:`, err);
  }
};

export const getUserNote = async (userId) => {
  try {
    const sql = `SELECT * FROM usernotes WHERE userid = $1`;
    const values = [userId];
    const result = await pool.query(sql, values);
    return result;
  } catch (err) {
    console.error(`Error get UserNote:`, err);
  }
};
