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
   const input = document.getElementById('taskInput');
   //    if (input) {
   //       console.log(input.value);
   //   } else {
   //       console.log("Element not found!");
   //   }
   const text = input.value.trim();
   // console.log(text);
   if (text) {
      const task = new Task(Date.now(),text);
      tasks.push(task);
      showTask(task);
      input.value = '';
   }
}

function showTask(task) {
   const li = document.createElement('li');
   li.className = 'task-item';
   li.setAttribute('data-id', task.id);
   li.innerHTML = ` <button class ="btn btn-complete" onclick="completeTask(${task.id})">✅</button>
      <span class="task-text">${task.text}</span>
      <button class ="btn btn-timer" onclick="toggleTimer(${task.id})">⏳</button>
      <button class ="btn btn-delete" onclick="showDelete(${task.id})">❌</button>`;

      document.getElementById('taskList').appendChild(li);
}


function completeTask(taskId){
   const task = tasks.find(t => t.id === taskId)

   if(task){
      task.completed = !task.completed;
      updateTask(task);
   }
}
console.log(completeTask(taskId));


function updateTask(task){
   const taskElement = document.querySelector(`[data-id="${task.id}"]`);
   if(taskElement){
      const  textElement = taskElement.querySelector('.task-text');
      if(task.completed){
         textElement.style.textDecoration = 'line-through';
         textElement.style.color ='#888';

      } else{
         textElement.style.textDecoration = 'none';
         textElement.style.color ='#333';
      }
   }
}

function toggleTimer(taskId){
   const task = tasks.find( t => t.id === taskId);
   if(task){
      const btnTimer = document.querySelector(`[data-id="${task.id}"] .btn-timer`);


      if(task.timerRunning){
         clearInterval(task.timer);
         task.timerRunning = false;
         btnTimer.textContent = '⏳';
      }else{
         task.timeRunning = true;
         btnTimer.textContent = '⌛';
      }
   }
}

function showDelete(taskId){
   taskToDelete = taskId;
   document.getElementById('deleteModal').classList.add('active');
}

function confirmDelete(){
   if(taskToDelete !== null){
         const taskElement = document.querySelector(`[data-id="${taskToDelete}"]`);
         if(taskElement){
            taskElement.style.animation ='slideIn 0.3s ease reverse';
            setTimeout(()=>{
               taskElement.remove();
               tasks = tasks.filter(t => t.id !== taskToDelete)
            },300);
         }

   }
   closeModal();
}

function closeModal(){
   document.getElementById('deleteModal').classList.remove('active');
   taskToDelete = null;
}
document.addEventListener('contextmenu', function(e) {
   const taskItem = e.target.closest('.task-item');
   if (taskItem) {
       e.preventDefault();
       selectedTask = parseInt(taskItem.getAttribute('data-id'));
       const contextMenu = document.getElementById('contextMenu');
       contextMenu.style.top = e.pageY + 'px';
       contextMenu.style.left = e.pageX + 'px';
       contextMenu.classList.add('active');
   }
});


document.addEventListener('click', function() {
   document.getElementById('contextMenu').classList.remove('active');
});



document.getElementById('taskInput').addEventListener('keypress', function(e) {
   if (e.key === 'Enter') {
       addTask();
   }
});
