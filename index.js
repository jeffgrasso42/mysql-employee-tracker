const DB = require('./db/methods');
const { prompt } = require('inquirer');
const { addDepartment } = require('./db/methods');
const database = require('./db/connection');

// DB.getDepartment().then(([data]) => console.log(data));

const mainMenu = async () => {
  prompt({
    type: 'list',
    name: 'action',
    message: 'Please select your action:',
    choices: ['VIEW department', 'VIEW role', 'VIEW employee', 'ADD department', 'ADD role', 'ADD employee'],
  }).then(async ({ action }) => {
    switch (action) {
      case 'VIEW department':
        DB.getDepartment().then(([data]) => {
          console.table(data);
          return mainMenu();
        });
        break;
      case 'VIEW role':
        DB.getRole().then(([data]) => {
          console.table(data);
          return mainMenu();
        });
        break;
      case 'VIEW employee':
        DB.getEmployee().then(([data]) => {
          console.table(data);
          return mainMenu();
        });
        break;
      case 'ADD department':
        await prompt({
          type: 'input',
          message: `Enter the name of the department you would like to add:`,
          name: 'name',
        }).then(async ({ name }) => {
          console.log(name);
          const data = await newDepartment();
          console.table(data);
        });
        mainMenu();
        break;
      case 'ADD role':
        DB.addRole().then({});
      case 'ADD employee':
        DB.addEmployee().then({});
        break;
      default:
        return mainMenu();
    }
  });
};

/**
 *
 * @returns {object} departments table
 */
const newDepartment = () => {
  let table;
  prompt({
    type: 'input',
    message: 'Enter the name of the department you would like to add',
    name: 'department',
  }).then(response => {
    console.log(response);
    DB.addDepartment(response).then(([data]) => {
      table = data;
      // return mainMenu();
    });
  });
  return table;
};

mainMenu();
