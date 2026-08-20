const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

addBtn.addEventListener("click", addTodo);

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