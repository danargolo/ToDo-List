const addTask = document.getElementById('texto-tarefa');
const list = document.getElementById('lista-tarefas');

const button = document.createElement('button');
button.setAttribute('type', 'button');
button.id = 'criar-tarefa';
document.body.appendChild(button);

button.addEventListener('click', () => {
  const task = document.createElement('li');
  list.appendChild(task);
  task.innerText = addTask.value;
  addTask.value = '';
});
