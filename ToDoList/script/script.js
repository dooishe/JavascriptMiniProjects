const inputElement = document.querySelector(".js-input");
const dateElement = document.querySelector(".js-date");
const toDoListElement = document.querySelector(".js-to-do-list");

let toDoList = [];
try {
  const savedData = localStorage.getItem("toDoList");
  toDoList = savedData ? JSON.parse(savedData) : [];
} catch (e) {
  console.error("Ошибка загрузки данных:", e);
  toDoList = [];
}

function setLocalStorage() {
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
}
function formatDate(date) {
  if (!date) return "Без даты";
  return new Date(date).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}
function renderToDoList() {
  setLocalStorage();
  toDoListElement.innerHTML = toDoList
    .map(
      (item, index) =>
        `<div class = 'to-do-row'>
			<p>${item.task.trim()}</p>
			<p>${formatDate(item.date)}</p>
			<button class = 'js-delete-button delete-button' data-index = "${index}">
			Delete
			</button>
		</div>`
    )
    .join("");
}
function makeNewToDoList() {
  if (inputElement.value.trim() === "") return;
  toDoList.push({
    task: inputElement.value,
    date: dateElement.value,
  });
  renderToDoList();
  inputElement.value = "";
}

function setupEventListeners() {
  document
    .querySelector(".js-add-button")
    .addEventListener("click", makeNewToDoList);
  inputElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      makeNewToDoList();
    }
  });
  toDoListElement.addEventListener("click", (event) => {
    if (event.target.classList.contains("js-delete-button")) {
      const index = event.target.dataset.index;
      toDoList.splice(index, 1);
      renderToDoList();
    }
  });
}

function init() {
  renderToDoList();
  setupEventListeners();
  inputElement.focus();
}

init();
