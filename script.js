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
let operandFirst;
let operator;
let operandSecond;

// create a function called operate that calls these three variables
// and apt function from above

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

// Get the DOM object for all the calculator keys

// digits
const digits = document.querySelectorAll(".btn-digit");

// display value
const displayText = document.querySelector(".display-text");
let displayValue;

// loop over digits and apply click event listener to each digit button
// for click event, run a callback to print the text content on display text
function appendDisplay(event) {
  displayText.textContent += event.target.textContent;
  // store the display value to use later
  displayValue = displayText.textContent;
}

digits.forEach((item) => {
  item.addEventListener("click", appendDisplay);
});

// calculations
const btnFunc = document.querySelectorAll(".btn-func");

/*
(event) => {
    let operandList = getOperandsIntoList(displayValue);
    console.log(operandList);
    // check if the expression is complete
    if (operandList.length === 2) {
      // if the expression is complete, then compute it
      // display the computed number
      // add the operator entered in the display
      computeOutput();
      updateDisplay(event);
    } else {
      // if the expression is not complete
      // add the operator entered in the display
      updateDisplay(event);
    }
    // store new operator variable
    operator = event.target.textContent;
  });

*/

btnFunc.forEach((item) => {
  item.addEventListener("click", (event) => {
    // first evaluate expression if it exists
    getOutput(displayValue);

    // update the display area with operator
    appendDisplay(event);
    operator = event.target.textContent;
  });
});

// others
const btnCompute = document.querySelector(".btn-eq");

function getOperandsIntoList(str) {
  let lst = str.split(operator);
  return lst.map((item) => parseInt(item));
}

function getOutput(displayValue) {
  let operandList = getOperandsIntoList(displayValue);
  if (operandList.length > 1) {
    let result = operate(
      parseInt(operandList[0]),
      parseInt(operandList[1]),
      operator
    );
    displayText.textContent = result;
  }
}

btnCompute.addEventListener("click", () => {
  getOutput(displayValue);
});

// Clear Functionality

const btnAllClear = document.querySelector(".btn-allclear");
const btnClear = document.querySelector(".btn-clear");
