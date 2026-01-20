// js/utils/scroll.js
(function () {
  const links = document.querySelectorAll('a[href^="#"]');
  if (!links.length) return;

  const OFFSET = 0; // ajusta si tienes header fijo (ej: 80)

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

      // Ignorar enlaces vacíos o placeholders
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const top =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        OFFSET;

      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    });
  });
})();
