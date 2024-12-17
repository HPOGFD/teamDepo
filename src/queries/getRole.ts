const getRole = () => {
    return `
      SELECT
        id, title
      FROM  
        roles;
        
    `;
}
export default getRole;