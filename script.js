const addTask = document.getElementById('texto-tarefa');
const list = document.getElementById('lista-tarefas');

// Botões
const btn = document.getElementById('criar-tarefa');
const clearBtn = document.getElementById('apaga-tudo');
const clearCompletedBtn = document.getElementById('remover-finalizados');
const saveBtn = document.getElementById('salvar-tarefas');
const clearSelectedBtn = document.getElementById('remover-selecionado');
const upBtn = document.getElementById('mover-cima');
const dwBtn = document.getElementById('mover-baixo');

const listItens = document.getElementsByTagName('li');

function selector(a) {
  for (let index = 0; index < listItens.length; index += 1) {
    listItens[index].classList.remove('selected');
    a.target.classList.add('selected');
  }
}

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

function insert() {
  const task = document.createElement('li');
  task.innerText = addTask.value;
  list.appendChild(task);
  tasker();
  checker();
}

btn.addEventListener('click', () => {
  insert();
  addTask.value = '';
});

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
  tasker();
  checker();
}
window.addEventListener('load', load);

function clearSelected() {
  const select = document.querySelector('.selected');
  list.removeChild(select);
}
clearSelectedBtn.addEventListener('click', clearSelected);

// Ref. https://stackoverflow.com/questions/4793604/how-to-insert-an-element-after-another-element-in-javascript-without-using-a-lib
function up() {
  const select = document.querySelector('.selected');
  for (let index = 0; index < listItens.length; index += 1) {
    if (select === listItens[0]) {
      return;
    }
    if (select === listItens[index]) {
      const previous = listItens[index].previousElementSibling;
      select.parentNode.insertBefore(select, previous);
    }
  }
}

upBtn.addEventListener('click', (up));

function down() {
  const select = document.querySelector('.selected');
  for (let index = listItens.length; index >= 0; index -= 1) {
    if (select === listItens[listItens.length - 1]) {
      return;
    }
    if (select === listItens[index]) {
      const next = listItens[index].nextElementSibling;
      select.parentNode.insertBefore(next, select);
    }
  }
}

dwBtn.addEventListener('click', (down));
