import { emit } from './observer';
import Todo from './todo';

export default class Project {
  constructor(params) {
    this.title = params.title;
    this.description = params.description;
    this.todos = params.todos || [];
  }

  addTodo(todo) {
    this.todos.push(todo);
    emit('updateProject');
  }

  removeTodo(index) {
    this.todos.splice(index, 1);
    emit('updateProject');
  }

  update(params) {
    this.title = params.title;
    this.description = params.description;
    emit('updateProject');
  }

  sort(sortParam, direction) {
    this.todos.sort((a, b) => (
      a[sortParam] < b[sortParam] ? direction : -direction));
    emit('updateProject');
  }

  currentDirection(sortParam) {
    if (this.todos.length === 0) return 1;
    return (this.todos[0][sortParam] > this.todos[this.todos.length - 1][sortParam]) ? 1 : -1;
  }

  randomTodo() {
    if (this.todos.length === 0) {
      return new Todo({
        title: `Create a Todo for ${this.title}!`,
        description: 'It\'s not much of a project without any Todos...',
        dueDate: Date.now(),
        priority: 'high',
      });
    }
    const index = Math.floor(this.todos.length * Math.random());
    return this.todos[index];
  }
}
