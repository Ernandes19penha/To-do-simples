const frases = [
  'Programar é resolver problemas.',
  'HTML dá estrutura para a página.',
  'CSS deixa bonito e organizado.',
  'JavaScript torna a página interativa.',
  'Pratique todo dia para melhorar.',
  'A internet conecta o mundo.',
  'Pizza é uma boa ideia.',
  'Estudar código abre portas.',
  'Um bom projeto começa simples.',
  'Escola e aprendizado caminham juntos.'
];

const qEl = document.getElementById('q');
const btn = document.getElementById('btn');
const reset = document.getElementById('reset');
const stats = document.getElementById('stats');
const results = document.getElementById('results');

btn.addEventListener('click', buscar);
qEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') buscar();
});
reset.addEventListener('click', () => {
  qEl.value = '';
  render(frases);
});

render(frases);

function buscar() {
  const term = qEl.value.trim().toLowerCase();
  if (!term) {
    render(frases);
    return;
  }

  const filtradas = frases.filter(f => f.toLowerCase().includes(term));
  render(filtradas, term);
}

function render(list, term) {
  results.innerHTML = '';

  stats.textContent = term
    ? `Mostrando ${list.length} resultado(s) para “${term}”.`
    : `Total de frases: ${list.length}.`;

  for (const f of list) {
    const li = document.createElement('li');
    li.textContent = f;
    results.appendChild(li);
  }

  if (list.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'Nenhuma frase encontrada.';
    results.appendChild(li);
  }
}

