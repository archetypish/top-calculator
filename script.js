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
  if (b === 0) {
    return "nope";
  }
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
    let result = operation(operandA, operandB);
    if (typeof result === "number") return Math.round(result * 1000) / 1000;
    return result;
  }
}

// Get the DOM object for all the calculator keys

// digits
const digits = document.querySelectorAll(".btn-digit");

// display value
const displayText = document.querySelector(".display-text");
let displayValue = "";

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

function addOperator(event) {
  // first evaluate expression if it exists
  getOutput(displayValue);

  // update the display area with operator
  appendDisplay(event);
  operator = event.target.textContent;
}

btnFunc.forEach((item) => {
  item.addEventListener("click", addOperator);
});

// others
const btnCompute = document.querySelector(".btn-eq");

function getOperandsIntoList(str) {
  let lst = str.split(operator);
  return lst.map((item) => Number(item));
}

function getOutput(displayValue) {
  let operandList = getOperandsIntoList(displayValue);

  if (operandList.length > 1) {
    let result = operate(
      // Handle both floating point and integers
      operandList[0],
      operandList[1],
      operator
    );
    displayText.textContent = result;
    // update display Value
    displayValue = displayText.textContent;
  }
}

btnCompute.addEventListener("click", () => {
  getOutput(displayValue);
});

// Clear Functionality

function clearDisplay(event) {
  displayText.textContent = "";
  displayValue = "";
}

const btnAllClear = document.querySelector(".btn-allclear");

btnAllClear.addEventListener("click", clearDisplay);

// Decimal functionality

const digitDot = document.querySelector(".digit-dot");

function addDecimal(event) {
  let currentOperand = getOperandsIntoList(displayValue).at(-1);
  if (!String(currentOperand).includes(".")) {
    appendDisplay(event);
  }
}

digitDot.addEventListener("click", addDecimal);

// Backspace Functionality
const btnClear = document.querySelector(".btn-clear");

function backspace(event) {
  displayText.textContent = displayValue.slice(0, displayValue.length - 1);
  displayValue = displayText.textContent;
}

btnClear.addEventListener("click", backspace);

// Add Keyboard support

// Encapsulate event handlers into functions
// Trigger these functions once appropriate key is pressed

function appendDisplayFromKeyboard(event) {
  displayText.textContent += event.key;
  // store the display value to use later
  displayValue = displayText.textContent;
}

// Keyboard support for entering numbers
let numericKeyCodeList = [];
for (let i = 0; i <= 9; i++) {
  numericKeyCodeList.push(`Digit${i}`);
}

let operatorKeyCodeList = [];
operatorKeyCodeList.push("NumpadAdd");
operatorKeyCodeList.push("NumpadSubtract");
operatorKeyCodeList.push("NumpadMultiply");
operatorKeyCodeList.push("NumpadDivide");
console.log(operatorKeyCodeList);

//// Keyboard support for
// / NumpadDivide
// * NumpadMultiply
// - NumpadSubtract
// + NumpadAdd

document.addEventListener("keydown", (event) => {
  console.log(event.code);
  // if number key is pressed then add numbers to the screen
  if (numericKeyCodeList.includes(event.code)) {
    appendDisplayFromKeyboard(event);
  } else if (operatorKeyCodeList.includes(event.code)) {
    addOperatorFromKeyboard(event);
  }

  // if operator key is pressed, then execute if possible, then add the operator
});

function addOperatorFromKeyboard(event) {
  console.log("Calling execution");
  console.log(`displayValue ${displayValue}`);
  // first evaluate expression if it exists
  getOutput(displayValue);

  // update the display area with operator
  appendDisplayFromKeyboard(event);
  operator = event.key;
}
