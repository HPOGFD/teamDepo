import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a pool instance for database connections
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
});

// Test the connection
pool.connect()
  .then(client => {
    console.log('Connected to the database');
    client.release();
  })
  .catch(err => console.error('Error connecting to the database:', err.stack));

export default pool;
