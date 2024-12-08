import { pool } from "./connection.js";
import inquirer from 'inquirer';

class DatabaseService {
  static async getDepartments() {
    const { rows } = await pool.query('SELECT * FROM departments');
    return rows;
  }
  static async getRoles() {
    const { rows } = await pool.query('SELECT * FROM roles');
    return rows;
  }
  static async getEmployees() {
    const { rows } = await pool.query('SELECT * FROM employees');
    return rows;
  }
  static async addDepartment(){
    const { name } = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the department?',
      },
    ]);
    await pool.query('INSERT INTO departments (name) VALUES ($1)', [name]);

  };
  static async addRole(){
    const { title, salary, departmentId }  = await inquirer.prompt([
      { 
        type: 'input', 
        name: 'title',
        message: 'Enter role title:' },
      { 
        type: 'number', 
        name: 'salary', 
        message: 'Enter role salary:' },
      { 
        type: 'number', 
        name: 'departmentId', 
        message: 'Enter department ID:' },
    ]);
    await pool.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
  };
}

export default DatabaseService;