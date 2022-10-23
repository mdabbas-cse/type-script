import { v4 as uuidV4 } from 'uuid';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createAt: Date;
}

const list = document.querySelector('#list') as HTMLUListElement;
const form = document.getElementById('todo-form') as HTMLFormElement || null;
const input = document.getElementById('todo-input') as HTMLInputElement;

// tasks array
const tasks: Task[] = loadTasks();
tasks.forEach(addNewTodo);

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (input.value === '' && input.value === null) return
  const todo: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createAt: new Date(),
  }
  addNewTodo(todo);
  tasks.push(todo);
  saveTasks()
  input.value = '';
  input.focus();

})

function addNewTodo(task: Task): boolean {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.setAttribute('data-id', task.id);
  checkbox.addEventListener('change', (event) => {
    const target = event.target as HTMLInputElement;
    const id = target.dataset.id;
    const todo = tasks.find((task) => task.id === id);
    if (todo) {
      todo.completed = target.checked;
    }
  });
  checkbox.type = 'checkbox';
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
  return true
}

function loadTasks(): Task[] {
  console.log('loadTasks')
  const taskJson = localStorage.getItem('Tasks')
  console.log(taskJson)
  if (taskJson === null) return []
  return JSON.parse(taskJson)
}

function saveTasks() {
  localStorage.setItem('Tasks', JSON.stringify(tasks));
}

