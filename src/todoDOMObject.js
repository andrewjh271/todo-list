export { display, clear}

const form = document.querySelector('.view-todo');

function display(todo) {
  clear();

  const title = document.createElement('input');
  title.setAttribute('type', 'text');
  title.setAttribute('value', todo.title);

  const description = document.createElement('textarea');
  description.placeholder = 'Description...'
  description.value = todo.description;

  const dueDate = document.createElement('input');
  dueDate.setAttribute('type', 'date');
  dueDate.value = todo.dueDateString;

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
  priority.selectedIndex = ['low', 'medium', 'high'].findIndex(el => el === todo.priority);

  const isComplete = document.createElement('input');
  isComplete.setAttribute('type', 'checkbox');
  isComplete.checked = todo.isComplete;

  const exit = document.createElement('button');
  exit.textContent = 'Exit';

  const submit = document.createElement('input');
  submit.setAttribute('type', 'submit');
  submit.setAttribute('value', 'Submit');

  form.appendChild(title);
  form.appendChild(description);
  form.appendChild(dueDate);
  form.appendChild(priority);
  form.appendChild(isComplete);
  form.appendChild(exit);
  form.appendChild(submit);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    todo.update({
      title: title.value,
      description: description.value,
      dueDate: `${dueDate.value}T00:00:00`,
      priority: priority.value,
      isComplete: isComplete.checked
     });
    clear();
  })

  exit.addEventListener('click', clear);
}

function clear() {
  form.innerHTML = ''
}