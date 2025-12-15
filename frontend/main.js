
(function () {
  const whatsappBtn = document.querySelector('.btn-whatsapp');

  if (!whatsappBtn) return;

  // CONFIGURACIÓN
  const phoneNumber = '573000000000'; // 👉 Cambiar por el número real (formato internacional)
  const defaultMessage = 'Hola, estoy interesado en sus servicios de Papelería Lamakinet.';

  // Construcción del enlace
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  // Evento click
  whatsappBtn.addEventListener('click', function () {
    window.open(whatsappURL, '_blank');
  });
})();

