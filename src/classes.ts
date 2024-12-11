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

  // Add Department
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

  static async addEmployee(){
    const { firstName, lastName, roleId, managerId} = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter employee first name:'},
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter employee last name:'},
      {
        type: 'input',
        name: 'roleId',
        message: 'Enter role'},
        
      {
        type: 'input',
        name: 'managerId',
        message: 'Enter manager ID:'},
    ]);
    await pool.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId]);
  }

  static async updateEmployeeRole(){
    const { employeeId, roleId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'employeeId',
        message: 'Enter employee ID:'},
      {
        type: 'input',
        name: 'roleId',
        message: 'Enter new role ID:'},
    ]);
    await pool.query('UPDATE employees SET role_id = $1 WHERE id = $2', [roleId, employeeId]);
  }
};





export default DatabaseService;