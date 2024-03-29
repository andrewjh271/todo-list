import Project from './project';
import { add, getCurrentProject, deleteCurrentProject } from './projectsManager';

const newProjectButton = document.querySelector('.add-project');
const editProjectButton = document.querySelector('.edit-project-button');
const deleteProjectButton = document.querySelector('.delete-project-button');

newProjectButton.addEventListener('click', display);
editProjectButton.addEventListener('click', editProject);
deleteProjectButton.addEventListener('click', deleteProject);

const form = document.querySelector('.project-form');
const cancel = form.querySelector('.cancel-project');

form.addEventListener('submit', addProject);
cancel.addEventListener('click', hide);

function display() {
  form.classList.remove('hidden');
}

function hide(e) {
  e.preventDefault();
  form.classList.add('hidden');
  form.reset();
}

function addProject(e) {
  e.preventDefault();
  const project = new Project({
    title: this.querySelector('[name=title]').value,
    description: this.querySelector('[name=description]').value,
  });
  add(project);
  this.reset();
  hide(e);
}

function editProject() {
  const editProjectForm = document.querySelector('.edit-project-form');

  const header = document.createElement('h1');
  header.innerHTML = `Edit <i>${getCurrentProject().title}</i>`;

  const title = document.createElement('input');
  title.setAttribute('type', 'text');
  title.value = getCurrentProject().title;
  title.classList.add('form-line');

  const description = document.createElement('textarea');
  description.placeholder = 'Description...';
  description.value = getCurrentProject().description;
  description.classList.add('form-line');

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('form-line');

  const exit = document.createElement('button');
  exit.textContent = 'Cancel';
  exit.classList.add('text-button');

  const submit = document.createElement('input');
  submit.setAttribute('type', 'submit');
  submit.setAttribute('value', 'Submit');

  buttonContainer.appendChild(exit);
  buttonContainer.appendChild(submit);

  editProjectForm.append(header);
  editProjectForm.append(title);
  editProjectForm.append(description);
  editProjectForm.append(buttonContainer);

  editProjectForm.classList.remove('hidden');

  editProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    getCurrentProject().update({
      title: title.value,
      description: description.value,
    });
    editProjectForm.innerHTML = '';
    editProjectForm.classList.add('hidden');
  });

  exit.addEventListener('click', () => {
    editProjectForm.classList.add('hidden');
    editProjectForm.innerHTML = '';
  });
}

function deleteProject() {
  // eslint-disable-next-line no-restricted-globals
  const confirmation = confirm('Do you really want to delete this Project?');
  if (!confirmation) return;

  deleteCurrentProject();
}
