const connections = require('./connection');

class Methods {
  constructor(connection) {
    this.connection = connection;
  }
  // add queries here
  getDepartment() {
    return this.connection.promise().query('SELECT * FROM department');
  }
  getRole() {
    return this.connection.promise().query('SELECT * FROM role');
  }
  getEmployee() {
    return this.connection.promise().query('SELECT * FROM employee');
  }
}

module.exports = new Methods(connections);
