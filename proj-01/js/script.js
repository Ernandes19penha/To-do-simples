const form = document.getElementById('form');
const input = document.getElementById('input');
const list = document.getElementById('list');
const clearCompletedBtn = document.getElementById('clearCompleted');

const STORAGE_KEY = 'todo_simple_v1';

let tasks = loadTasks();
render();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ id: crypto.randomUUID(), text, done: false });
  input.value = '';
  saveTasks();
  render();
});

clearCompletedBtn.addEventListener('click', () => {
  tasks = tasks.filter(t => !t.done);
  saveTasks();
  render();
});

function render() {
  list.innerHTML = '';

  if (tasks.length === 0) {
    const li = document.createElement('li');
    li.className = 'item';
    li.textContent = 'Nenhuma tarefa. Adicione acima!';
    list.appendChild(li);
    return;
  }

  for (const task of tasks) {
    const li = document.createElement('li');
    li.className = 'item';

    li.innerHTML = `
      <div class="item-left">
        <label>
          <input type="checkbox" data-id="${task.id}" ${task.done ? 'checked' : ''} />
          <span style="text-decoration:${task.done ? 'line-through' : 'none'}">${escapeHtml(task.text)}</span>
        </label>
      </div>
      <div class="actions">
        <button class="danger" type="button" data-remove="${task.id}">Remover</button>
      </div>
    `;

    list.appendChild(li);
  }

  list.querySelectorAll('input[type=checkbox]').forEach(cb => {
    cb.addEventListener('change', () => {
      const id = cb.getAttribute('data-id');
      tasks = tasks.map(t => t.id === id ? { ...t, done: cb.checked } : t);
      saveTasks();
      render();
    });
  });

  list.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-remove');
      tasks = tasks.filter(t => t.id !== id);
      saveTasks();
      render();
    });
  });
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '<',
    '>': '>',
    '"': '"',
    "'": '&#39;'
  }[c]));
}

