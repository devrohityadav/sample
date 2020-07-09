import { Pool } from "pg";

const connectionString = "postgresql://postgres:password@localhost:5000/test";

const pool = new Pool({ connectionString });

export default pool;
