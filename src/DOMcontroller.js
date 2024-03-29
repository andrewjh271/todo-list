/* eslint-disable indent */
import * as Observer from './observer';
import showTodo from './showTodo';
import { getCurrentProject, randomProject } from './projectsManager';
import './projectForm';
import './newTodo';

const projects = document.querySelector('.projects');
const projectList = document.querySelector('.project-list');

const toggleProjects = document.querySelector('.hamburger');

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
Observer.on('updateProject', () => {
  // prevent animated opacity when displaying changes to current project
  project.classList.add('project-no-animation');
  showProject();
});
// reenable animated opacity only if  project has actually changed
Observer.on('projectChange', () => project.classList.remove('project-no-animation'));

function toggleSidebar() {
  projects.classList.toggle('active');
  toggleProjects.classList.toggle('is-active');
}

function updateProjects(currentProjects) {
  projectList.innerHTML = currentProjects
    .map((projectItem, i) => {
      if (projectItem === getCurrentProject()) {
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
  project.classList.add('hidden-project');
  if (!getCurrentProject()) {
    return;
  }
  setTimeout(() => {
    projectTitle.textContent = getCurrentProject().title;
    projectDescription.textContent = getCurrentProject().description;

    todos.innerHTML = getCurrentProject().todos
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
    project.classList.remove('hidden-project');
  }, 200);
}

function sortDisplay(e) {
  const sortParam = e.target.dataset.name;
  getCurrentProject().sort(sortParam);
}

function toggleProgress(e) {
  if (!e.target.matches('.progress')) return;

  const { index } = e.target.dataset;
  getCurrentProject().todos[index].toggleComplete();
}

function viewTodo(e) {
  if (!e.target.matches('.view')) return;

  const { index } = e.target.dataset;
  showTodo(getCurrentProject().todos[index]);
}

function deleteTodo(e) {
  if (!e.target.matches('.delete')) return;

  // eslint-disable-next-line no-restricted-globals
  const confirmation = confirm('Do you really want to delete this Todo?');
  if (!confirmation) return;

  const { index } = e.target.dataset;
  getCurrentProject().removeTodo(index);
}

function showRandomTodo() {
  const tagline = document.createElement('h1');
  tagline.innerHTML = `
    <span class="material-icons">bolt</span>
    <span class="material-icons">bolt</span>
    <span class="material-icons">bolt</span>
    <i>Random Todo!</i>
    <span class="material-icons">bolt</span>
    <span class="material-icons">bolt</span>
    <span class="material-icons">bolt</span>
  `;
  showTodo(randomProject().randomTodo(), tagline);
}

export default function pageLoad() {
  setTimeout(() => {
    const header = document.querySelector('header');
    project.classList.remove('page-load-transition');
    projects.classList.remove('page-load-transition');
    header.classList.remove('page-load-transition');
  }, 2000);

  if (!getCurrentProject()) {
    // avoids disappear animation causing flash of hidden project
    project.classList.add('page-load-hidden');
    setTimeout(() => {
      project.classList.remove('page-load-hidden');
    }, 3000);
  }
}
