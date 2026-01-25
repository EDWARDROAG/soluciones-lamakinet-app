document.addEventListener('DOMContentLoaded', () => {
  initWhatsappPhone();
  initEmailCopy();
});

/* 📞 Teléfono → WhatsApp */
function initWhatsappPhone() {
  const phone = document.querySelector('[data-whatsapp]');
  if (!phone) return;

  const number = phone.dataset.whatsapp;

  phone.addEventListener('mouseenter', () => {
    if (window.innerWidth > 768) {
      window.open(`https://wa.me/${number}`, '_blank');
    }
  });

 }

/* 📧 Email → copiar */
function initEmailCopy() {
  const email = document.querySelector('[data-email]');
  if (!email) return;

  const msg = document.querySelector('.copy-msg');

  email.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(email.dataset.email);

      if (msg) {
        msg.classList.add('visible');
        setTimeout(() => msg.classList.remove('visible'), 2000);
      }
    } catch (err) {
      console.error('Error copiando correo', err);
    }
  });
}
