// js/components/whatsapp.js
(function () {
  const buttons = document.querySelectorAll(
    '.whatsapp-float, .btn-whatsapp'
  );

  if (!buttons.length) return;

  const phoneNumber = '573115610825';
  const defaultMessage =
    'Hola, estoy interesado en sus servicios de Papelería Lamakinet.';

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    defaultMessage
  )}`;

  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(whatsappURL, '_blank', 'noopener');
    });
  });
})();
