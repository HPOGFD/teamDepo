// Define a function to retrieve all roles from the database
// This function generates an SQL query string
const getRole = () => {
  return `
    SELECT id, title 
    FROM roles;`;
}

// Export the getRole function as the default export
export default getRole;
