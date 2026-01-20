// js/components/search.js
import { SERVICES } from './search.data.js';

(function () {
  const btnSearch = document.getElementById('btn-search');
  if (!btnSearch) return;

  const normalize = (text) =>
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  // Crear contenedor
  const wrapper = document.createElement('div');
  wrapper.className = 'search-box';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Buscar servicio...';

  const list = document.createElement('ul');
  list.className = 'search-results';

  wrapper.appendChild(input);
  wrapper.appendChild(list);
  btnSearch.parentNode.appendChild(wrapper);

  // Abrir / cerrar buscador
  btnSearch.addEventListener('click', () => {
    wrapper.classList.toggle('open');
    input.focus();
  });

  // Buscar
  input.addEventListener('input', () => {
    const value = normalize(input.value.trim());
    list.innerHTML = '';
    if (!value) return;

    const matches = SERVICES.filter(service =>
      service.keywords.some(k => normalize(k).includes(value))
    );

    matches.forEach(service => {
      const li = document.createElement('li');
      li.textContent = service.label;

      li.addEventListener('click', () => {
        wrapper.classList.remove('open');

        if (service.type === 'external') {
          window.open(service.link, '_blank', 'noopener');
        } else {
          window.location.href = service.link;
        }
      });

      list.appendChild(li);
    });
  });

  // Cerrar al hacer click fuera
  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target) && e.target !== btnSearch) {
      wrapper.classList.remove('open');
    }
  });
})();
