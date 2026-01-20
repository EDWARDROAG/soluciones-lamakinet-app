// js/components/hero.js
(function () {
  const hero = document.querySelector('.hero');
  const bg = document.querySelector('.hero-bg');

  if (!hero || !bg) return;

  let x = 0;
  let y = 0;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();

    const offsetX = (e.clientX - rect.left) / rect.width - 0.5;
    const offsetY = (e.clientY - rect.top) / rect.height - 0.5;

    x = offsetX * 20;
    y = offsetY * 20;

    requestAnimationFrame(() => {
      bg.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
    });
  });

  hero.addEventListener('mouseleave', () => {
    bg.style.transform = 'translate(0, 0) scale(1.05)';
  });
})();
