const addTask = document.getElementById('texto-tarefa');
const list = document.getElementById('lista-tarefas');

const button = document.createElement('button');
button.setAttribute('type', 'button');
button.id = 'criar-tarefa';
document.body.appendChild(button);

const listItens = document.getElementsByTagName('li');

function selector(a) {
  for (let index = 0; index < listItens.length; index += 1) {
    listItens[index].classList.remove('selected');
    a.target.classList.add('selected');
  }
}


function insert() {
  const task = document.createElement('li');
  task.innerText = addTask.value;
  task.classList.add('normal');
  list.appendChild(task);
  tasker();
  checker();
  // remComplete();
}

button.addEventListener('click', () => {
  insert();
  addTask.value = '';
});

function completedOrNot(r) {
  if (r.target.classList.contains("completed")) {
    r.target.classList.remove('completed');
    r.target.classList.remove('selected');
  } 
  else {
    r.target.classList.add('completed');
    r.target.classList.remove('selected');
  }
}

function tasker() {
  for (let index = 0; index < listItens.length; index += 1) {
    listItens[index].addEventListener('click', selector);
  }
}

function checker() {
  for (let index = 0; index < listItens.length; index += 1) {
    listItens[index].addEventListener('dblclick', completedOrNot);
  }
}
