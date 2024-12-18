// Define a function to generate the SQL query for adding a new employee to the database
// This function accepts the employee's first name, last name, role ID, and manager ID as parameters
const addEmploy = (firstName: string, lastName: string, roleId: number, managerId: number) => {
    return {
        text: 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', // SQL query to insert a new employee
        values: [firstName, lastName, roleId, managerId] // Parameterized query values to prevent SQL injection
    };
}

// Export the addEmploy function as the default export
export default addEmploy;
