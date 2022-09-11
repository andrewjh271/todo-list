const form = document.querySelector('.view-todo');

function clear() {
  form.classList.add('hidden');
  form.innerHTML = '';
}

export default function display(todo, tagline) {
  clear();

  const title = document.createElement('input');
  title.setAttribute('type', 'text');
  title.setAttribute('value', todo.title);
  title.required = true;
  title.classList.add('form-line');

  const description = document.createElement('textarea');
  description.placeholder = 'Description...';
  description.value = todo.description;
  description.classList.add('form-line');

  const dateContainer = document.createElement('div');
  const dateLabel = document.createElement('label');
  dateLabel.textContent = 'Deadline';
  const dueDate = document.createElement('input');
  dueDate.setAttribute('type', 'date');
  dueDate.value = todo.dueDateString;
  dateContainer.appendChild(dateLabel);
  dateContainer.appendChild(dueDate);

  const inputContainer = document.createElement('div');
  inputContainer.classList.add('form-line');

  const priorityContainer = document.createElement('div');
  const priorityLabel = document.createElement('label');
  priorityLabel.textContent = 'Priority';
  const priority = document.createElement('select');
  const option1 = document.createElement('option');
  option1.value = 'low';
  option1.text = 'low';
  const option2 = document.createElement('option');
  option2.value = 'medium';
  option2.text = 'medium';
  const option3 = document.createElement('option');
  option3.value = 'high';
  option3.text = 'high';
  priority.add(option1);
  priority.add(option2);
  priority.add(option3);
  priority.selectedIndex = ['low', 'medium', 'high'].findIndex(
    (el) => el === todo.priority
  );
  priorityContainer.appendChild(priorityLabel);
  priorityContainer.appendChild(priority);

  const isCompleteContainer = document.createElement('div');
  const isCompleteLabel = document.createElement('div');
  isCompleteLabel.textContent = 'Completed?';
  const isComplete = document.createElement('input');
  isComplete.setAttribute('type', 'checkbox');
  isComplete.checked = todo.isComplete;
  isCompleteContainer.appendChild(isCompleteLabel);
  isCompleteContainer.appendChild(isComplete);

  inputContainer.appendChild(dateContainer);
  inputContainer.appendChild(priorityContainer);

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('form-line');

  const exit = document.createElement('button');
  exit.textContent = 'Exit';
  exit.classList.add('text-button');

  const submit = document.createElement('input');
  submit.setAttribute('type', 'submit');
  submit.setAttribute('value', 'Submit');

  buttonContainer.appendChild(isCompleteContainer);
  buttonContainer.appendChild(exit);
  buttonContainer.appendChild(submit);

  if (tagline) {
    form.appendChild(tagline);
    form.classList.add('random-todo-mode');
  }

  form.appendChild(title);
  form.appendChild(description);
  form.appendChild(inputContainer);
  form.appendChild(buttonContainer);

  form.classList.remove('hidden');

  if (todo.description.includes('It\'s not much of a project without any Todos...')) {
    submit.setAttribute('disabled', '');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // add time to prevent time zone issues, only if value is provided
    const updatedDate = dueDate.value ? `${dueDate.value}T00:00:00` : undefined;
    todo.update({
      title: title.value,
      description: description.value,
      dueDate: updatedDate,
      priority: priority.value,
      isComplete: isComplete.checked,
    });
    clear();
  });

  exit.addEventListener('click', clear);
}
