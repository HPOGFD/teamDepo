// Define a function to generate the SQL query for adding a new role to the database
// This function accepts the role's title, salary, and associated department ID as parameters
const addRoles = (title: string, salary: number, departmentId: number) => {
    return {
        text: 'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', // SQL query to insert a new role
        values: [title, salary, departmentId] // Parameterized query values to prevent SQL injection
    };
}

// Export the addRoles function as the default export
export default addRoles;
