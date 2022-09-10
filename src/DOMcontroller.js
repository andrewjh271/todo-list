/* eslint-disable indent */
import * as Observer from './observer';
import showTodo from './showTodo';
import { currentProject, randomProject } from './projectsManager';
import './projectForm';
import './newTodo';

const projects = document.querySelector('.projects');
const projectList = document.querySelector('.project-list');

const toggleProjects = document.querySelector('.toggle-projects');
const toggleIcons = toggleProjects.querySelectorAll('.material-icons');

const project = document.querySelector('.project');
const projectTitle = project.querySelector('.project-title');
const projectDescription = project.querySelector('.project-description');

const todoTable = project.querySelector('.todo-table');
const todos = todoTable.querySelector('.todo-items');
const headings = todoTable.querySelectorAll('th');

const randomTodo = document.querySelector('.random-todo');

projects.addEventListener('click', assignCurrentProject);
toggleProjects.addEventListener('click', toggleSidebar);
headings.forEach((heading) => heading.addEventListener('click', sortDisplay));

todos.addEventListener('click', toggleProgress);
todos.addEventListener('click', viewTodo);
todos.addEventListener('click', deleteTodo);

randomTodo.addEventListener('click', showRandomTodo);

Observer.on('updateProjects', updateProjects);
Observer.on('updateProject', showProject);

function toggleSidebar() {
  projects.classList.toggle('active');
  toggleIcons.forEach((icon) => icon.classList.toggle('hidden'));
}

function updateProjects(currentProjects) {
  projectList.innerHTML = currentProjects
    .map((projectItem, i) => {
        if (projectItem === currentProject) {
          return `<li class='current-project' data-index='${i}'>${projectItem.title}</li>`;
        }
        return `<li data-index='${i}'>${projectItem.title}</li>`;
      })
    .join('');
}

function assignCurrentProject(e) {
  if (e.target.tagName === 'LI') {
    const { index } = e.target.dataset;
    Observer.emit('assignCurrentProject', index);
  } else if (e.target.tagName === 'ASIDE') {
    // hide project if clicked outside of an element in sidebar
    Observer.emit('assignCurrentProject');
  }
}

function showProject() {
  if (!currentProject) {
    project.classList.add('hidden-project');
    return;
  }
  project.classList.remove('hidden-project');
  projectTitle.textContent = currentProject.title;
  projectDescription.textContent = currentProject.description;

  todos.innerHTML = currentProject.todos
    .map(
      (todo, i) => `
      <tr class='${todo.isComplete ? 'complete' : todo.priority}'>
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
      <td><button class='view' data-index='${i}'><span class="material-icons">zoom_in</span></button></td>
      <td><button class='delete' data-index='${i}'><span class="material-icons">delete_forever</span></button></td>
      </tr>`
      )
    .join('');
}

let sortParam;
let direction = -1;
function sortDisplay(e) {
  if (sortParam === e.target.dataset.name) {
    direction = -direction;
  } else {
    sortParam = e.target.dataset.name;
    direction = -1;
  }
  currentProject.sort(sortParam, direction);
}

function toggleProgress(e) {
  if (!e.target.matches('.progress')) return;

  const { index } = e.target.dataset;
  currentProject.todos[index].toggleComplete();
}

function viewTodo(e) {
  if (!e.target.matches('.view')) return;

  const { index } = e.target.dataset;
  showTodo(currentProject.todos[index]);
}

function deleteTodo(e) {
  if (!e.target.matches('.delete')) return;

  // eslint-disable-next-line no-restricted-globals
  const confirmation = confirm('Do you really want to delete this Todo?');
  if (!confirmation) return;

  const { index } = e.target.dataset;
  currentProject.removeTodo(index);
}

function showRandomTodo() {
  const tagline = document.createElement('h1');
  tagline.innerHTML = `
    <span class="material-icons">bolt</span>
    <span class="material-icons">bolt</span>
    <span class="material-icons">bolt</span>
    <i>Random Todo Mode!</i>
    <span class="material-icons">bolt</span>
    <span class="material-icons">bolt</span>
    <span class="material-icons">bolt</span>
  `;
  showTodo(randomProject().randomTodo(), tagline);
}
