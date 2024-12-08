import { pool } from "./connection.js";

class DatabaseService {
  static async getDepartments() {
    const { rows } = await pool.query('SELECT * FROM departments');
    return rows;
  }
}

export default DatabaseService;