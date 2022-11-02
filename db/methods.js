const connections = require('./connection');

// collection of methods related to MySql queries
class Methods {
  constructor(connection) {
    this.connection = connection;
  }
  // wrapper for queries
  makeQuery(...params) {
    return this.connection.promise().query(...params);
  }
  getDepartments() {
    return this.makeQuery('SELECT * FROM departments');
  }
  getRoles() {
    return this.makeQuery('SELECT * FROM roles');
  }
  getEmployees() {
    return this.makeQuery('SELECT * FROM employees');
  }
  // returns list of managers
  async getManagers() {
    const [[managerRole]] = await this.makeQuery('SELECT id FROM roles WHERE title = "manager"');
    const [managers] = await this.makeQuery(
      `SELECT id, first_name, last_name FROM employees WHERE role_id = ${managerRole.id}`
    );
    return managers;
  }
  addDepartment(name) {
    this.makeQuery('INSERT INTO departments (dept_name) VALUES (?)', name);
  }

  addRole({ title, salary, dept_id }) {
    this.makeQuery(`INSERT INTO roles (title, salary, department_id) VALUES('${title}', ${salary}, ${dept_id})`);
  }

  addEmployee({ firstName, lastName, roleId, managerId }) {
    this.makeQuery(
      `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES('${firstName}', '${lastName}', ${roleId}, ${managerId})`
    );
  }

  updateEmployeeRole(employeeId, roleId) {
    this.makeQuery(`UPDATE employees SET role_id = ${roleId} WHERE id = ${employeeId}`);
  }
}

// export instantiated object
module.exports = new Methods(connections);
