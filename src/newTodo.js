import Todo from './todo';
import { getCurrentProject } from './projectsManager';

const newTodoButton = document.querySelector('.new-todo');
const todoForm = document.querySelector('.new-todo-form');
const formTitle = todoForm.querySelector('h1');
const cancelTodo = document.querySelector('.cancel-todo');

newTodoButton.addEventListener('click', toggleTodoForm);
todoForm.addEventListener('submit', addTodo);
cancelTodo.addEventListener('click', function cancel(e) {
  this.closest('form').reset();
  toggleTodoForm(e);
});

function toggleTodoForm(e) {
  e.preventDefault();
  formTitle.innerHTML = `New Todo for <i>${getCurrentProject().title}</i>`;
  todoForm.classList.toggle('hidden');
}

function addTodo(e) {
  e.preventDefault();

  const todo = new Todo({
    title: this.querySelector('[name=title]').value,
    description: this.querySelector('[name=description]').value,
    dueDate: `${this.querySelector('[name=due-date]').value}T00:00:00`,
    priority: this.querySelector('[name=priority]').value,
  });
  getCurrentProject().addTodo(todo);
  this.reset();
  toggleTodoForm(e);
}
