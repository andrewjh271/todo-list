/* eslint-disable import/no-mutable-exports */
import * as Observer from './observer';

let projects = [];
let currentProject;

Observer.on('assignCurrentProject', assignCurrentProject);
Observer.on('updateProject', update);

function assignCurrentProject(index) {
  currentProject = projects[index];
}

function add(project) {
  projects.push(project);
  Observer.emit('updateProjects', projects);
}

function remove(index) {
  projects.splice(index, 1);
  Observer.emit('updateProjects', projects);
}

function load(data) {
  projects = data;
  Observer.emit('updateProjects', projects);
}

function update() {
  Observer.emit('updateProjects', projects);
}

function randomProject() {
  const index = Math.floor(projects.length * Math.random());
  return projects[index];
}

function deleteCurrentProject() {
  for (let i = 0; i < projects.length; i++) {
    if (projects[i] === currentProject) {
      projects.splice(i, 1);
      currentProject = null;
      Observer.emit('updateProjects', projects);
      Observer.emit('updateProject');
      return;
    }
  }
}

export {
  add, remove, load, randomProject, deleteCurrentProject, currentProject
};
