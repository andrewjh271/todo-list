import Project from './project';
import Todo from './todo';
import './DOMcontroller';
import './localStorage';
import * as ProjectsManager from './projectsManager';
import * as Observer from './observer.js'
import { add } from 'date-fns';

const storedProjects = localStorage.getItem('projects');
if (storedProjects) {
  const projects = JSON.parse(storedProjects).map((project) => {
    project.todos = project.todos.map((todo) => new Todo(todo));
    return new Project(project);
  });
  ProjectsManager.load(projects);
} else {
  ProjectsManager.add(defaultProject());
}

function defaultProject() {
  const project = new Project({ title: 'Welcome', description: 'Enjoy your todos!'});

  const a = new Todo({
    title: 'Positive thinking',
    description: 'Consider all the great things you\'ll accomplish with this Todo App',
    dueDate: add(Date.now(), { days: 1 }),
    priority: 'medium',
  });

  const b = new Todo({
    title: 'Positive action',
    description: 'Enjoy the feeling of accomplishment as you check off this Todo',
    dueDate: add(Date.now(), { days: 2 }),
    priority: 'high',
  });

  const c = new Todo({
    title: 'Positive presence',
    description: 'Remember that the real Todo is the journey',
    dueDate: add(Date.now(), { days: 3 }),
    priority: 'low',
  });

  [a, b, c].forEach((todo) => project.addTodo(todo));
  return project;
}

const index = localStorage.getItem('currentProjectIndex') || 0;
Observer.emit('assignCurrentProject', index);
Observer.emit('updateProject');