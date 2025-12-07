import { Pool } from 'pg';
import { DB_URL } from '../config/index.ts';

let db: Pool
export { db }

export function initDbPool() {
    db = new Pool({ connectionString: DB_URL });
}