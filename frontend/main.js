/* =========================================
   JS BASE – PAPELERÍA LAMAKINET
   Funcionalidad inicial (sin backend)
   ========================================= */

/* =========================
   BOTÓN WHATSAPP
   =========================
   - Solo abre WhatsApp
   - Número y mensaje fácilmente modificables
   - Pensado para negocio local
*/

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

/* =========================
   FUTURAS FUNCIONES (NO ACTIVAS)
   =========================
   - Scroll suave a secciones
   - Botón "Ver servicios"
   - Navegación activa
   - Tracking de clics
*/

// document.querySelector('.btn-primary').addEventListener(...)
// document.querySelector('nav li').addEventListener(...)
