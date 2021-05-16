import { format } from 'date-fns';
import * as Observer from './observer';

export default class Todo {
  constructor(params) {
    this.title = params.title;
    this.description = params.description;
    if (params.dueDate) this.dueDate = new Date(params.dueDate);
    this.priority = params.priority;
    this.isComplete = params.isComplete;
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

  get sortedDueDate() {
    return this.dueDate ? this.dueDate : Infinity;
  }

  get sortedPriority() {
    switch(this.priority) {
      case 'low':
        return 3;
        break;
      case 'medium':
        return 2;
        break;
      default:
        return 1;
    }
  }
}
