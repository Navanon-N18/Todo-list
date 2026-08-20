const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const filterBtns = document.querySelectorAll(".filter-btn");

let currentFilter = "all";
let todos = JSON.parse(localStorage.getItem("todos")) || [];

addBtn.addEventListener("click", addTodo);

filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    filterBtns.forEach(function (b) {
      b.classList.remove("active");
    });
    btn.classList.add("active");

    currentFilter = btn.dataset.filter;
    applyFilter();
  });
});

function addTodo() {
  const text = input.value.trim();

  if (text === "") {
    return;
  }

  const todo = { text: text, completed: false };
  todos.push(todo);
  saveTodos();
  renderTodo(todo);

  input.value = "";
  applyFilter();
}

function renderTodo(todo) {
  const li = document.createElement("li");
  li.textContent = todo.text;

  if (todo.completed) {
    li.classList.add("completed");
  }

  li.addEventListener("click", function () {
    todo.completed = !todo.completed;
    li.classList.toggle("completed");
    saveTodos();
    applyFilter();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "delete";
  deleteBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    todos = todos.filter(function (t) {
      return t !== todo;
    });
    li.remove();
    saveTodos();
  });

  li.appendChild(deleteBtn);
  todoList.appendChild(li);
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function applyFilter() {
  const items = todoList.querySelectorAll("li");

  items.forEach(function (item) {
    const isCompleted = item.classList.contains("completed");

    if (currentFilter === "all") {
      item.style.display = "flex";
    } else if (currentFilter === "active") {
      item.style.display = isCompleted ? "none" : "flex";
    } else if (currentFilter === "completed") {
      item.style.display = isCompleted ? "flex" : "none";
    }
  });
}

todos.forEach(renderTodo);
applyFilter();