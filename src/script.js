import './style.css'
import './script'
import './javascript.svg'




const taskField = document.getElementById("text");
const addTextButton = document.getElementById("addText");
const taskList = document.getElementById("taskList");
const deleteAllButton = document.querySelector(".deleteAll")


function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach(item => {
    const taskText = item.firstChild.textContent.trim();
    tasks.push(taskText);
  });
  localStorage.setItem("taskList", JSON.stringify(tasks));
}


function loadTasks() {
  const storedTasks = localStorage.getItem("taskList");
  if (storedTasks) {
    const tasks = JSON.parse(storedTasks);
    tasks.forEach(taskText => {
      addTaskToPage(taskText);
    })
  }
}

function addTaskToPage(taskText) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = taskText;
  li.appendChild(span);

  const deleteTask = document.createElement("button");
  deleteTask.textContent = "Удалить";
  deleteTask.onclick = function () {
    li.remove();
    saveTasks();
  };
  
  const editTask = document.createElement("button");
  editTask.textContent = "Редактировать";
  editTask.onclick = function () {
    const newText = prompt("Измените задачу:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
      span.textContent = newText.trim();
      saveTasks();
    }
  };

  li.appendChild(editTask);
  li.appendChild(deleteTask);
  taskList.appendChild(li);
}


taskField.addEventListener("keydown", function(event) {
  if (event.key == "Enter") {
    addText()
  }
})

function addText() {
  const text = taskField.value.trim();
  // если в localStorage пусто → []
  const tasks = JSON.parse(localStorage.getItem("taskList")) || [];

  if (text !== "" && !tasks.includes(text)) {
    addTaskToPage(text);
    saveTasks();
    taskField.value = "";
  }
}

addTextButton.addEventListener('click', addText)


function deleteAll() {
  localStorage.setItem("taskList", JSON.stringify([]))
  taskList.innerHTML = "";
}
deleteAllButton.addEventListener('click', deleteAll)

document.addEventListener("DOMContentLoaded", loadTasks);
