
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
