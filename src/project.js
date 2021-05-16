import * as Observer from './observer';

export default class Project {
  constructor(params) {
    this.title = params.title;
    this.description = params.description;
    this.todos = params.todos ? params.todos : [];
  }

  addTodo(todo) {
    this.todos.push(todo);
    Observer.emit('updateProject');
  }

  removeTodo(index) {
    this.todos.splice(index, 1);
    Observer.emit('updateProject');
  }

  update(params) {
    this.title = params.title;
    this.description = params.description;
    Observer.emit('updateProject');
  }
}
