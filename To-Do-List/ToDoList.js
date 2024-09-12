// Select DOM elements
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

// Load existing todos from localStorage
document.addEventListener("DOMContentLoaded", loadTodos);

// Event listener for adding a new todo
addBtn.addEventListener("click", addTodo);

// Function to add a todo
function addTodo() {
  const todoText = todoInput.value;

  if (todoText.trim() !== "") {
    const li = document.createElement("li");
    li.textContent = todoText;

    // Create a remove button for each todo
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");
    li.appendChild(removeBtn);

    todoList.appendChild(li);

    // Add to localStorage
    saveTodoToLocalStorage(todoText);

    // Clear input
    todoInput.value = "";

    // Add event listener for remove button
    removeBtn.addEventListener("click", () => {
      li.remove();
      removeTodoFromLocalStorage(todoText);
    });
  }
}

// Function to save todo to localStorage
function saveTodoToLocalStorage(todo) {
  let todos = getTodosFromLocalStorage();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to get todos from localStorage
function getTodosFromLocalStorage() {
  return localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
}

// Function to load todos from localStorage
function loadTodos() {
  let todos = getTodosFromLocalStorage();
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");
    li.appendChild(removeBtn);

    todoList.appendChild(li);

    // Add event listener for remove button
    removeBtn.addEventListener("click", () => {
      li.remove();
      removeTodoFromLocalStorage(todo);
    });
  });
}

// Function to remove todo from localStorage
function removeTodoFromLocalStorage(todo) {
  let todos = getTodosFromLocalStorage();
  todos = todos.filter((t) => t !== todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
