const form = document.getElementById('form');
const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const passwordEl = document.getElementById('password');
const termsEl = document.getElementById('terms');
const resultEl = document.getElementById('result');

function setError(key, message) {
  const el = document.querySelector(`[data-error="${key}"]`);
  if (!el) return;
  el.textContent = message || '';
}

function clearErrors() {
  ['name','email','password','terms'].forEach(k => setError(k, ''));
  resultEl.textContent = '';
  resultEl.className = 'result';
}

function validate() {
  let ok = true;
  clearErrors();

  const name = nameEl.value.trim();
  if (name.length < 2) {
    ok = false;
    setError('name', 'Informe pelo menos 2 caracteres.');
  }

  const email = emailEl.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    ok = false;
    setError('email', 'E-mail inválido.');
  }

  const password = passwordEl.value;
  if (password.length < 6) {
    ok = false;
    setError('password', 'A senha precisa ter no mínimo 6 caracteres.');
  }

  if (!termsEl.checked) {
    ok = false;
    setError('terms', 'Você precisa aceitar os termos.');
  }

  return ok;
}

nameEl.addEventListener('input', validateOnType);
emailEl.addEventListener('input', validateOnType);
passwordEl.addEventListener('input', validateOnType);
termsEl.addEventListener('change', validateOnType);

function validateOnType() {
  // valida parcial: evita mensagens só no submit
  // aqui mantemos simples: valida tudo e mostra erros
  validate();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const ok = validate();
  if (!ok) {
    resultEl.textContent = 'Corrija os campos destacados.';
    resultEl.classList.add('bad');
    resultEl.classList.remove('ok');
    return;
  }

  resultEl.textContent = 'Formulário enviado com sucesso (demo)!';
  resultEl.classList.add('ok');
  resultEl.classList.remove('bad');

  form.reset();
  clearErrors();
});

