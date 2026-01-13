# Proyecto Soluciones La Mákinet

Aplicación web empresarial desarrollada bajo contrato de prestación de servicios,
orientada a servir como base tecnológica para la gestión de información interna
y futuras ampliaciones del sistema.

---

##  Objetivo del proyecto
Desarrollar una aplicación web empresarial modular que permita:
- Gestionar usuarios de forma segura
- Controlar accesos mediante autenticación
- Proteger información sensible
- Servir como base para futuras fases funcionales y de negocio

---

##  Estado actual del proyecto
**Fase 2 – Backend funcional con autenticación y seguridad básica**

Actualmente el proyecto cuenta con un backend completamente operativo que incluye:
- API desarrollada en Node.js y Express
- Conexión a base de datos MongoDB
- Sistema de autenticación mediante JSON Web Tokens (JWT)
- Registro y login de usuarios
- Rutas protegidas mediante middleware de autenticación
- Manejo de roles de usuario
- Endpoint de verificación del estado del sistema (health check)

---

##  Tecnologías utilizadas
- Node.js
- Express
- MongoDB
- JSON Web Tokens (JWT)
- dotenv
- Nodemon (entorno de desarrollo)

---

##  Endpoints principales

### Autenticación
- **POST** `/api/auth/register`  
  Registro de nuevos usuarios.

- **POST** `/api/auth/login`  
  Autenticación de usuarios y generación de token JWT.

---

### Rutas protegidas
- **GET** `/api/protected/profile`  
  Devuelve información del usuario autenticado.  
  Requiere header `Authorization: Bearer <token>`.

---

### Estado del sistema
- **GET** `/api/health`  
  Verificación del estado de la API y disponibilidad del backend.

---

## 🧱 Estructura del proyecto

```text
frontend/   → Interfaz de usuario (pendiente de implementación)
backend/
 ├── src/
 │   ├── app.js              → Configuración de Express y rutas
 │   ├── routes/             → Definición de rutas
 │   ├── controllers/        → Lógica de negocio
 │   ├── middlewares/        → Middlewares de autenticación
 │   ├── config/             → Configuración de entorno y base de datos
 │   └── models/             → Modelos de datos
 └── server.js               → Inicialización del servidor
docs/       → Documentación del proyecto
