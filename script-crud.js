const taskListContainer = document.querySelector(".app__section-task-list");
const formTask = document.querySelector(".app__form-add-task");
const toogleFormTaskBtn = document.querySelector(".app__button--add-task");
const formLabel = document.querySelector(".app__form-label");
const textArea = document.querySelector(".app__form-textarea");
const cancelBtn = document.querySelector(".app__form-footer__button--cancel");
const taskIconSVG = `
<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF" />
    <path
        d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
        fill="#01080E" />
</svg>
`;

tasks = [];

const clearForm = () => {
  textArea.value = "";
};
function createTask(tasks) {
  const li = document.createElement("li");
  li.classList.add("app__section-task-list-item");

  const svgIcon = document.createElement("svg");
  svgIcon.innerHTML = taskIconSVG;

  const paragraph = document.createElement("p");
  paragraph.classList.add("app__section-task-list-item-description");

  paragraph.textContent = tasks.description;

  li.appendChild(svgIcon);
  li.appendChild(paragraph);

  return li;
}

tasks.forEach((task) => {
  const taskItem = createTask(task);
  taskListContainer.appendChild(taskItem);
});

toogleFormTaskBtn.addEventListener("click", () => {
  formLabel.textContent = "Adicionando tarefa";
  formTask.classList.toggle("hidden");
});

formTask.addEventListener("submit", (event) => {
  event.preventDefault();
  const task = {
    description: textArea.value,
    completed: false,
  };

  tasks.push(task);
  const taskItem = createTask(task);
  taskListContainer.appendChild(taskItem);
  clearForm();
});

cancelBtn.addEventListener("click", () => {
  formTask.classList.toggle("hidden");
});

localStorage.setItem("quantity", 10);
console.log(localStorage.getItem("quantity"));
