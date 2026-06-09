const valueEl = document.getElementById('value');
const historyEl = document.getElementById('history');

const minusBtn = document.getElementById('minus');
const plusBtn = document.getElementById('plus');
const resetBtn = document.getElementById('reset');

const STORAGE_KEY = 'counter_history_v1';

let state = load();
render();

minusBtn.addEventListener('click', () => change(-1));
plusBtn.addEventListener('click', () => change(1));
resetBtn.addEventListener('click', () => {
  state = { current: 0, history: [] };
  save(state);
  render();
});

function change(delta) {
  state.current += delta;

  const action = delta > 0 ? 'Somou' : 'Subtraiu';
  state.history.unshift({
    id: crypto.randomUUID(),
    text: `${action} ${Math.abs(delta)} → agora ${state.current}`,
    at: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  });

  // limitar histórico para ficar leve
  state.history = state.history.slice(0, 20);

  save(state);
  render();
}

function render() {
  valueEl.textContent = state.current;

  historyEl.innerHTML = '';
  if (state.history.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'Sem histórico ainda.';
    historyEl.appendChild(li);
    return;
  }

  for (const h of state.history) {
    const li = document.createElement('li');
    li.textContent = `${h.at}: ${h.text}`;
    historyEl.appendChild(li);
  }
}

function save(s) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { current: 0, history: [] };
  } catch {
    return { current: 0, history: [] };
  }
}

