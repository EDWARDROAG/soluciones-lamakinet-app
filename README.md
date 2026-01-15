# Proyecto Soluciones La Mákinet

Aplicación web empresarial desarrollada bajo contrato de prestación de servicios,  
orientada a servir como **base tecnológica para la gestión de información interna**  
y futuras ampliaciones funcionales del sistema.

---

## Objetivo del proyecto

Desarrollar una aplicación web empresarial **modular y segura** que permita:

- Gestionar usuarios de forma segura  
- Controlar accesos mediante autenticación  
- Proteger información sensible  
- Servir como base para futuras fases funcionales y de negocio  

---

##  Estado actual del proyecto

### **Fase 2 — Backend funcional con autenticación y seguridad básica**

Actualmente el proyecto cuenta con un **backend completamente operativo**, que incluye:

- API desarrollada en Node.js y Express  
- Conexión a base de datos MongoDB  
- Sistema de autenticación mediante JSON Web Tokens (JWT)  
- Registro y login de usuarios  
- Rutas protegidas mediante middleware de autenticación  
- CRUD completo de clientes  
- Validación de identificadores (ObjectId)  
- Manejo profesional de errores HTTP  
- Endpoint de verificación del estado del sistema (health check)  
- Pruebas manuales completas de todas las operaciones  

---

## Tecnologías utilizadas

- Node.js  
- Express  
- MongoDB  
- Mongoose  
- JSON Web Tokens (JWT)  
- dotenv  
- Helmet (seguridad HTTP básica)  
- Nodemon (entorno de desarrollo)  

---

##  Endpoints principales

###  Autenticación

- **POST** `/api/auth/register`  
  Registro de nuevos usuarios.

- **POST** `/api/auth/login`  
  Autenticación de usuarios y generación de token JWT.

---

###  Clientes (rutas protegidas)

> Requieren header:  
> `Authorization: Bearer <token>`

- **POST** `/api/clients`  
  Crear cliente.

- **GET** `/api/clients`  
  Listar clientes del usuario autenticado.

- **GET** `/api/clients/:id`  
  Obtener cliente por ID.

- **PUT** `/api/clients/:id`  
  Actualizar cliente.

- **DELETE** `/api/clients/:id`  
  Eliminar cliente.

---

###  Rutas protegidas de usuario

- **GET** `/api/protected/profile`  
  Devuelve información del usuario autenticado.

---

###  Estado del sistema

- **GET** `/api/health`  
  Verificación del estado de la API y disponibilidad del backend.

---

##  Estructura del proyecto

```text
frontend/        → Interfaz de usuario (pendiente de implementación)
backend/
 ├── src/
 │   ├── app.js              → Configuración de Express y middlewares
 │   ├── routes/             → Definición de rutas
 │   ├── controllers/        → Lógica de negocio
 │   ├── middlewares/        → Autenticación y manejo de errores
 │   ├── config/             → Configuración de entorno y base de datos
 │   ├── models/             → Modelos de datos (Mongoose)
 │   └── utils/              → Utilidades y clases de error
 └── server.js               → Inicialización del servidor
docs/            → Documentación del proyecto


---

Autor / Desarrollo

Proyecto desarrollado por Eduar Roa
Bajo contrato de prestación de servicios para Soluciones La Mákinet
