import { pool } from "./connection.js";
import inquirer from 'inquirer';

class DatabaseService {
  static async getDepartments() {
    const { rows } = await pool.query(
      'SELECT * FROM departments'
    );
    return rows;
  }
  static async getRoles() {
    const { rows } = await pool.query(`
      SELECT 
      departments.name AS department, 
      roles.title, 
      roles.salary 
      FROM departments 
      JOIN roles ON departments.id = roles.department_id`
    );
    return rows;
  }
  static async getEmployees() {
    const { rows } = await pool.query(`
      SELECT 
      employees.id AS employee_id, 
      employees.first_name, 
      employees.last_name, 
      roles.title, 
      roles.salary, 
      departments.name AS department, 
      manager.first_name AS manager
      FROM employees 
      JOIN roles ON employees.role_id = roles.id 
      JOIN departments ON roles.department_id = departments.id
      LEFT JOIN employees AS manager ON employees.manager_id = manager.id;
    `);
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
 // Insert the new department and return the inserted row
 const { rows } = await pool.query(
  'INSERT INTO departments (name) VALUES ($1) RETURNING *',
  [name]
);

// Extract the inserted department
const newDepartment = rows[0];

// Display a success message with the department name
console.log(`Added Department: ${newDepartment.name}`);
}


// ADD ROLE
  static async addRole(){
    const departments = await this.getDepartments();
    const { title, salary, departmentId }  = await inquirer.prompt([
      { 
        type: 'input', 
        name: 'title',
        message: 'Enter role title:' 
      },
      { 
        type: 'number', 
        name: 'salary', 
        message: 'Enter role salary:' 
      },
      { 
        type: 'list', 
        name: 'departmentId', 
        message: 'Which department does the role belong to?',
        choices: departments.map((dept) => ({
          name: dept.name, // Display the department name
          value: dept.id,  // Store the department ID as the choice's value
        })),
      },
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