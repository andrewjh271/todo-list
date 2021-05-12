import { format } from 'date-fns';

export default class Todo {
  constructor(params) {
    this.title = params.title;
    this.description = params.description;
    if (params.dueDate) this.dueDate = new Date(params.dueDate);
    this.priority = Number(params.priority);
    this.isComplete = false;
  }

  toggleComplete() {
    this.isComplete = !this.isComplete;
  }

  get dueDateFormatted() {
    return this.dueDate ? format(this.dueDate, 'M/d/yy') : '';
  }

  get dueDateSorted() {
    return this.dueDate ? this.dueDate : Infinity;
  }

  get priorityInWords() {
    switch(this.priority) {
      case 3:
        return 'low';
        break;
      case 2:
        return 'medium';
        break;
      default:
        return 'high'
    }
  }
}
