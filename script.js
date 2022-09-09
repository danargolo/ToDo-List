const addTask = document.getElementById('texto-tarefa');
const list = document.getElementById('lista-tarefas');

const btn = document.createElement('button');
btn.setAttribute('type', 'button');
btn.id = 'criar-tarefa';
btn.innerText = 'Criar tarefa';
document.body.appendChild(btn);

const clearBtn = document.createElement('button');
clearBtn.setAttribute('type', 'button');
clearBtn.id = 'apaga-tudo';
clearBtn.innerText = 'Apagar';
document.body.appendChild(clearBtn);

const clearCompletedBtn = document.createElement('button');
clearCompletedBtn.setAttribute('type', 'button');
clearCompletedBtn.id = 'remover-finalizados';
clearCompletedBtn.innerText = 'Finalizados';
document.body.appendChild(clearCompletedBtn);

const saveBtn = document.createElement('button');
saveBtn.setAttribute('type', 'button');
saveBtn.id = 'salvar-tarefas';
saveBtn.innerText = 'Salvar tarefas';
document.body.appendChild(saveBtn);

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
}

btn.addEventListener('click', () => {
  insert();
  // saveTask.push({task: addTask.value});
  addTask.value = '';
})


function completedOrNot(r) {
  if (r.target.classList.contains('completed')) {
    r.target.classList.remove('completed', 'selected');
    // r.target.classList.remove('selected');
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
    })}
  localStorage.setItem('saveList', JSON.stringify(saveTask));
};

saveBtn.addEventListener('click', save)

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


const loadItens = JSON.parse(localStorage.getItem('saveList'));
function load() {
  const task = document.createElement('li');
  if (localStorage.saveList) {
    for(let index = 0; index < loadItens.length; index += 1) {
      task.innerText = loadItens[index].task;
      task.className = loadItens[index].status;
    }
  }
  list.appendChild(task);
}
// load();
  
const clearSelectedBtn = document.createElement('button');
clearSelectedBtn.setAttribute('type', 'button');
clearSelectedBtn.id = 'remover-selecionado';
clearSelectedBtn.innerText = 'Remover Selecionado';
document.body.appendChild(clearSelectedBtn);

function clearSelected() {
  const select = document.querySelector('.selected');
  list.removeChild(select);
}
clearSelectedBtn.addEventListener('click', clearSelected);


