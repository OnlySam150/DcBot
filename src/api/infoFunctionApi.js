import {pool} from '../utils/db.js';


export const getInfoText = async (tag) => {
    try {
        const sql = `SELECT * FROM infoTable WHERE tag = $1`
        const values = [tag]
        const result = await pool.query(sql, values)
        return result.rows[0]
    } catch (err) {
        console.error("Error getting Info Text", err)
    }
}