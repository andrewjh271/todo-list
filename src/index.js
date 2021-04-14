import Project from './project';
import Todo from './todo';
import { add } from 'date-fns';
import * as Observer from './observer';
import * as DOM from './DOMcontroller';
import * as ProjectsManager from './projectsManager';

Observer.on('updateProjects', DOM.log);
Observer.on('updateProjects', ProjectsManager.log);

const defaultProject = (() => {
  const project = new Project('Welcome');

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
    priority: 'medium',
  });

  const c = new Todo({
    title: 'Positive presence',
    description: 'Remember that the real Todo is the journey',
    dueDate: add(Date.now(), { days: 3 }),
    priority: 'medium',
  });

  [a, b, c].forEach((todo) => project.addTodo(todo));
  ProjectsManager.add(project);
})();