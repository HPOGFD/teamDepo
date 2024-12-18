// Import the `pg` package for PostgreSQL database interaction
import pkg from 'pg'; // Default import
const { Pool } = pkg; // Destructure to access the Pool class for managing database connections

// Import the dotenv package to handle environment variables
import dotenv from 'dotenv';

// Load environment variables from the .env file into process.env
dotenv.config();

// Create a new instance of the Pool class using configuration from environment variables
const pool = new Pool({
  user: process.env.DB_USER, // Database username from environment variables
  password: process.env.DB_PASSWORD, // Database password from environment variables
  host: process.env.DB_HOST, // Database host from environment variables
  port: Number(process.env.DB_PORT), // Database port, converted to a number
  database: process.env.DB_NAME, // Database name from environment variables
});

// Attempt to connect to the database to ensure the connection is functional
pool.connect();

// Define an async function to establish and verify the database connection
const connectToDb = async () => {
  try {
    await pool.connect(); // Connect to the database
    console.log('Connected to the database.'); // Log success message
  } catch (err) {
    console.error('Error connecting to database:', err); // Log error details if connection fails
    process.exit(1); // Exit the process with a failure code
  }
};

// Export the `pool` instance for executing queries and the `connectToDb` function
export { pool, connectToDb };
