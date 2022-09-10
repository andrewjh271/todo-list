import Project from './project';
import Todo from './todo';
import './DOMcontroller';
import './localStorage';
import * as ProjectsManager from './projectsManager';
import * as Observer from './observer';
import defaultProject from './defaultProject';

const storedProjects = localStorage.getItem('projects');
if (storedProjects) {
  const projects = JSON.parse(storedProjects).map((project) => {
    // eslint-disable-next-line no-param-reassign
    project.todos = project.todos.map((todo) => new Todo(todo));
    return new Project(project);
  });
  ProjectsManager.load(projects);
} else {
  ProjectsManager.add(defaultProject());
}

const index = localStorage.getItem('currentProjectIndex') || 0;
Observer.emit('assignCurrentProject', index);
Observer.emit('updateProject');
