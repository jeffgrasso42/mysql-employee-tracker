const connections = require('./connection');

class Methods {
  constructor(connection) {
    this.connection = connection;
  }
  // add queries here
  getDepartment() {
    return this.connection.promise().query('SELECT * FROM departments');
  }
  getRole() {
    return this.connection.promise().query('SELECT * FROM roles');
  }
  getEmployee() {
    return this.connection.promise().query('SELECT * FROM employees');
  }
  addDepartment(name) {
    console.log(name);
    this.connection
      .promise()
      .query('INSERT INTO departments VALUES ?', name, (err, res) =>
        err ? console.error(err) : console.log('Departement added')
      );
    return this.connection.promise().query('SELECT * FROM departments');
  }
}

module.exports = new Methods(connections);
