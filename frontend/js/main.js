// ===============================
// BOTÓN WHATSAPP
// ===============================
(function () {
  const whatsappBtn = document.querySelector('.btn-whatsapp');
  if (!whatsappBtn) return;

  const phoneNumber = '573115610825';
  const defaultMessage = 'Hola, estoy interesado en sus servicios de Papelería Lamakinet.';
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  whatsappBtn.addEventListener('click', () => {
    window.open(whatsappURL, '_blank');
  });
})();

// ===============================
// SCROLL SUAVE
// ===============================
(function () {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

// ===============================
// MODAL LOGIN
// ===============================
(function () {
  const btnLogin = document.getElementById('btn-login');
  const modal = document.getElementById('login-modal');
  const btnClose = document.getElementById('btn-close-login');
  const form = document.getElementById('login-form');
  const errorMsg = document.getElementById('login-error');

  if (!btnLogin || !modal || !form) return;

  btnLogin.addEventListener('click', () => {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  });

  btnClose.addEventListener('click', () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    errorMsg.hidden = true;
    form.reset();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    errorMsg.hidden = true;
    errorMsg.textContent = '';

    const email = document.getElementById('login-user').value.trim();
    const password = document.getElementById('login-pass').value.trim();

    if (!email || !password) {
      errorMsg.textContent = 'Todos los campos son obligatorios';
      errorMsg.hidden = false;
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        errorMsg.textContent = data.message || 'Credenciales inválidas';
        errorMsg.hidden = false;
        return;
      }

      localStorage.setItem('token', data.token);
      window.location.href = 'index.html';

    } catch (error) {
      errorMsg.textContent = 'No se pudo conectar con el servidor';
      errorMsg.hidden = false;
    }
  });
})();

// ===============================
// CAMBIO ENTRE LOGIN / REGISTER / RECOVER
// ===============================
(function () {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const recoverForm = document.getElementById('recover-form');

  const btnShowRegister = document.getElementById('btn-show-register');
  const btnShowRecover = document.getElementById('btn-show-recover');
  const btnCancelRegister = document.getElementById('btn-cancel-register');
  const btnCancelRecover = document.getElementById('btn-cancel-recover');

  if (!loginForm) return;

  const showLogin = () => {
    loginForm.hidden = false;
    registerForm.hidden = true;
    recoverForm.hidden = true;
  };

  const showRegister = () => {
    loginForm.hidden = true;
    registerForm.hidden = false;
    recoverForm.hidden = true;
  };

  const showRecover = () => {
    loginForm.hidden = true;
    registerForm.hidden = true;
    recoverForm.hidden = false;
  };

  btnShowRegister.addEventListener('click', showRegister);
  btnShowRecover.addEventListener('click', showRecover);
  btnCancelRegister.addEventListener('click', showLogin);
  btnCancelRecover.addEventListener('click', showLogin);
})();

// ===============================
// REGISTRO + LOGIN AUTOMÁTICO
// ===============================
(function () {
  const registerForm = document.getElementById('register-form');
  const errorMsg = document.getElementById('register-error');
  if (!registerForm) return;

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    errorMsg.hidden = true;
    errorMsg.textContent = '';

    const firstName = document.getElementById('register-name').value.trim();
    const lastName = document.getElementById('register-lastname').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const phone = document.getElementById('register-phone').value.trim();
    const password = document.getElementById('register-pass').value;
    const confirm = document.getElementById('register-pass-confirm').value;

    if (password !== confirm) {
      errorMsg.textContent = 'Las contraseñas no coinciden';
      errorMsg.hidden = false;
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, phone, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        errorMsg.textContent = data.message || 'Error al crear usuario';
        errorMsg.hidden = false;
        return;
      }

      localStorage.setItem('token', data.token);
      window.location.href = 'index.html';

    } catch (error) {
      errorMsg.textContent = 'Error de conexión con el servidor';
      errorMsg.hidden = false;
    }
  });
})();

// ===============================
// SESIÓN ACTIVA (CLAVE)
// ===============================
(function () {
  const token = localStorage.getItem('token');

  const btnLogin = document.getElementById('btn-login');
  const userBox = document.getElementById('user-box');
  const userToggle = document.getElementById('user-name');
  const userMenu = document.getElementById('user-menu');
  const btnLogout = document.getElementById('btn-logout');

  if (!btnLogin || !userBox || !userToggle || !userMenu || !btnLogout) {
    console.warn('⚠️ Elementos de usuario no encontrados');
    return;
  }

  // SIN sesión
  if (!token) {
    btnLogin.style.display = 'inline-block';
    userBox.style.display = 'none';
    return;
  }

  // CON sesión
  btnLogin.style.display = 'none';
  userBox.style.display = 'inline-block';

  // Nombre desde JWT
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    userToggle.textContent = `Hola, ${payload.firstName || 'Usuario'} ▼`;
  } catch (e) {
    console.error('❌ Token inválido');
  }

  // 🔽 ABRIR / CERRAR MENÚ
  userToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    userMenu.style.display =
      userMenu.style.display === 'block' ? 'none' : 'block';
  });

  // ❌ CERRAR MENÚ AL HACER CLICK FUERA
  document.addEventListener('click', () => {
    userMenu.style.display = 'none';
  });

  // 🚪 CERRAR SESIÓN (SIEMPRE FUNCIONA)
  btnLogout.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  });
})();

// ===============================
// PERFIL USUARIO
// ===============================
(function () {
  const btnProfile = document.getElementById('btn-profile');
  const modal = document.getElementById('profile-modal');
  const btnClose = document.getElementById('btn-close-profile');
  const form = document.getElementById('profile-form');
  const msg = document.getElementById('profile-msg');

  if (!btnProfile || !modal || !form) return;

  btnProfile.addEventListener('click', async () => {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');

    await cargarPerfil();
  });

  btnClose.addEventListener('click', () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    msg.hidden = true;
  });

  async function cargarPerfil() {
    try {
      const token = localStorage.getItem('token');

      const res = await fetch('http://localhost:3000/api/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await res.json();

      document.getElementById('profile-name').value = data.firstName;
      document.getElementById('profile-lastname').value = data.lastName;
      document.getElementById('profile-email').value = data.email;
      document.getElementById('profile-phone').value = data.phone || '';

    } catch {
      msg.textContent = 'No se pudieron cargar los datos';
      msg.hidden = false;
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.hidden = true;

    const token = localStorage.getItem('token');

    const body = {
  firstName: document.getElementById('profile-name').value.trim(),
  lastName: document.getElementById('profile-lastname').value.trim(),
  email: document.getElementById('profile-email').value.trim(),
  phone: document.getElementById('profile-phone').value.trim()
};

    try {
      const res = await fetch('http://localhost:3000/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (!res.ok) throw new Error();

      msg.textContent = 'Datos actualizados correctamente';
      msg.hidden = false;

    } catch {
      msg.textContent = 'Error al guardar los datos';
      msg.hidden = false;
    }
  });
})();

// ===============================
// SEGURIDAD / CAMBIO CONTRASEÑA
// ===============================
(function () {
  const btnSecurity = document.getElementById('btn-security');
  const modal = document.getElementById('security-modal');
  const btnClose = document.getElementById('btn-close-security');
  const form = document.getElementById('security-form');
  const msg = document.getElementById('security-msg');

  if (!btnSecurity || !modal || !form) return;

  btnSecurity.addEventListener('click', () => {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    msg.hidden = true;
    form.reset();
  });

  btnClose.addEventListener('click', () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.hidden = true;

    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirm = document.getElementById('confirm-new-password').value;

    if (newPassword !== confirm) {
      msg.textContent = 'Las contraseñas no coinciden';
      msg.hidden = false;
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const res = await fetch(
        'http://localhost:3000/api/users/change-password',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            currentPassword,
            newPassword
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        msg.textContent = data.message || 'Error al cambiar contraseña';
        msg.hidden = false;
        return;
      }

      msg.textContent = 'Contraseña actualizada correctamente';
      msg.hidden = false;
      form.reset();

    } catch {
      msg.textContent = 'Error de conexión';
      msg.hidden = false;
    }
  });
})();

(function () {
  const hero = document.querySelector('.hero');
  const bg = document.querySelector('.hero-bg');

  if (!hero || !bg) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const moveX = (x / rect.width - 0.5) * 20;
    const moveY = (y / rect.height - 0.5) * 20;

    bg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
  });

  hero.addEventListener('mouseleave', () => {
    bg.style.transform = 'translate(0, 0) scale(1)';
  });
})();
// ===============================
// MENÚ MÓVIL
// ===============================
(function () {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.querySelector('.header-nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // Cerrar al hacer click en un link
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
})();

