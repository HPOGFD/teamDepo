// Define a function to generate the SQL query for adding a new department to the database
// This function accepts the department's name as a parameter
const addDept = (name: string) => {
    return `INSERT INTO departments (name) VALUES ('${name}') RETURNING *`; // SQL query to insert a new department and return the inserted record
}

// Export the addDept function as the default export
export default addDept;
