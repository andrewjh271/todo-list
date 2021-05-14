import * as Observer from './observer';
import * as todoDOMObject from './todoDOMObject';
import './projectForm';
import { currentProject } from './projectsManager';
import Todo from './todo';

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
todos.addEventListener('click', viewTodo);
todos.addEventListener('click', deleteTodo);

let sortParam;

Observer.on('updateProjects', updateProjects);
Observer.on('updateProject', showProject);

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
  if(!currentProject) return;
  project.classList.remove('hidden');
  projectTitle.textContent = currentProject.title;
  projectDescription.textContent = currentProject.description;
  todos.innerHTML = currentProject.todos
    .sort((a, b) => (a[sortParam] < b[sortParam] ? -1 : 1))
    .map(
      (todo, i) => `
      <tr>
      <td>${todo.title}</td>
      <td>${todo.dueDateFormatted}</td>
      <td>${todo.priority}</td>
      <td>
        <button class='progress' data-index='${i}'>
          ${
            todo.isComplete
              ? "<span class='material-icons'>task_alt</span>"
              : "<span class='material-icons'>remove_circle_outline</span>"
          }
        </button>
      </td>
      <td><button class='view' data-index='${i}'>View</button></td>
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

function sortDisplay(e) {
  sortParam = e.target.dataset.name;
  showProject();
}

function toggleProgress(e) {
  if (!e.target.matches('.progress')) return;

  const index = e.target.dataset.index;
  currentProject.todos[index].toggleComplete();
}

function viewTodo(e) {
  if (!e.target.matches('.view')) return;

  const index = e.target.dataset.index;
  todoDOMObject.display(currentProject.todos[index]);
}

function deleteTodo(e) {
  if (!e.target.matches('.delete')) return;

  const index = e.target.dataset.index;
  currentProject.removeTodo(index);
}

function addTodo(e) {
  e.preventDefault();

  const todo = new Todo({
    title: this.querySelector('[name=title]').value,
    description: this.querySelector('[name=description]').value,
    dueDate: `${this.querySelector('[name=due-date]').value}T00:00:00`,
    priority: this.querySelector('[name=priority]').value,
  })
  currentProject.addTodo(todo);
  this.reset();
  toggleTodoForm(e);
}