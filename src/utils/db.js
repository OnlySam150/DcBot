import {Pool} from 'pg';
import dotenv from 'dotenv';
dotenv.config()

export const pool = new Pool({
    host: String(process.env.PG_HOST),
    user: String(process.env.PG_USER),
    password: String(process.env.PG_PASSWORD),
    database: String(process.env.PG_DATABASE),
    port: Number(process.env.PG_PORT),
})


