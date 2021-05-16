import * as Observer from './observer.js'

let projects = [];
let currentProject;

Observer.on('assignCurrentProject', assignCurrentProject);
Observer.on('updateProject', update);

function assignCurrentProject(index) {
  currentProject = projects[index];
}

function add (project) {
  projects.push(project);
  Observer.emit('updateProjects', projects);
}

function remove (index) {
  projects.splice(index, 1);
  Observer.emit('updateProjects', projects);
}

function load (data) {
  projects = data;
  Observer.emit('updateProjects', projects);
}

function update() {
  Observer.emit('updateProjects', projects);
}

export { add, remove, load, currentProject }