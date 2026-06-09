const categoryEl = document.getElementById('category');
const searchEl = document.getElementById('search');
const sortEl = document.getElementById('sort');
const resetBtn = document.getElementById('reset');
const gridEl = document.getElementById('grid');

const products = [
  { id: 1, name: 'Fone Bluetooth', category: 'eletronicos', price: 129.9 },
  { id: 2, name: 'Teclado Mecânico', category: 'eletronicos', price: 299.0 },
  { id: 3, name: 'Luminária de Mesa', category: 'casa', price: 59.5 },
  { id: 4, name: 'Cafeteira Elétrica', category: 'casa', price: 199.9 },
  { id: 5, name: 'Camiseta Estampada', category: 'moda', price: 39.9 },
  { id: 6, name: 'Tênis Conforto', category: 'moda', price: 149.0 },
  { id: 7, name: 'Carregador Rápido', category: 'eletronicos', price: 49.9 },
  { id: 8, name: 'Organizador de Gavetas', category: 'casa', price: 34.9 }
];

const categoryLabel = {
  eletronicos: 'Eletrônicos',
  casa: 'Casa',
  moda: 'Moda'
};

categoryEl.addEventListener('change', render);
searchEl.addEventListener('input', render);
sortEl.addEventListener('change', render);
resetBtn.addEventListener('click', () => {
  categoryEl.value = 'all';
  searchEl.value = '';
  sortEl.value = 'relevancia';
  render();
});

render();

function getFiltered() {
  const cat = categoryEl.value;
  const term = searchEl.value.trim().toLowerCase();

  let list = products.slice();

  if (cat !== 'all') {
    list = list.filter(p => p.category === cat);
  }

  if (term) {
    list = list.filter(p => p.name.toLowerCase().includes(term));
  }

  const sort = sortEl.value;
  if (sort === 'price_asc') list.sort((a,b) => a.price - b.price);
  if (sort === 'price_desc') list.sort((a,b) => b.price - a.price);

  return list;
}

function render() {
  const list = getFiltered();
  gridEl.innerHTML = '';

  if (list.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'product';
    empty.textContent = 'Nenhum produto encontrado.';
    gridEl.appendChild(empty);
    return;
  }

  for (const p of list) {
    const card = document.createElement('article');
    card.className = 'product';
    card.innerHTML = `
      <span class="badge">${categoryLabel[p.category] ?? p.category}</span>
      <h3>${escapeHtml(p.name)}</h3>
      <div class="meta">Preço</div>
      <div class="price">R$ ${p.price.toFixed(2).replace('.', ',')}</div>
      <button type="button" data-add="${p.id}">Adicionar ao carrinho (demo)</button>
    `;

    card.querySelector('[data-add]').addEventListener('click', () => {
      alert(`Demo: adicionado (produto #${p.id})`);
    });

    gridEl.appendChild(card);
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

