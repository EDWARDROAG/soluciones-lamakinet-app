
(function () {
  const whatsappBtn = document.querySelector('.btn-whatsapp');

  if (!whatsappBtn) return;

  // CONFIGURACIÓN
  const phoneNumber = '573115610825'; 
  const defaultMessage = 'Hola, estoy interesado en sus servicios de Papelería Lamakinet.';

  // Construcción del enlace
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  // Evento click
  whatsappBtn.addEventListener('click', function () {
    window.open(whatsappURL, '_blank');
  });
})();

// ===============================
// SCROLL SUAVE PARA NAVEGACIÓN
// ===============================
(function () {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);

      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
})();

// ===============================
// FAQ - ACORDEÓN
// ===============================
(function () {
  const questions = document.querySelectorAll('.faq-question');

  questions.forEach(question => {
    question.addEventListener('click', () => {
      const expanded = question.getAttribute('aria-expanded') === 'true';

      // Cerrar todas
      questions.forEach(q => {
        q.setAttribute('aria-expanded', 'false');
        q.nextElementSibling.hidden = true;
      });

      // Abrir la seleccionada si estaba cerrada
      if (!expanded) {
        question.setAttribute('aria-expanded', 'true');
        question.nextElementSibling.hidden = false;
      }
    });
  });
})();

// ===============================
// MENÚ RESPONSIVE
// ===============================
(function () {
  const btnMenu = document.getElementById('btn-menu');
  const nav = document.querySelector('nav');

  if (!btnMenu || !nav) return;

  btnMenu.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
})();

// ===============================
// LOGIN VISUAL (SIN BACKEND)
// ===============================
(function () {
  const btnLogin = document.getElementById('btn-login');
  const modal = document.getElementById('login-modal');
  const btnClose = document.getElementById('btn-close-login');
  const form = document.getElementById('login-form');
  const errorMsg = document.getElementById('login-error');

  if (!btnLogin || !modal) return;

  btnLogin.addEventListener('click', () => {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  });

  btnClose.addEventListener('click', () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    errorMsg.hidden = true;
    form.reset();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = document.getElementById('login-user').value.trim();
    const pass = document.getElementById('login-pass').value.trim();

    if (!user || !pass) {
      errorMsg.hidden = false;
      return;
    }

    errorMsg.hidden = true;
    alert('Login visual correcto (sin backend)');
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    form.reset();
  });
})();



