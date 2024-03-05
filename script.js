// Create functions for basic operations: add, subtract, multiply, divide

// sum
// any number of arguments
// sum of all arguments
function sum(...args) {
  let sum = 0;
  for (arg of args) {
    sum += arg;
  }
  return sum;
}

// multiplication
function multiply(...args) {
  let product = 1;
  for (arg of args) {
    product *= arg;
  }
  return product;
}

// subtraction
function subtract(a, b) {
  return a - b;
}

function divide(a, b) {
  return a / b;
}

// Create variables for each calculator operation
let operandFirst = 3;
let operator = "/";
let operandSecond = 5;

// create a function called operate that calls these three variables
// and apt function from above

// Create an object that contain mappings of operator and function

let operationMappings = {
  "+": sum,
  "-": subtract,
  "*": multiply,
  "/": divide,
};

function operate(operandA, operandB, operator) {
  if (operator in operationMappings) {
    let operation = operationMappings[operator];
    return operation(operandA, operandB);
  }
}

// Create the functions that populate the display when you
// click the number buttons. You should be storing the
// ‘display value’ in a variable somewhere for use in the next step.

// Get the DOM object for all the calculator keys

// digits
const digits = document.querySelectorAll(".btn-digit");

// display value
const displayText = document.querySelector(".display-text");
let displayValue;

// loop over digits and apply click event listener to each digit button
// for click event, run a callback to print the text content on display text
digits.forEach((item) => {
  item.addEventListener("click", (event) => {
    // console.log(event.target.textContent);
    displayText.textContent += event.target.textContent;
    // store the display value to use later
    displayValue = displayText.textContent;
  });
});

// calculations
const btnFunc = document.querySelectorAll(".btn-func");

btnFunc.forEach((item) => {
  item.addEventListener("click", (event) => {
    // console.log(event.target.textContent);
    displayText.textContent += ` ${event.target.textContent} `;
    // store the operator
    operator = event.target.textContent;
    // store the display value to use later
    displayValue = displayText.textContent;
  });
});

// others
const btnCompute = document.querySelector(".btn-eq");
const btnAllClear = document.querySelector(".btn-allclear");
const btnClear = document.querySelector(".btn-clear");

// Make the calculator work
// once the equal button is clicked:
// Store the values and the operator
// call the operator function
// update the display text with the solution
let operandList;

btnCompute.addEventListener("click", (event) => {
  operandList = displayValue.split(operator);
  displayText.textContent = operate(
    parseInt(operandList[0]),
    parseInt(operandList[1]),
    operator
  );
});
