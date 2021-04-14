import { emit } from './observer.js'

const projects = [];

function add (project) {
  projects.push(project);
  emit('updateProjects', projects);
}

function remove (index) {
  projects.splice(index, 1);
  emit('updateProjects', projects);
}

function log () {
  console.table(projects);
}

export { add, remove, log }