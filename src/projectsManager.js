import * as Observer from './observer.js'

const projects = [];
let currentProject;

Observer.on('assignCurrentProject', assignCurrentProject);

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

// function get (index) {
//   return projects[index];
// }

export { add, remove, currentProject }