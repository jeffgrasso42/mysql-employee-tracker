// DEPENDENCIES
// These Objects were instantiated where they were exported
const DB = require('./db/methods');
const Prompts = require('./src/prompts');

// FUNCTIONS

// Display menu options to user and handle input
const mainMenu = async () => {
  const { action } = await Prompts.getAction();
  switch (action) {
    case 'VIEW departments':
      DB.getDepartments().then(([data]) => {
        console.table(data);
        mainMenu();
      });
      break;
    case 'VIEW roles':
      DB.getRoles().then(([data]) => {
        console.table(data);
        mainMenu();
      });
      break;
    case 'VIEW employees':
      DB.getEmployees().then(([data]) => {
        console.table(data);
        mainMenu();
      });
      break;
    case 'ADD department':
      const { department } = await Prompts.getDepartment();
      DB.addDepartment(department);
      mainMenu();
      break;
    case 'ADD role':
      const roleData = await Prompts.getRole();
      DB.addRole(roleData);
      mainMenu();
      break;
    case 'ADD employee':
      const employeeData = await Prompts.getEmployee();
      DB.addEmployee(employeeData);
      mainMenu();
      break;
    case 'UPDATE employee role':
      const { employeeId } = await Prompts.chooseEmployee();
      const { roleId: newRoleId } = await Prompts.getNewRole();
      DB.updateEmployeeRole(employeeId, newRoleId);
      mainMenu();
    case 'Exit':
      return;
    default:
      mainMenu();
  }
};

// INITIALIZATION
mainMenu();
