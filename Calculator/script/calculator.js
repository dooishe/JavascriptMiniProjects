let calculation = localStorage.getItem("calculation") || "0";
displayCalculation();
function updateCalculation(value) {
  const operators = [" + ", " - ", " * ", " / "];
  if (calculation === "0") {
    if (operators.includes(value)) {
      calculation += value;
    } else if (value !== "0" && value !== ".") {
      calculation = value;
    } else if (value === ".") {
      calculation += value;
    }
    displayCalculation();
    localStorage.setItem("calculation", calculation);
    return;
  }
  calculation += value;
  displayCalculation();
  localStorage.setItem("calculation", calculation);
}
function displayCalculation() {
  document.querySelector(".js-calculation").textContent = calculation;
}
function deleteLastCharacter() {
  if (calculation === "0") return;
  if (calculation.length === 1) {
    calculation = "0";
  } else {
    calculation = calculation.slice(0, -1);
  }
  displayCalculation();
  localStorage.setItem("calculation", calculation);
}
function clear() {
  calculation = "0";
  displayCalculation();
  localStorage.setItem("calculation", calculation);
}
function equal() {
  calculation = eval(calculation).toString();
  displayCalculation();
  localStorage.setItem("calculation", calculation);
}
document
  .querySelector(".js-backspace")
  .addEventListener("click", deleteLastCharacter);
document.querySelector(".js-clear").addEventListener("click", clear);
document.querySelector(".js-equal").addEventListener("click", equal);
