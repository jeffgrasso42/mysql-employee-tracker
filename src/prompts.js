const DB = require('../db/methods');
const { prompt } = require('inquirer');

class Prompts {
  constructor() {}
  askQuestion(questions) {
    return new Promise((resolve, reject) => {
      resolve(prompt(questions));
      reject(err => console.error(err));
    });
  }

  getAction() {
    return this.askQuestion({
      type: 'list',
      name: 'action',
      message: 'Please select your action:',
      choices: [
        'VIEW department',
        'VIEW role',
        'VIEW employee',
        'ADD department',
        'ADD role',
        'ADD employee',
        'UPDATE employee role',
      ],
    });
  }

  getDepartment() {
    return this.askQuestion({
      type: 'input',
      message: 'Enter the name of the department you would like to add',
      name: 'department',
    });
  }

  async getRole() {
    const [departments] = await DB.getDepartments();
    const formattedDepartments = departments.map(department => ({ value: department.id, name: department.dept_name }));
    return this.askQuestion([
      {
        type: 'input',
        message: 'Enter the title of the role:',
        name: 'title',
      },
      {
        type: 'input',
        message: 'Enter the salary for the role:',
        name: 'salary',
      },
      {
        type: 'list',
        message: "Choose the role's department:",
        name: 'dept_id',
        choices: formattedDepartments,
      },
    ]);
  }

  async getFormattedRoles() {
    const [roles] = await DB.getRoles();
    return roles.map(role => ({ value: role.id, name: role.title }));
  }

  async getEmployee() {
    const [roles] = await DB.getRoles();
    const formattedRoles = roles.map(role => ({ value: role.id, name: role.title }));

    const managers = await DB.getManagers();
    const formattedManagers = managers.map(manager => ({
      value: manager.id,

      name: manager.first_name + manager.last_name,
    }));
    return this.askQuestion([
      {
        type: 'input',
        message: 'Enter the first name of the Employee:',
        name: 'firstName',
      },
      {
        type: 'input',
        message: 'Enter the last name of the Employee:',
        name: 'lastName',
      },
      {
        type: 'list',
        message: "Choose the Employee's role:",
        name: 'roleId',
        choices: formattedRoles,
      },
      {
        type: 'list',
        message: "Choose the Employee's manager:",
        name: 'managerId',
        choices: formattedManagers,
      },
    ]);
  }

  async chooseEmployee() {
    const [employees] = await DB.getEmployees();
    const formattedEmployees = employees.map(employee => ({
      value: employee.id,
      name: `${employee.first_name} ${employee.last_name}`,
    }));
    return this.askQuestion({
      type: 'list',
      message: "Which Employee's role would you like to update:",
      choices: formattedEmployees,
      name: 'employeeId',
    });
  }

  async getNewRole() {
    const formattedRoles = await this.getFormattedRoles();
    return this.askQuestion({
      type: 'list',
      message: "Choose the Employee's new role:",
      name: 'roleId',
      choices: formattedRoles,
    });
  }
}

module.exports = new Prompts();
