const heightEl = document.getElementById('height');
const weightEl = document.getElementById('weight');
const calcBtn = document.getElementById('calc');
const clearBtn = document.getElementById('clear');

const imcEl = document.getElementById('imc');
const descEl = document.getElementById('desc');

const ranges = [
  { max: 18.5, label: 'Abaixo do peso', color: '#ffb74a' },
  { max: 24.9, label: 'Peso normal', color: '#6dffb6' },
  { max: 29.9, label: 'Acima do peso', color: '#ff9a60' },
  { max: 34.9, label: 'Obesidade I', color: '#ff7a90' },
  { max: 39.9, label: 'Obesidade II', color: '#ff4f6f' },
  { max: Infinity, label: 'Obesidade III', color: '#ff2e5a' }
];

calcBtn.addEventListener('click', () => {
  const h = Number(heightEl.value);
  const w = Number(weightEl.value);

  if (!Number.isFinite(h) || !Number.isFinite(w) || h <= 0 || w <= 0) {
    show('—', 'Preencha altura e peso válidos.');
    return;
  }

  const imc = w / (h * h);
  const imcRounded = Math.round(imc * 10) / 10;

  const r = ranges.find(x => imc <= x.max);
  show(imcRounded, r ? r.label : '—', r?.color);
});

clearBtn.addEventListener('click', () => {
  heightEl.value = '';
  weightEl.value = '';
  show('—', 'Preencha os campos e clique em “Calcular”.');
});

function show(imc, text, color) {
  imcEl.textContent = imc === '—' ? '—' : String(imc).replace('.', ',');
  descEl.textContent = text;
  imcEl.style.color = color ?? '';
}

