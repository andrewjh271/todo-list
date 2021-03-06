import { format } from 'date-fns';
import * as Observer from './observer';

export default class Todo {
  constructor(params) {
    this.title = params.title;
    this.description = params.description;
    if (params.dueDate) this.dueDate = new Date(params.dueDate);
    this.priority = params.priority;
    this.isComplete = params.isComplete || false;
  }

  toggleComplete() {
    this.isComplete = !this.isComplete;
    Observer.emit('updateProject');
  }

  update(params) {
    this.title = params.title;
    this.description = params.description;
    if (params.dueDate) this.dueDate = new Date(params.dueDate);
    this.priority = params.priority;
    this.isComplete = params.isComplete;
    Observer.emit('updateProject');
  }

  get dueDateFormatted() {
    return this.dueDate ? format(this.dueDate, 'M/d/yy') : '';
  }

  get dueDateString() {
    return this.dueDate ? format(this.dueDate, 'yyyy-MM-dd') : '';
  }

  get sortedTitle() {
    return this.title.toLowerCase();
  }

  get sortedDueDate() {
    return this.dueDate ? this.dueDate : Infinity;
  }

  get sortedPriority() {
    switch (this.priority) {
      case 'low':
        return 3;
      case 'medium':
        return 2;
      default:
        return 1;
    }
  }
}
