const addTask = document.getElementById('texto-tarefa');
const list = document.getElementById('lista-tarefas');

// Botões
const btn = document.getElementById('criar-tarefa');
const clearBtn = document.getElementById('apaga-tudo');
const clearCompletedBtn = document.getElementById('remover-finalizados');
const saveBtn = document.getElementById('salvar-tarefas');
const clearSelectedBtn = document.getElementById('remover-selecionado');

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
  task.classList.add();
  list.appendChild(task);
  tasker();
  checker();
}

btn.addEventListener('click', () => {
  insert();
  // saveTask.push({task: addTask.value});
  addTask.value = '';
});

function completedOrNot(r) {
  if (r.target.classList.contains('completed')) {
    r.target.classList.remove('completed', 'selected');
  } else {
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

function save() {
  const saveTask = [];
  for (let index = 0; index < listItens.length; index += 1) {
    saveTask.push({
      status: listItens[index].className,
      task: listItens[index].innerText,
    });
  } localStorage.setItem('saveList', JSON.stringify(saveTask));
}

saveBtn.addEventListener('click', save);

function clear() {
  document.querySelector('ol').innerHTML = '';
}

clearBtn.addEventListener('click', clear);

// Referencia: forEach: https://www.w3schools.com/jsref/jsref_foreach.asp
function clearCompleted() {
  const listComplet = document.querySelectorAll('.completed');
  listComplet.forEach((element) => {
    list.removeChild(element);
  });
}

clearCompletedBtn.addEventListener('click', clearCompleted);

function load() {
  const loadItens = JSON.parse(localStorage.getItem('saveList'));
  if (localStorage.saveList) {
    for (let index = 0; index < loadItens.length; index += 1) {
      const task = document.createElement('li');
      task.innerText = loadItens[index].task;
      task.className = loadItens[index].status;
      list.appendChild(task);
    }
  }
}
window.addEventListener('load', load);

function clearSelected() {
  const select = document.querySelector('.selected');
  list.removeChild(select);
}
clearSelectedBtn.addEventListener('click', clearSelected);
