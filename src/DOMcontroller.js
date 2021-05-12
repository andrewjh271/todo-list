import * as Observer from './observer';
import Todo from './todo.js';

const projectList = document.querySelector('.project-list');

const project = document.querySelector('.project');
const projectTitle = project.querySelector('.project-title');
const projectDescription = project.querySelector('.project-description');
const newTodoButton = project.querySelector('.new-todo');
const todoForm = project.querySelector('.new-todo-form');
const cancelTodo = project.querySelector('.cancel-todo');
const todoTable = project.querySelector('.todo-table');
const todos = todoTable.querySelector('.todo-items');
const headings = todoTable.querySelectorAll('th');

projectList.addEventListener('click', showProject);

newTodoButton.addEventListener('click', toggleTodoForm);
todoForm.addEventListener('submit', addTodo);
cancelTodo.addEventListener('click', toggleTodoForm);
headings.forEach(heading => heading.addEventListener('click', sortDisplay));

todos.addEventListener('click', toggleProgress);
todos.addEventListener('click', deleteTodo);

let currentProject;
let sortParam;

Observer.on('updateCurrentProject', updateCurrentProject);
Observer.on('updateProjects', updateProjects);

function updateProjects(projects) {
  projectList.innerHTML = projects
    .map(
      (project, i) => `
        <li data-index='${i}'>${project.title}</li>`
    )
    .join('');
}

function showProject(e) {
  if(e) {
    const index = e.target.dataset.index;
    Observer.emit('assignCurrentProject', index);
  }
  // currentProject updated from updateCurrentProject event
  project.classList.remove('hidden');
  projectTitle.innerHTML = currentProject.title;
  if (currentProject.description) projectDescription = currentProject.projectDescription;
  todos.innerHTML = currentProject.todos
    .sort((a, b) => (a[sortParam] < b[sortParam] ? -1 : 1))
    .map(
      (todo, i) => `
      <tr>
      <td>${todo.title}</td>
      <td>${todo.dueDateFormatted}</td>
      <td>${todo.priorityInWords}</td>
      <td>
        <button class='progress' data-index='${i}'>
          ${
            todo.isComplete
              ? "<span class='material-icons'>task_alt</span>"
              : "<span class='material-icons'>remove_circle_outline</span>"
          }
        </button>
      </td>
      <td><button class='delete' data-index='${i}'>Delete</button></td>
      </tr>`
    )
    .join('');
}

function toggleTodoForm(e) {
  e.preventDefault();
  newTodoButton.classList.toggle('hidden');
  todoForm.classList.toggle('hidden');
}

function updateCurrentProject(project) {
  currentProject = project;
}

function sortDisplay(e) {
  sortParam = e.target.dataset.name;
  showProject();
}

function toggleProgress(e) {
  if (!e.target.matches('.progress')) return;

  const index = e.target.dataset.index;
  currentProject.todos[index].toggleComplete();
  showProject();
  console.log('toggle!', e.target.dataset.index);
}

function deleteTodo(e) {
  if (!e.target.matches('.delete')) return;

  const index = e.target.dataset.index;
  currentProject.removeTodo(index);
  showProject();
  console.log('delete!', e.target.dataset.index);
}

function addTodo(e) {
  e.preventDefault();

  const todo = new Todo({
    title: this.querySelector('[name=title]').value,
    description: this.querySelector('[name=description]').value,
    dueDate: this.querySelector('[name=due-date]').value,
    priority: this.querySelector('[name=priority]').value,
  })
  currentProject.addTodo(todo);
  this.reset();
  toggleTodoForm(e);
  showProject();
}