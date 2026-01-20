// js/components/navbar.js
(function () {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.querySelector('.header-nav');

  if (!toggle || !nav) return;

  function closeMenu() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function openMenu() {
    nav.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  // Toggle menú móvil
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = nav.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // Cerrar menú al hacer click en un enlace
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Cerrar menú al hacer click fuera
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && e.target !== toggle) {
      closeMenu();
    }
  });
})();
