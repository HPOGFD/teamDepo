import { pool } from "./connection.js";

class DatabaseService {
  static async getDepartments() {
    const { rows } = await pool.query('SELECT * FROM departments');
    return rows;
  }
  static async getRoles() {
    const { rows } = await pool.query('SELECT * FROM roles');
    return rows;
  }
}

export default DatabaseService;