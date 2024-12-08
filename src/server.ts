import inquirer from 'inquirer';
import DatabaseService from './classes.js'; // Adjust the path as necessary


async function startApp() {
  console.log('\nWelcome to the Employee Tracker!\n');

  const mainMenu = async () => {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
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

    switch (action) {
        case 'View all departments':
          const departments = await DatabaseService.getDepartments();
          console.table(departments);
          break;
         
        case 'View all roles':
        const roles = await DatabaseService.getRoles();
        console.table(roles);
        break;

        case 'View all employees':
        const employees = await DatabaseService.getEmployees();
        console.table(employees);
        break;

        case 'Add a department':
        const newDepartment = await DatabaseService.addDepartment();
        console.log('Added Department:', newDepartment);
        break;
        
  
    // case 'Add a role':
    //   await addRole();
    //   break;
    // case 'Add an employee':
    //   await addEmployee();
    //   break;
    // case 'Update an employee role':
    //   await updateEmployeeRole();
    //   break;
    // case 'Exit':
    //   console.log('Goodbye!');
    //   process.exit(0);
  }

    mainMenu();
  };

  await mainMenu();
}

startApp();