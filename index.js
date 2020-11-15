const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const previousInput = document.querySelector(".previous-input");
const currentInput = document.querySelector(".current-input");
const submit = document.querySelector(".submit");
const deleteOne = document.querySelector(".delete");
const clearAll = document.querySelector(".clear-all");

const calculator = {
  previousValue: null,
  currentValue: null,
  operator: null
}

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    appendNumber(button.innerText);
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    chooseOperation(button.innerText);
  })
})

submit.addEventListener('click', () => {
    if(currentInput.innerText === null || currentInput.innerText === "" || currentInput.innerText === "."){
      return;
    } else if(previousInput.innerText !== null && previousInput !== ""){
      calculator.currentValue = currentInput.innerText;
      calculate();
    }
})

deleteOne.addEventListener('click', () => {
    currentInput.innerText = currentInput.innerText.substring(0, currentInput.innerText.length - 1);
})

clearAll.addEventListener('click', () => {
    calculator.previousValue = null;
    calculator.currentValue = null;
    calculator.operator = null;
    previousInput.innerText = "";
    currentInput.innerText = "";
})

const appendNumber = (number) => {
  if(number === "." && currentInput.innerText.includes(".")){
    return;
  } else{
    currentInput.innerText += number;
  }
}

const chooseOperation = (operation) => {
  if(currentInput.innerText === "" && previousInput.innerText === ""){
    return;
  } else if(currentInput.innerText === "."){
    return;
  } else if(calculator.operator === null){
    calculator.previousValue = currentInput.innerText;
    calculator.operator = operation;
    previousInput.innerText = currentInput.innerText + " " + operation;
  } else if(currentInput.innerText !== ""){
    calculator.currentValue = currentInput.innerText;
    calculate();
    chooseOperation(operation);
  } else {
    previousInput.innerText = calculator.previousValue + " " + operation;
    calculator.operator = operation;
  }

  currentInput.innerText = "";
}

const calculate = () => {
  let firstNum = parseFloat(calculator.previousValue);
  let secondNum = parseFloat(calculator.currentValue);
  console.log(firstNum, secondNum);
  let sum;

  switch(calculator.operator){
    case("+"):
      sum = firstNum + secondNum;
      break;
    case("-"):
      sum = firstNum - secondNum;
      break;
    case("*"):
      sum = firstNum * secondNum;
      break;
    case("/"):
      sum = firstNum / secondNum;
      break;
    default:
      return;
  }

  previousInput.innerText = "";
  currentInput.innerText = sum;
  calculator.previousValue = null;
  calculator.currentValue = sum;
  calculator.operator = null;
}
