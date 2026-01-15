# Proyecto Soluciones La Mákinet

Aplicación web desarrollada bajo contrato de prestación de servicios profesionales, diseñada como una base tecnológica segura, modular y escalable para la gestión de usuarios y la futura expansión de funcionalidades del negocio.

---

## Objetivo del proyecto

Construir una plataforma web que permita:

- Registro y autenticación segura de usuarios
- Gestión completa del perfil de usuario
- Cambio de contraseña con validaciones de seguridad
- Control de acceso mediante JWT
- Protección de información sensible
- Integración funcional entre frontend y backend
- Base sólida para módulos futuros (servicios, bonos, promociones, panel administrativo)

---

## Estado actual del proyecto

### Semana 5 – Integración y seguridad (COMPLETA)

El sistema cuenta actualmente con:

- Backend en Node.js y Express completamente funcional
- Conexión estable a base de datos MongoDB
- Autenticación y autorización mediante JWT
- Registro y login de usuarios con validaciones
- Perfil de usuario (consulta y actualización de datos)
- Cambio de contraseña seguro con verificación previa
- Middleware de protección de rutas
- Manejo estandarizado de errores HTTP (401, 404, 500)
- Frontend integrado y operativo
- Pruebas funcionales manuales de todos los flujos críticos

---

## Tecnologías utilizadas

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- dotenv
- helmet
- nodemon

### Frontend
- HTML5
- CSS3 diseño responsive
- JavaScript vanilla

---

## Endpoints del sistema

### Autenticación

#### Registro de usuario
**POST** `/api/auth/register`

Body:
```json
{
  "firstName": "Nombre",
  "lastName": "Apellido",
  "email": "usuario@email.com",
  "phone": "3110000000",
  "password": "123456"
}
```

- Valida campos obligatorios
- Valida tipos de datos
- La contraseña se almacena hasheada

---

#### Login
**POST** `/api/auth/login`

Body:
```json
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

- Retorna token JWT
- Responde 200 o 401 según credenciales

---

## Usuario (Rutas protegidas)

Todas las rutas requieren el header:

```
Authorization: Bearer <token>
```

---

#### Obtener perfil del usuario autenticado
**GET** `/api/users/me`

Respuesta:
```json
{
  "firstName": "Nombre",
  "lastName": "Apellido",
  "email": "usuario@email.com",
  "phone": "3110000000",
  "role": "user"
}
```

- No expone información sensible como la contraseña

---

#### Actualizar perfil del usuario
**PUT** `/api/users/me`

Body:
```json
{
  "firstName": "NombreActualizado",
  "lastName": "ApellidoActualizado",
  "phone": "3000000000"
}
```

- Solo permite modificar el usuario autenticado
- Los cambios se persisten en la base de datos

---

#### Cambio de contraseña
**PUT** `/api/users/change-password`

Body:
```json
{
  "currentPassword": "123456",
  "newPassword": "1234567"
}
```

- Verifica la contraseña actual
- Hashea la nueva contraseña
- La contraseña anterior deja de ser válida

---

## Seguridad y manejo de errores

- Acceso sin token: 401 Unauthorized
- Token inválido o expirado: 401 Unauthorized
- Ruta inexistente: 404 Not Found
- Error interno del servidor: 500 Internal Server Error

---

## Estructura del proyecto

SOLUCIONES-LAMAKINET-APP/
│
├── frontend/                          → Interfaz de usuario (HTML, CSS, JS)
│   ├── assets/
│   │   └── images/
│   │       ├── about.png.png
│   │       ├── Captura.JPG
│   │       └── hero-tech.png.png
│   │
│   ├── js/
│   │   └── main.js                    → Lógica JS del frontend
│   │
│   ├── styles/
│   │   └── main.css                   → Estilos globales
│   │
│   ├── admin.html                     → Vista administrador
│   ├── create-user.html               → Creación de usuarios
│   ├── forbidden.html                 → Vista 403
│   ├── index.html                     → Página principal
│   ├── maintenance.html               → Vista mantenimiento
│   ├── user.html                      → Vista usuario
│   │
│   ├── node_modules/
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
├── backend/                           → API REST (Node.js + Express)
│   ├── node_modules/
│   │
│   ├── src/
│   │   ├── app.js                     → Configuración de Express y middlewares
│   │   │
│   │   ├── config/
│   │   │   ├── db.js                  → Conexión a base de datos
│   │   │   └── env.js                 → Variables de entorno
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth/                  → Controladores de autenticación
│   │   │   ├── client.controller.js   → Lógica de clientes
│   │   │   ├── health.controller.js   → Health check
│   │   │   └── user.controller.js     → Lógica de usuarios
│   │   │
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js     → Autenticación JWT
│   │   │   ├── error.middleware.js    → Manejo centralizado de errores
│   │   │   └── ratelimit.middleware.js→ Protección por rate limit
│   │   │
│   │   ├── models/
│   │   │   ├── Client.js              → Modelo Client
│   │   │   └── User.js                → Modelo User
│   │   │
│   │   ├── routes/                    → Definición de rutas (REST)
│   │   └── utils/                     → Utilidades y helpers
│   │
│   ├── .env                           → Variables de entorno del backend
│   ├── package.json
│   ├── package-lock.json
│   └── server.js                      → Inicialización del servidor
│
└── docs/                              → Documentación del proyecto

## Próxima fase (Semana 6)

- Despliegue en entorno productivo
- Configuración de variables de entorno
- Pruebas finales en producción
- Validación contractual y cierre del proyecto

---

## Autor y desarrollo

Proyecto desarrollado por Eduar Roa  
Bajo contrato de prestación de servicios profesionales  
Para Soluciones La Mákinet
