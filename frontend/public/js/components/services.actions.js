// js/components/services.actions.js
(function () {
  const cards = document.querySelectorAll('.service-card');
  if (!cards.length) return;

  const normalize = (text) =>
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  cards.forEach(card => {
    const titleEl = card.querySelector('h3');
    const button = card.querySelector('.service-btn');

    if (!titleEl || !button) return;

    const title = normalize(titleEl.textContent);

    // Publicidad → Smart Medios
    if (title.includes('publicidad')) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        window.open('https://smartmedios.com.co/', '_blank', 'noopener');
      });
      return;
    }

    // Resto de servicios → mantenimiento
    button.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'maintenance.html';
    });
  });
})();
