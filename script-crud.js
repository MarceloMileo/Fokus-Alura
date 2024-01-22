const btnAddTask = document.querySelector(".app__button--add-task");
const btnCancelTask = document.querySelector(
  ".app__form-footer__button--cancel"
);
const formAddTask = document.querySelector(".app__form-add-task");
const textArea = document.querySelector(".app__form-textarea");
const taskList = document.querySelector(".app__section-task-list");
const inProgressTask = document.querySelector(".app__section-active-task-description");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let selectedTask = null;
let selectedTaskItem = null;

function updateTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskElement(task) {
  const li = document.createElement("li");
  li.classList.add("app__section-task-list-item");

  const svg = document.createElement("svg");
  svg.innerHTML = `
    <svg class="app_section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>
  `;

  const paragraph = document.createElement("p");
  paragraph.classList.add("app__section-task-list-item-description");
  paragraph.textContent = task.description;

  const btnEdit = document.createElement("button");
  btnEdit.classList.add("app_button-edit");
  btnEdit.onclick = () => {
    const newDescription = prompt("Qual é novo nome da tarefa");
    if (newDescription) {
      paragraph.textContent = newDescription;
      task.description = newDescription;
      updateTasks();
    }
  };

  const btnEditImg = document.createElement("img");

  btnEditImg.setAttribute("src", "/imagens/edit.png");
  btnEdit.append(btnEditImg);

  li.append(svg);
  li.append(paragraph);
  li.append(btnEdit);

  if(selectedTask.completed){
    li.classList.add('app__section-task-list-item-complete');
    btnEdit.setAttribute('disabled', 'disabled');
  } else {
    li.onclick = () => {
      inProgressTask.textContent = task.description;
      document.querySelectorAll(".app__section-task-list-item-active").forEach(element => {
        element.classList.remove("app__section-task-list-item-active")
      })
  
      if(selectedTask == task){
        inProgressTask.textContent = "";
        selectedTask = null;
        selectedTaskItem = null;
        return;
      }
  
      selectedTask = task;
      selectedTaskItem = li;
  
      li.classList.add("app__section-task-list-item-active");
    }
  }
  

  return li;
}

btnAddTask.addEventListener("click", () => {
  formAddTask.classList.toggle("hidden");
});

btnCancelTask.addEventListener("click", () => {
  textArea.value = "";
});

formAddTask.addEventListener("submit", (event) => {
  event.preventDefault();
  const task = {
    description: textArea.value,
  };

  tasks.push(task);
  const taskElement = createTaskElement(task);
  taskList.append(taskElement);
  updateTasks();
  textArea.value = "";
  formAddTask.classList.add("hidden");
});

tasks.forEach((task) => {
  const elementTask = createTaskElement(task);
  taskList.append(elementTask);
});

document.addEventListener('finishedTask', () => {
  if (selectedTask && selectedTaskItem) {
    selectedTaskItem.classList.remove('app__section-task-list-item-active');
    selectedTaskItem.classList.add('app__section-task-list-item-complete');
    selectedTaskItem.querySelector('button').setAttribute('disabled', 'disabled');
    selectedTask.completed = true;
    updateTasks()
  }
})
