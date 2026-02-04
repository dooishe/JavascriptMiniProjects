let calculation = localStorage.getItem("calculation") || "";
document.addEventListener("DOMContentLoaded", () => {
  displayCalculation();
  initializeEventListeners();
});

function updateCalculation(value) {
  calculation += value;
  displayCalculation();
  localStorage.setItem("calculation", calculation);
}
function displayCalculation() {
  const inputElement = document.querySelector(".js-calculation");
  if (inputElement) {
    inputElement.value = calculation;
    inputElement.scrollLeft = inputElement.scrollWidth;
  }
}
function deleteLastCharacter() {
  if (calculation === "") return;
  calculation = calculation.slice(0, -1);
  displayCalculation();
  localStorage.setItem("calculation", calculation);
}
function clear() {
  calculation = "";
  displayCalculation();
  localStorage.setItem("calculation", calculation);
}
function equal() {
  calculation = eval(calculation).toString();
  displayCalculation();
  localStorage.setItem("calculation", calculation);
}
function handleInputChange(event) {
  const inputElement = event.target;
  calculation = inputElement.value;
  inputElement.scrollLeft = inputElement.scrollWidth;
  localStorage.setItem("calculation", calculation);
}
function handleInputKeyUp(event) {
  if (event.key === "Enter") {
    equal();
  }
}
function initializeEventListeners() {
  document
    .querySelector(".js-backspace")
    .addEventListener("click", deleteLastCharacter);
  document.querySelector(".js-clear").addEventListener("click", clear);
  document.querySelector(".js-equal").addEventListener("click", equal);
  document
    .querySelector(".js-calculation")
    .addEventListener("input", (event) => handleInputChange(event));
  document
    .querySelector(".js-calculation")
    .addEventListener("keyup", (event) => handleInputKeyUp(event));
}
