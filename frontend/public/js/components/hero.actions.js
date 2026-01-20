// js/components/hero.actions.js
(function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const btnServices = hero.querySelector('.hero-buttons .btn-primary');
  const btnContact = hero.querySelector('.hero-buttons .btn-secondary');

  // Ver servicios → scroll
  btnServices?.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.getElementById('servicios');
    target?.scrollIntoView({ behavior: 'smooth' });
  });

  // Contactar → WhatsApp
  btnContact?.addEventListener('click', (e) => {
    e.preventDefault();

    const phone = '573115610825';
    const message =
      'Hola, quiero más información sobre sus servicios de Papelería Lamakinet.';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank', 'noopener');
  });
})();
