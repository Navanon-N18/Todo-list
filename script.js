const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const filterBtns = document.querySelectorAll(".filter-btn");

let currentFilter = "all";

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

  const li = document.createElement("li");
  li.textContent = text;
  
  li.addEventListener("click", function () {
    li.classList.toggle("completed");
  });

  const deleteBtn =document.createElement("button");
  deleteBtn.textContent = "delete";
  deleteBtn.addEventListener("click",function(event){
    event.stopPropagation();
    li.remove();
  });
  
  li.appendChild(deleteBtn);
  todoList.appendChild(li);
  input.value = "";
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