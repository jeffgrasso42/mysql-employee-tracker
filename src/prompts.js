const DB = require('../db/methods');
const { prompt } = require('inquirer');

class Prompts {
  constructor() {}

  // wraps inquirer prompt in promise
  askQuestion(questions) {
    return new Promise((resolve, reject) => {
      resolve(prompt(questions));
      reject(err => console.error(err));
    });
  }

  // gets user's desired action
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
        'Exit',
      ],
    });
  }

  // get name of new department
  getDepartment() {
    return this.askQuestion({
      type: 'input',
      message: 'Enter the name of the department you would like to add',
      name: 'department',
    });
  }

  // get data needed to add new role to company_db
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

  // turn roles listed in company_db into array of inquirer compatable objects
  async getFormattedRoles() {
    const [roles] = await DB.getRoles();
    return roles.map(role => ({ value: role.id, name: role.title }));
  }

  // get data needed for adding a new employee to company_db
  async getEmployee() {
    const formattedRoles = await this.getFormattedRoles();
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

  // gets the name and id of the employee whose role the user wants to change
  async chooseEmployee() {
    const [employees] = await DB.getEmployees();
    // makes query result an array compatable with inquirer
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

  // gets the new role to be assigned to the chosen employee
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

// export instantiated object
module.exports = new Prompts();
