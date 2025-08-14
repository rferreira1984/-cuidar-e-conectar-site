// Navegação mobile
const navToggle = document.querySelector('.nav__toggle');
const navList = document.querySelector('.nav__list');
if (navToggle && navList){
  navToggle.addEventListener('click', () => {
    const open = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Ano automático no rodapé
const yearEl = document.getElementById('year');
if (yearEl){ yearEl.textContent = new Date().getFullYear(); }

// Aviso de cookies (consentimento simples)
const cookieEl = document.querySelector('.cookie');
const cookieBtn = document.getElementById('cookie-accept');
const cookieKey = 'cc_cookie_consent_v1';
if (cookieEl && cookieBtn){
  const hasConsent = localStorage.getItem(cookieKey) === 'yes';
  if (!hasConsent){ cookieEl.hidden = false; }
  cookieBtn.addEventListener('click', () => {
    localStorage.setItem(cookieKey, 'yes');
    cookieEl.hidden = true;
  });
}

// Validação simplificada de formulários
function handleForm(formId){
  const form = document.getElementById(formId);
  if(!form) return;
  const msg = form.querySelector('.form__msg');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()){
      msg.textContent = 'Por favor, preencha os campos obrigatórios corretamente.';
      msg.style.color = '#b91c1c';
      return;
    }
    // Aqui, em produção, faria fetch para o backend (Python) ou serviço de e-mail
    // Exemplo:
    // fetch('/api/contato', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(Object.fromEntries(new FormData(form))) })
    //   .then(r => r.ok ? r.json() : Promise.reject(r))
    //   .then(() => { msg.textContent = 'Enviado com sucesso!'; msg.style.color = '#16a34a'; form.reset(); })
    //   .catch(() => { msg.textContent = 'Erro ao enviar. Tente novamente.'; msg.style.color = '#b91c1c'; });

    // Simulação de sucesso enquanto não há backend:
    setTimeout(() => {
      msg.textContent = 'Enviado com sucesso! Em breve entraremos em contato.';
      msg.style.color = '#16a34a';
      form.reset();
    }, 600);
  });
}
handleForm('form-contato');
handleForm('form-cuidadores');

// Acessibilidade: fechar menu ao clicar fora (mobile)
document.addEventListener('click', (e) => {
  if (!navList || !navToggle) return;
  const clickedInside = navList.contains(e.target) || navToggle.contains(e.target);
  if (!clickedInside) {
    navList.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});