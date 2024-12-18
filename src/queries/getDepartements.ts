// Define a function to generate the SQL query for retrieving department data
// This function returns a SQL query that fetches department IDs and names
const getDept = () => {
    return 'SELECT id, name FROM departments;'; // Query to get department ID and name from the departments table
}

// Export the getDept function as the default export
export default getDept;
