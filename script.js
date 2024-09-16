const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operator");
const percentButton = document.querySelector(".modulo");
const dotButton = document.querySelector(".dot");
const display = document.querySelector(".screen");
const clearButton = document.querySelector(".clear");
let firstNumber = "";
let secondNumber = "";
let operator = "";
let isOperatorChosen = false;
const MAX_DIGITS = 12;

function appendNumber(value) {
  if (!isOperatorChosen) {
    if (value === "." && !firstNumber.includes(".")) {
      firstNumber += value;
      display.textContent = firstNumber;
    } else if (/\d/.test(value) && firstNumber.length < MAX_DIGITS) {
      firstNumber += value;
      display.textContent = firstNumber;
    }
  } else {
    if (value === "." && !secondNumber.includes(".")) {
      secondNumber += value;
      display.textContent = secondNumber;
    } else if (/\d/.test(value) && secondNumber.length < MAX_DIGITS) {
      secondNumber += value;
      display.textContent = secondNumber;
    }
  }
}

function chooseOperator(op) {
  if (firstNumber) {
    if (isOperatorChosen) {
      calculate(); // Calculate the result if an operator is selected after a result
    }
    operator = op;
    isOperatorChosen = true;
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

numbers.forEach((button) => {
  button.addEventListener("click", function () {
    appendNumber(button.textContent);
  });
});

operators.forEach((button) => {
  button.addEventListener("click", function () {
    chooseOperator(button.textContent);
  });
});

dotButton.addEventListener("click", function () {
  appendNumber(".");
});

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
    chooseOperator("+");
  } else if (key === "-") {
    chooseOperator("-");
  } else if (key === "*") {
    chooseOperator("×");
  } else if (key === "/") {
    chooseOperator("÷");
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
