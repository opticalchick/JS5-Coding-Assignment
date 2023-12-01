// departments within a company and the employees within those departments
class Employee {
    constructor(name, job) {
        this.name = name;
        this.job = job;
    }

    describe() {
        return `${this.name} fulfills ${this.job} position`;
    }
}
class Department {
    constructor(name) {
        this.name = name;
        this.employees = [];
    }

    addEmployee(employee) {
        if (employee instanceof Employee) {
            this.employees.push(employee);
        } else {
            throw new Error(`You can only add an instance of Employee. 
    Argument is not an employee: ${employee}`);
        }
    }

    describe() {
        return `${this.name} has ${this.employees.length} employees.`;
    }
}
class Menu { // what drives the application and our choices
    constructor() {
        this.departments = [];
        this.selectedDepartment = null; // manage one team at a time
    }

    start() { // entry point to application
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createDepartment();
                    break;
                case '2':
                    this.viewDepartment();
                    break;
                case '3':
                    this.deleteDepartment();
                    break;
                case '4':
                    this.displayDepartments();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Have a nice day!');
    }


    showMainMenuOptions() {
        return prompt(`
    0) exit
    1) create a new Department
    2) view a Department
    3) delete a Department
    4) display all Departments
    `);
    }

    showDepartmentMenuOptions(departmentInfo) {
        return prompt(`
    0) back
    1) add a new employee
    2) delete a employee
    -----------------
    ${departmentInfo}
    `);
    }

    displayDepartments() {
        let departmentString = '';
        for (let i = 0; i < this.departments.length; i++) {
            departmentString += i + ') ' + this.departments[i].name + '\n';
        }
        alert(departmentString);
    }

    createDepartment() {
        let name = prompt('Enter name for new department: ');
        this.departments.push(new Department(name));
    }

    viewDepartment() {
        let index = prompt("Enter the index of the department that you wish to view:");
        if (index > -1 && index < this.departments.length) {
            this.selectedDepartment = this.departments[index];
            let description = 'Department Name: ' + this.selectedDepartment.name + '\n';
            description += ' ' + this.selectedDepartment.describe() + '\n ';
            for (let i = 0; i < this.selectedDepartment.employees.length; i++) {
                // description += i + ') ' + this.selectedTeam.players[i].name + ' - '
                // + this.selectedTeam.players[i].position + '\n';
                description += i + ') ' + this.selectedDepartment.employees[i].describe() + '\n';
            }
            let selection1 = this.showDepartmentMenuOptions(description);
            switch (selection1) {
                case '1':
                    this.createEmployee();
                    break;
                case '2':
                    this.deleteEmployee();
            }
        } // validate user input
    }

    deleteDepartment() {
        let index = prompt('Enter the index of the department that you wish to delete: ');
        if (index > -1 && index < this.departments.length) {
            this.departments.splice(index, 1);
        }
    }


    createEmployee() {
        let name = prompt('Enter name for new employee: ');
        let job = prompt('Enter job that new employee fulfulls: ');
        //this.selectedTeam.players.push(new Player(name, position));
        this.selectedDepartment.employees.push(new Employee(name, job));
    }

    deleteEmployee() {
        let index = prompt('Enter the index of the employee that you wish to delete: ');
        if (index > -1 && index < this.selectedDepartment.employees.length) {
            this.selectedDepartment.employees.splice(index, 1);
        }
    }
}
let menu = new Menu();
menu.start();
