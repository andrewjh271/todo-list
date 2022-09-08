import { format, isValid } from 'date-fns';
import * as Observer from './observer';

export default class Todo {
  constructor(params) {
    this.title = params.title;
    this.description = params.description;
    this.priority = params.priority;
    this.isComplete = params.isComplete || false;
    this.dueDate = params.dueDate ? new Date(params.dueDate) : undefined;
    // new Date(null) = Wed Dec 31 1969, so need to assign undefined value when loading
  }

  toggleComplete() {
    this.isComplete = !this.isComplete;
    Observer.emit('updateProject');
  }

  update(params) {
    this.title = params.title;
    this.description = params.description;
    this.priority = params.priority;
    this.isComplete = params.isComplete;
    this.dueDate = new Date(params.dueDate);

    Observer.emit('updateProject');
  }

  get dueDateFormatted() {
    return isValid(this.dueDate) ? format(this.dueDate, 'M/d/yy') : '';
  }

  get dueDateString() {
    return isValid(this.dueDate) ? format(this.dueDate, 'yyyy-MM-dd') : '';
  }

  get sortedTitle() {
    return this.title.toLowerCase();
  }

  get sortedDueDate() {
    return isValid(this.dueDate) ? this.dueDate : Infinity;
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
