// Your code here
// Create a function to create an employee record.
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

// Create a function to create an array of employee records.
function createEmployeeRecords(employeeData) {
  return employeeData.map(createEmployeeRecord);
}

// Create a function to record an employee's time-in event.
function createTimeInEvent(employee, timeStamp) {
  const [date, hour] = timeStamp.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });
  return employee;
}

// Create a function to record an employee's time-out event.
function createTimeOutEvent(employee, timeStamp) {
  const [date, hour] = timeStamp.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });
  return employee;
}

// Create a function to calculate hours worked on a specific date.
function hoursWorkedOnDate(employee, date) {
  const timeInEvent = employee.timeInEvents.find((event) => event.date === date);
  const timeOutEvent = employee.timeOutEvents.find(
    (event) => event.date === date
  );

  if (timeInEvent && timeOutEvent) {
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  }

  return 0;
}

// Create a function to calculate wages earned on a specific date.
function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  return hoursWorked * employee.payPerHour;
}

// Create a function to calculate total pay owed to an employee.
function allWagesFor(employee) {
  const datesWorked = employee.timeInEvents.map((event) => event.date);
  const totalWages = datesWorked.reduce(
    (acc, date) => acc + wagesEarnedOnDate(employee, date),
    0
  );
  return totalWages;
}

// Create a function to calculate the total payroll for all employees.
function calculatePayroll(employees) {
  return employees.reduce((acc, employee) => acc + allWagesFor(employee), 0);
}

// Example usage:
const employeeData = [
  ["John", "Doe", "Manager", 20],
  ["Jane", "Smith", "Assistant", 15],
];

const employees = createEmployeeRecords(employeeData);

// Record time-in and time-out events for employees
createTimeInEvent(employees[0], "2023-10-05 0800");
createTimeOutEvent(employees[0], "2023-10-05 1700");

createTimeInEvent(employees[1], "2023-10-05 0900");
createTimeOutEvent(employees[1], "2023-10-05 1600");

console.log(allWagesFor(employees[0])); // Calculate wages for John
console.log(allWagesFor(employees[1])); // Calculate wages for Jane

console.log(calculatePayroll(employees)); // Calculate total payroll for all employees
