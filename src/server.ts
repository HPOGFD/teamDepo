// Import the inquirer package for interactive command-line prompts
import inquirer from 'inquirer';

// Import the DatabaseService class for database interactions
import DatabaseService from './classes.js'; // Adjust the path as necessary based on your project structure

// Entry point of the application
async function startApp() {
  console.log('\nWelcome to teamDepo!\n'); // Display a welcome message

  // Function to display the main menu and handle user actions
  const mainMenu = async () => {
    // Prompt the user to choose an action
    const { action } = await inquirer.prompt([
      {
        type: 'list', // Render the prompt as a list
        name: 'action', // Name of the answer field
        message: 'What would you like to do?', // Message displayed to the user
        choices: [ // List of choices the user can select from
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit',
        ],
      },
    ]);

    // Handle the selected action with a switch statement
    switch (action) {
      case 'View all departments':
        // Fetch and display all departments in a table format
        const departments = await DatabaseService.getDepartments();
        console.table(departments);
        break;

      case 'View all roles':
        // Fetch and display all roles in a table format
        const roles = await DatabaseService.getRoles();
        console.table(roles);
        break;

      case 'View all employees':
        // Fetch and display all employees in a table format
        const employees = await DatabaseService.getEmployees();
        console.table(employees);
        break;

      case 'Add a department':
        // Prompt the user to add a new department and display the result
        const newDepartment = await DatabaseService.addDepartment();
        console.log('Added Department:', newDepartment);
        break;

      case 'Add a role':
        // Prompt the user to add a new role and display the result
        const newRole = await DatabaseService.addRole();
        console.log('Added Role:', newRole);
        break;

      case 'Add an employee':
        // Prompt the user to add a new employee and display the result
        const newEmployee = await DatabaseService.addEmployee();    
        console.log('Added Employee:', newEmployee);
        break;

      case 'Update an employee role':
        // Prompt the user to update an employee's role and display the result
        const updatedEmployee = await DatabaseService.updateEmployeeRole();
        console.log('Updated Employee:', updatedEmployee);
        break;

      case 'Exit':
        // Exit the application
        console.log('Content management system (CMS) is closing. Goodbye!');
        process.exit(0); // Terminate the Node.js process
        break;
    }

    // Return to the main menu after an action is completed
    mainMenu();
  };

  // Start the main menu for the first time
  await mainMenu();
}

// Start the application
startApp();
