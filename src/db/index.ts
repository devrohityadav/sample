import { Pool } from "pg";

import { config } from "../config";

const pool = new Pool({ connectionString: config.DB_URL });

export default pool;
