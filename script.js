let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

window.onload = function () {
  displayTasks();
  updateDateTime();
};

function addTask() {
  let input = document.getElementById("taskInput");
  let category = document.getElementById("category").value;

  let task = input.value;

  if (task === "") {
    alert("Please enter a task");
    return;
  }

  tasks.push({ text: task, completed: false, category: category });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  input.value = "";
  displayTasks();
}

function displayTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    li.innerHTML = `
      <span onclick="toggleTask(${index})" class="${task.completed ? 'completed' : ''}">
        ${task.text} - ${task.category}
      </span>
      <button onclick="deleteTask(${index})">❌</button>
    `;

    list.appendChild(li);
  });
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

// 🌙 Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// 📅 Date & Time
function updateDateTime() {
  let now = new Date();
  document.getElementById("dateTime").innerText =
    now.toLocaleString();
}

setInterval(updateDateTime, 1000);