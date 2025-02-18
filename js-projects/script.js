let tasks = [];
let selectedTask = null;
let taskToDelete = null;

class Task {
   constructor(id, text) {
      this.id = id;
      this.text = text;
      this.completed = false;
      this.timer = null;
      this.timeRunning = false;

   }
}

function addTask() {
   const input = document.getElementById('task-input');
   //    if (input) {
   //       console.log(input.value);
   //   } else {
   //       console.log("Element not found!");
   //   }
   const text = input.value;
   // console.log(text);
   if (text) {
      const task = new Task(text);
      tasks.push(task);
      // showTask(task);
      input.value = '';
   }
}

function showTask(task) {
   const li = document.createElement('li');
   li.className = 'task-item';
   li.setAttribute('data-id', task.id);
   li.innerHTML = ` <button class ="btn btn-complete" onclick="completeTask(${task.id})">✅</button>
      <span class="task-text">${task.text}</span>
      <button class ="btn btn-timer" onclick="toggleTimer(${task.id}>⏳</button>
      <button class ="btn btn-delete" onclick="showDeleteConfirmation(${task.id}>❌</button>`;

      document.getElementById('tasklist').appendChild(li);
}


function completeTask(taskId){
   const task = tasks.find(function t)
}
