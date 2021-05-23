import * as Observer from './observer';
import Todo from './todo';

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

  randomTodo() {
    if (this.todos.length === 0) {
      return new Todo({
        title: 'Create a Todo for this Project!',
        description: `${this.title} isn't much of a project without any Todos...`,
        dueDate: Date.now(),
        priority: 'high'
      })
    }
    const index = Math.floor(this.todos.length * Math.random());
    return this.todos[index];
  }
}
