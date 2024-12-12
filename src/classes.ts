import { pool } from "./connection.js";
import inquirer from 'inquirer';
import getDept from "./queries/getDepartements.js";
import getRole from "./queries/getRole.js";
import getEmployee from "./queries/getEmployee.js";
import addDept from "./queries/addDept.js";
import addRoles from "./queries/addRoles.js";
import addEmploy from "./queries/addEmploy.js";

class DatabaseService {
  static async getDepartments() {
    const { rows } = await pool.query(getDept());
    return rows;
  }
  static async getRoles() {
    const { rows } = await pool.query(getRole());
    return rows;
  }
  static async getEmployees() {
    const { rows } = await pool.query(getEmployee());
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
      await pool.query(addDept(name));
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
    await pool.query(addRoles(title, salary, departmentId));
  };

  static async addEmployee(){
    const roles = await this.getRoles();
    const manager = await this.getEmployees();
    const {firstName, lastName, roleId, managerId} = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter employee first name:'},
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter employee last name:'},
      {
        type: 'list',
        name: 'roleId',
        message: 'Enter role',
        choices: roles.map((role) => ({
          name: role.title,
          value: role.id,
        })),
      },
      {
        type: 'list',
        name: 'managerId',
        message: 'Enter manager ID:',
        choices: manager.map((manager) => ({
          name: manager.first_name,
          value: manager.id,
        })),
      }]);

    const { query, values } = addEmploy(firstName, lastName, roleId, managerId);
    await pool.query({ text: query, values });
  }

  static async updateEmployeeRole(){
    const employees = await this.getEmployees();
    const roles = await this.getRoles();
    const { employeeId, roleId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Which employee do you want to update?',
        choices: employees.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        })),
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Which role do you want to assign the selected employee?',
        choices: roles.map((role) => ({
          name: role.title,
          value: role.id,
        })),
      },
    ]);
    await pool.query('UPDATE employees SET role_id = $1 WHERE id = $2', [roleId, employeeId]);
  }
};





export default DatabaseService;