const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operator");
const percentButton = document.querySelector(".modulo");
const dotButton = document.querySelector(".dot");
const display = document.querySelector(".screen");
const clearButton = document.querySelector(".clear");
const plusMinusButton = document.querySelector(".pm");
let firstNumber = "";
let secondNumber = "";
let operator = "";
let isOperatorChosen = false;
const MAX_DIGITS = 9;

// Function to find an operator button by its text content
function getOperatorButton(op) {
  return Array.from(operators).find((button) => button.textContent === op);
}

function appendNumber(value) {
  // Check if the number of characters on the display exceeds MAX_DIGITS
  if (display.textContent.length >= MAX_DIGITS && value !== ".") {
    return; // Stop appending if the length of the display exceeds MAX_DIGITS
  }

  if (!isOperatorChosen) {
    if (value === "." && !firstNumber.includes(".")) {
      firstNumber += value;
      display.textContent = firstNumber;
    } else if (/\d/.test(value)) {
      firstNumber += value;
      display.textContent = firstNumber;
    }
  } else {
    if (value === "." && !secondNumber.includes(".")) {
      secondNumber += value;
      display.textContent = secondNumber;
    } else if (/\d/.test(value)) {
      secondNumber += value;
      display.textContent = secondNumber;
    }
  }
}

function chooseOperator(op, button) {
  if (firstNumber) {
    if (isOperatorChosen) {
      calculate();
    }
    operator = op;
    isOperatorChosen = true;

    operators.forEach((btn) => btn.classList.remove("selected"));

    if (button) {
      button.classList.add("selected");
    }
  }
}

function calculate() {
  let result = 0;
  const num1 = parseFloat(firstNumber);
  const num2 = parseFloat(secondNumber);

  if (isOperatorChosen && num2 !== undefined) {
    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "×":
        result = num1 * num2;
        break;
      case "÷":
        result = num1 / num2;
        break;
    }
  } else {
    result = num1; // If no second number is present, just return the first number
  }

  if (result.toString().length > MAX_DIGITS) {
    result = parseFloat(result.toPrecision(MAX_DIGITS));
  }

  display.textContent = result.toString().slice(0, MAX_DIGITS);
  firstNumber = result.toString(); // Set result as the new firstNumber
  secondNumber = "";
  isOperatorChosen = false;
  operator = "";

  operators.forEach((btn) => btn.classList.remove("selected"));
}

function handlePercent() {
  if (!isOperatorChosen) {
    firstNumber = (parseFloat(firstNumber) / 100).toString();
    display.textContent = firstNumber;
  } else if (secondNumber) {
    secondNumber = (
      (parseFloat(firstNumber) * parseFloat(secondNumber)) /
      100
    ).toString();
    display.textContent = secondNumber;
  }
}

function resetCalculator() {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  isOperatorChosen = false;

  operators.forEach((btn) => btn.classList.remove("selected"));
}

function handleBackspace() {
  if (!isOperatorChosen) {
    firstNumber = firstNumber.slice(0, -1);
    display.textContent = firstNumber;
  } else {
    secondNumber = secondNumber.slice(0, -1);
    display.textContent = secondNumber;
  }
}

function toggleSign() {
  if (!isOperatorChosen) {
    // Toggle sign for firstNumber
    firstNumber = (parseFloat(firstNumber) * -1).toString();
    display.textContent = firstNumber;
  } else if (secondNumber) {
    // Toggle sign for secondNumber
    secondNumber = (parseFloat(secondNumber) * -1).toString();
    display.textContent = secondNumber;
  }
}

numbers.forEach((button) => {
  button.addEventListener("click", function () {
    appendNumber(button.textContent);
  });
});

operators.forEach((button) => {
  button.addEventListener("click", function () {
    chooseOperator(button.textContent, button);
  });
});

dotButton.addEventListener("click", function () {
  appendNumber(".");
});

plusMinusButton.addEventListener("click", toggleSign);

document.querySelector(".equal").addEventListener("click", calculate);

clearButton.addEventListener("click", function () {
  display.textContent = "";
  resetCalculator();
});

percentButton.addEventListener("click", handlePercent);

document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (/\d/.test(key)) {
    appendNumber(key);
  } else if (key === "+") {
    chooseOperator("+", getOperatorButton("+"));
  } else if (key === "-") {
    chooseOperator("-", getOperatorButton("-"));
  } else if (key === "*") {
    chooseOperator("×", getOperatorButton("×"));
  } else if (key === "/") {
    chooseOperator("÷", getOperatorButton("÷"));
  } else if (key === "Enter" || key === "=") {
    calculate();
  } else if (key === "Escape") {
    display.textContent = "";
    resetCalculator();
  } else if (key === "Backspace") {
    handleBackspace();
  } else if (key === "%") {
    handlePercent();
  } else if (key === ".") {
    appendNumber(".");
  }
});
