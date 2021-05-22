import Project from './project';
import { add, currentProject } from './projectsManager';

const newProjectButton = document.querySelector('.add-project');
const editProjectButton = document.querySelector('.edit-project-button');

newProjectButton.addEventListener('click', display);
editProjectButton.addEventListener('click', editProject);

const form = document.querySelector('.project-form');
const cancel = form.querySelector('.cancel-project');

form.addEventListener('submit', addProject)
cancel.addEventListener('click', hide);

function display() {
  form.classList.remove('hidden');
}

function hide(e) {
  e.preventDefault();
  form.classList.add('hidden');
}

function addProject(e) {
  e.preventDefault();
  const project = new Project({
    title: this.querySelector('[name=title]').value,
    description: this.querySelector('[name=description]').value
  });
  add(project);
  this.reset();
  hide(e);
}

function editProject() {
  const editProject = document.querySelector('.edit-project-form')

  const header = document.createElement('h1');
  header.innerHTML = `Edit <i>${currentProject.title}</i>`;

  const title = document.createElement('input');
  title.setAttribute('type', 'text');
  title.value = currentProject.title;
  title.classList.add('form-line');
  
  const description = document.createElement('textarea');
  description.placeholder = 'Description...'
  description.value = currentProject.description;
  description.classList.add('form-line');

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('form-line');

  const exit = document.createElement('button');
  exit.textContent = 'Exit';

  const submit = document.createElement('input');
  submit.setAttribute('type', 'submit');
  submit.setAttribute('value', 'Submit');

  buttonContainer.appendChild(exit);
  buttonContainer.appendChild(submit);

  editProject.append(header);
  editProject.append(title);
  editProject.append(description);
  editProject.append(buttonContainer);

  editProject.classList.remove('hidden');

  editProject.addEventListener('submit', (e) => {
    e.preventDefault();
    currentProject.update({
      title: title.value,
      description: description.value
    });
    editProject.innerHTML = '';
    editProject.classList.add('hidden');
  })

  exit.addEventListener('click', () => {
    editProject.classList.add('hidden');
    editProject.innerHTML = '';
  })
}