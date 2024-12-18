// Import the connection pool for querying the database
import { pool } from "./connection.js";

// Import the Inquirer library for command-line prompts
import inquirer from 'inquirer';

// Import SQL query strings or query builders for different operations
import getDept from "./queries/getDepartements.js";
import getRole from "./queries/getRole.js";
import getEmployee from "./queries/getEmployee.js";
import addDept from "./queries/addDept.js";
import addRoles from "./queries/addRoles.js";
import addEmploy from "./queries/addEmploy.js";
import updateEmploy from "./queries/updateEmployee.js";

// Define the DatabaseService class to handle database operations
class DatabaseService {
  
  // Fetch all departments from the database
  static async getDepartments() {
    try {
      const { rows } = await pool.query(getDept()); // Execute the query to get departments
      return rows; // Return the retrieved rows
    }
    catch (error) {
      console.log('Error fetching department ', error); // Log any error encountered
      throw new Error('Failed to retrieve departments. Please try again later.'); // Throw a custom error message
    }
  }

  // Fetch all roles from the database
  static async getRoles() {
    try {
      const { rows } = await pool.query(getRole()); // Execute the query to get roles
      return rows; // Return the retrieved rows
    }
    catch (error) {
      console.log('Error fetching roles ', error); // Log any error encountered
      throw new Error('Failed to retrieve roles. Please try again later.'); // Throw a custom error message
    }
  }

  // Fetch all employees from the database
  static async getEmployees() {
    try {
      const { rows } = await pool.query(getEmployee()); // Execute the query to get employees
      return rows; // Return the retrieved rows
    }
    catch (error) {
      console.log('Error fetching employees ', error); // Log any error encountered
      throw new Error('Failed to retrieve employees. Please try again later.'); // Throw a custom error message
    }
  }

  // Add a new department to the database
  static async addDepartment(){
    try {
      // Prompt the user for the department name
      const { name } = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is the name of the department?', // Message displayed to the user
          validate: (input) => input.trim() === '' ? 'Department name cannot be empty' : true, // Input validation
        },
      ]);
      await pool.query(addDept(name)); // Execute the query to add the department
    } catch (error) {
      console.log('Error adding department ', error); // Log any error encountered
      throw new Error('Failed to add department. Please try again later.'); // Throw a custom error message
    }
  }

  // Add a new role to the database
  static async addRole(){
    try {
      const departments = await this.getDepartments(); // Fetch departments to provide choices for the role
      // Prompt the user for role details
      const { title, salary, departmentId } = await inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter role title:', // Message displayed to the user
          validate: (input) => input.trim() === '' ? 'Title name cannot be empty' : true, // Input validation
        },
        {
          type: 'number',
          name: 'salary',
          message: 'Enter role salary:', // Prompt for salary
          validate: (input) => {
            const salary = Number(input); // Validate that the salary is a positive number
            return isNaN(salary) || salary <= 0 ? 'Salary must be a positive number' : true;
          },
        },
        {
          type: 'list',
          name: 'departmentId',
          message: 'Which department does the role belong to?', // Ask the user to select a department
          choices: departments.map((dept) => ({
            name: dept.name, // Display the department name
            value: dept.id,  // Use the department ID as the choice value
          })),
        },
      ]);
      await pool.query(addRoles(title, salary, departmentId)); // Execute the query to add the role
    } catch (error) {
      console.log('Error adding role ', error); // Log any error encountered
      throw new Error('Failed to add role. Please try again later.'); // Throw a custom error message
    }
  }

  // Add a new employee to the database
  static async addEmployee(){
    try {
      const roles = await this.getRoles(); // Fetch roles to provide choices for the employee
      const manager = await this.getEmployees(); // Fetch employees to provide manager choices

      // Prompt the user for employee details
      const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        {
          type: 'input',
          name: 'firstName',
          message: 'Enter employee first name:', // Prompt for first name
          validate: (input) => input.trim() === '' ? 'First name cannot be empty' : true, // Input validation
        },
        {
          type: 'input',
          name: 'lastName',
          message: 'Enter employee last name:', // Prompt for last name
          validate: (input) => input.trim() === '' ? 'Last name cannot be empty' : true // Input validation
        },
        {
          type: 'list',
          name: 'roleId',
          message: 'Enter role:', // Ask the user to select a role
          choices: roles.map((role) => ({
            name: role.title, // Display role title
            value: role.id, // Use role ID as choice value
          })),
        },
        {
          type: 'list',
          name: 'managerId',
          message: 'Enter manager ID:', // Ask the user to select a manager
          choices: manager.map((man) => ({
            name: man.first_name, // Display manager's first name
            value: man.employee_id, // Use employee ID as choice value
          })),
        }
      ]);

      await pool.query(addEmploy(firstName, lastName, roleId, managerId)); // Execute the query to add the employee
    } catch (error) {
      console.log('Error adding employee ', error); // Log any error encountered
      throw new Error('Failed to add employee. Please try again later.'); // Throw a custom error message
    }
  }

  // Update an employee's role in the database
  static async updateEmployeeRole(){
    try {
      const employees = await this.getEmployees(); // Fetch employees to provide choices
      const roles = await this.getRoles(); // Fetch roles to provide choices

      // Prompt the user to select the employee and the new role
      const { employeeId, roleId } = await inquirer.prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: 'Which employee do you want to update?', // Ask the user to select an employee
          choices: employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`, // Display the employee's full name
            value: employee.employee_id, // Use employee ID as choice value
          })),
        },
        {
          type: 'list',
          name: 'roleId',
          message: 'Which role do you want to assign the selected employee?', // Ask the user to select a role
          choices: roles.map((role) => ({
            name: role.title, // Display role title
            value: role.id, // Use role ID as choice value
          })),
        },
      ]);

      await pool.query(updateEmploy(roleId, employeeId)); // Execute the query to update the employee's role
    } catch (error) {
      console.log('Error updating employee role ', error); // Log any error encountered
      throw new Error('Failed to update employee role. Please try again later.'); // Throw a custom error message
    }
  }
}

export default DatabaseService; // Export the DatabaseService class for use in other modules
