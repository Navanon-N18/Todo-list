const input = document.getElementById("todo-input");
const dateInput = document.getElementById("todo-date");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const filterBtns = document.querySelectorAll(".filter-btn");

let currentFilter = "all";
let todos = JSON.parse(localStorage.getItem("todos")) || [];

dateInput.valueAsDate = new Date();

addBtn.addEventListener("click", addTodo);

filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    filterBtns.forEach(function (b) {
      b.classList.remove("active");
    });
    btn.classList.add("active");

    currentFilter = btn.dataset.filter;
    renderAll();
  });
});

function addTodo() {
  const text = input.value.trim();

  if (text === "") {
    return;
  }

  const date = dateInput.value || new Date().toISOString().split("T")[0];

  todos.push({ text: text, completed: false, date: date });
  saveTodos();

  input.value = "";
  renderAll();
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function formatDateLabel(dateStr) {
  const date = new Date(dateStr + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffDays = Math.round((date - today) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "วันนี้";
  if (diffDays === 1) return "พรุ่งนี้";
  if (diffDays === -1) return "เมื่อวาน";

  return date.toLocaleDateString("th-TH", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
}

function getFilteredTodos() {
  return todos.filter(function (todo) {
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true;
  });
}

function renderAll() {
  todoList.innerHTML = "";

  const filtered = getFilteredTodos();

  const grouped = {};
  filtered.forEach(function (todo) {
    if (!grouped[todo.date]) grouped[todo.date] = [];
    grouped[todo.date].push(todo);
  });

  const sortedDates = Object.keys(grouped).sort();

  sortedDates.forEach(function (date) {
    const header = document.createElement("li");
    header.classList.add("date-header");
    header.textContent = formatDateLabel(date);
    todoList.appendChild(header);

    grouped[date].forEach(function (todo) {
      todoList.appendChild(renderTodo(todo));
    });
  });
}

function renderTodo(todo) {
  const li = document.createElement("li");
  li.classList.add("todo-item");

  const dot = document.createElement("span");
  dot.classList.add("status-dot");
  dot.classList.add(todo.completed ? "dot-done" : "dot-pending");

  const textSpan = document.createElement("span");
  textSpan.textContent = todo.text;
  textSpan.classList.add("todo-text");

  li.appendChild(dot);
  li.appendChild(textSpan);

  if (todo.completed) {
    li.classList.add("completed");
  }

  li.addEventListener("click", function () {
    todo.completed = !todo.completed;
    saveTodos();
    renderAll();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    todos = todos.filter(function (t) {
      return t !== todo;
    });
    saveTodos();
    renderAll();
  });

  li.appendChild(deleteBtn);

  return li;
}

renderAll();