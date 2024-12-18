// Define a function to generate the query for updating an employee's role
// Takes two parameters: 
// - roleId: The ID of the new role to assign to the employee
// - employeeId: The ID of the employee to update
const updateEmploy = (roleId: number, employeeId: number) => {
    return {
        // The SQL query to update the employee's role in the database
        text: `UPDATE employees 
        SET role_id = $1 
        WHERE id = $2`,

        // An array of values to bind to the SQL query parameters ($1 and $2)
        values: [roleId, employeeId]
    };
};

// Export the updateEmploy function as the default export
export default updateEmploy;
