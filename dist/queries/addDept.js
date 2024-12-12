const addDept = (name) => {
    return `INSERT INTO departments (name) VALUES ('${name}') RETURNING *`;
};
export default addDept;
