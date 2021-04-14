import { format } from 'date-fns';

export default class Todo {
  constructor(params) {
    this.title = params.title;
    this.description = params.description;
    if (params.dueDate) this.dueDate = new Date(params.dueDate);
    this.priority = params.priority;
    this.isComplete = false;
  }

  toggleComplete() {
    this.isComplete = !this.isComplete;
  }

  get dueDateFormatted() {
    return format(this.dueDate, 'M/d/yy');
  }
}
