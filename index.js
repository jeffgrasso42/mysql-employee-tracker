const DB = require('./db/methods');
const { prompt } = require('inquirer');

// DB.getDepartment().then(([data]) => console.log(data));

const mainMenu = () => {
  prompt({
    type: 'list',
    name: 'action',
    message: 'Please select your action:',
    choices: ['VIEW department', 'VIEW role', 'VIEW employee'],
  }).then(({ action }) => {
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

      default:
        return mainMenu();
    }
  });
};

mainMenu();
