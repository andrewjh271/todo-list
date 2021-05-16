import { on } from './observer';

on('updateProjects', update);

function update(projects) {
  localStorage.setItem('projects', JSON.stringify(projects));
}