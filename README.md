# Proyecto Soluciones La Mákinet

Aplicación web desarrollada bajo **contrato de prestación de servicios profesionales**, concebida como una **plataforma tecnológica base**, segura, modular y escalable, que soporta la gestión de usuarios, control de acceso por roles y la futura expansión funcional del negocio **Soluciones La Mákinet**.

Este repositorio **NO representa un producto final**, sino la **base estructural y técnica del sistema**, diseñada para crecer sin romper su arquitectura.

---

## 1. Contexto del proyecto

**Soluciones La Mákinet** es un negocio que integra:

- Servicios de papelería
- Impresión
- Soluciones digitales
- Atención al cliente

El proyecto surge ante la necesidad de:

- Centralizar el acceso de usuarios
- Proteger información sensible
- Preparar un sistema administrativo interno
- Establecer una base técnica robusta que permita crecer sin reescribir el sistema

> Este desarrollo prioriza **seguridad**, **claridad arquitectónica** y **mantenibilidad a largo plazo**.

---

## 2. Objetivo general

Construir una plataforma web que permita:

- Registro y autenticación segura de usuarios
- Control de acceso por roles
- Gestión del perfil del usuario autenticado
- Cambio de contraseña con validaciones de seguridad
- Separación clara entre usuarios finales y administrativos
- Integración limpia entre frontend y backend
- Escalabilidad hacia módulos futuros (ventas, servicios, reportes, etc.)

---

## 3. Alcance actual del proyecto

### 3.1 Incluido en esta fase

- Sistema completo de autenticación
- Gestión de sesión mediante JWT
- Middleware de protección de rutas
- Perfil de usuario (lectura y actualización)
- Cambio de contraseña seguro
- Manejo centralizado de errores HTTP
- Frontend funcional integrado
- Separación de vistas por rol
- Arquitectura preparada para crecimiento modular

### 3.2 No incluido (fases futuras)

- Sistema de ventas
- Gestión de productos o servicios
- Reportes administrativos
- Pasarela de pagos
- Logs avanzados y auditoría

> ⚠️ Estas funcionalidades **NO hacen parte del alcance actual** y deberán desarrollarse en fases posteriores.

---

## 4. Estado del proyecto

### Semana 5 – Integración, refactor y seguridad (COMPLETA)

- Backend Node.js + Express refactorizado
- Migración completa a ES Modules
- Conexión estable a MongoDB
- Autenticación y autorización mediante JWT
- Registro y login con validaciones
- Perfil de usuario funcional
- Cambio de contraseña seguro con hash
- Protección de rutas por middleware
- Manejo estandarizado de errores (401, 404, 500)
- Frontend integrado y probado

---

## 5. Modelo de roles y permisos

### 5.1 Roles del sistema

| Rol          | Descripción                          |
|--------------|--------------------------------------|
| super_admin  | Control total del sistema            |
| admin        | Gestión operativa y administrativa  |
| cashier      | Operaciones de caja                 |
| client       | Usuario final (sitio público)       |

### 5.2 Reglas fundamentales del sistema

- El registro público **SOLO crea usuarios con rol `client`**
- El rol `user` fue eliminado y unificado como `client`
- Solo un `super_admin` puede crear usuarios administrativos
- Los usuarios administrativos **NO acceden al sitio público**
- Cada rol tiene vistas y flujos independientes

> Estas reglas son **estructurales** y no deben romperse en futuras fases.

---

## 6. Flujo de autenticación

1. El usuario accede a `index.html`
2. Se autentica mediante un modal
3. El backend valida las credenciales
4. Se emite un JWT firmado
5. El token se almacena en `localStorage`
6. El usuario es redirigido automáticamente según su rol

---

## 7. Arquitectura Frontend

### 7.1 Principios

- JavaScript modular (ES Modules)
- Sin frameworks
- Componentes explícitamente importados
- Separación estricta por rol

### 7.2 Decisión técnica clave

- `index.html` → exclusivo para usuarios con rol `client`

Paneles administrativos independientes:

- `superadmin.html`
- `admin.html`
- `cashier.html`

> Cada panel carga **solo su lógica**, no comparten `main.js`.

---

## 8. Arquitectura Backend

## � Estructura del proyecto

```txt
├── .gitignore
├── backend
│   ├── package-lock.json
│   ├── package.json
│   ├── scripts
│   │   └── create.superadmin.js
│   ├── server.js
│   └── src
│       ├── app.js
│       ├── config
│       │   ├── db.js
│       │   └── env.js
│       ├── controllers
│       │   ├── auth
│       │   │   └── auth.controller.js
│       │   ├── client.controller.js
│       │   ├── health.controller.js
│       │   └── user.controller.js
│       ├── middlewares
│       │   ├── auth.middleware.js
│       │   ├── error.middleware.js
│       │   └── rateLimit.middleware.js
│       ├── models
│       │   ├── Client.js
│       │   └── User.js
│       ├── routes
│       │   ├── auth
│       │   │   └── auth.routes.js
│       │   ├── client.routes.js
│       │   ├── health.routes.js
│       │   ├── protected.routes.js
│       │   └── user.routes.js
│       └── utils
│           └── AppError.js
├── docs
│   ├── arquitectura.md
│   ├── index_base
│   ├── modelo-de-datos.md
│   └── modulos-y-flujo.md
├── estructura.js
├── frontend
│   ├── assets
│   │   ├── fonts
│   │   ├── icons
│   │   │   ├── balanza.png
│   │   │   ├── impresora.png
│   │   │   ├── logo.png
│   │   │   ├── maps.png
│   │   │   ├── portafolio.png
│   │   │   └── portatil.png
│   │   └── images
│   │       ├── about.png
│   │       ├── escritorio.png
│   │       ├── eslogan.JPG
│   │       ├── facturas.jpg
│   │       ├── logo.png
│   │       ├── logo_2.png
│   │       ├── maintenance.png.png
│   │       ├── pines.png
│   │       ├── tobias-creaciones.png
│   │       └── tobias-papeleria.png
│   ├── public
│   │   ├── admin.html
│   │   ├── cashier.html
│   │   ├── forbidden.html
│   │   ├── index.html
│   │   ├── js
│   │   │   ├── api
│   │   │   │   └── api.js
│   │   │   ├── components
│   │   │   │   ├── auth.modal.js
│   │   │   │   ├── contact.footer.js
│   │   │   │   ├── hero.actions.js
│   │   │   │   ├── hero.js
│   │   │   │   ├── navbar.js
│   │   │   │   ├── password.toggle.js
│   │   │   │   ├── profile.modal.js
│   │   │   │   ├── search.data.js
│   │   │   │   ├── search.js
│   │   │   │   ├── security.modal.js
│   │   │   │   ├── services.actions.js
│   │   │   │   └── whatsapp.js
│   │   │   ├── config
│   │   │   │   └── env.js
│   │   │   ├── main.js
│   │   │   ├── pages
│   │   │   │   ├── admin.js
│   │   │   │   ├── cashier.js
│   │   │   │   ├── forgot-password.js
│   │   │   │   ├── login.js
│   │   │   │   ├── profile.js
│   │   │   │   ├── reset-password.js
│   │   │   │   └── superadmin.js
│   │   │   ├── services
│   │   │   │   ├── auth.service.js
│   │   │   │   └── user.service.js
│   │   │   └── utils
│   │   │       ├── guard.js
│   │   │       ├── role.redirect.js
│   │   │       ├── scroll.js
│   │   │       ├── session.js
│   │   │       └── storage.js
│   │   ├── maintenance.html
│   │   └── superadmin.html
│   └── styles
│       └── main.css
├── package-lock.json
├── package.json
├── project_snapshot.py
└── README.md


### 8.1 Principios

- API REST
- Controladores separados
- Middlewares reutilizables
- Manejo centralizado de errores

### 8.2 Seguridad

- Contraseñas hasheadas con bcrypt
- JWT firmado y validado
- Protección de rutas
- Rate limit básico
- Variables de entorno para datos sensibles

---

## 9. Endpoints disponibles

### 9.1 Autenticación

#### Registro de usuario (solo `client`)
**POST** `/api/auth/register`

```json
{
  "firstName": "Nombre",
  "lastName": "Apellido",
  "email": "usuario@email.com",
  "phone": "3110000000",
  "password": "123456"
}
Valida campos obligatorios

La contraseña se almacena hasheada

Crea únicamente usuarios con rol client

Login

POST /api/auth/login

{
  "email": "usuario@email.com",
  "password": "123456"
}


Retorna JWT

Respuesta 200 o 401 según credenciales

Cambio de contraseña (usuario autenticado)

POST /api/auth/change-password

Headers:

Authorization: Bearer <token>

{
  "currentPassword": "123456",
  "newPassword": "1234567"
}


Verifica contraseña actual

Hashea la nueva contraseña

Invalida la contraseña anterior

9.2 Usuario (rutas protegidas)

Todas requieren JWT válido

Obtener perfil del usuario autenticado

GET /api/users/me

{
  "_id": "6970251b3b777a1d1c95b346",
  "firstName": "Pedro",
  "lastName": "Mechudo",
  "email": "calvo@gmail.com",
  "phone": "3122252525",
  "role": "client",
  "createdAt": "2026-01-21T01:00:03.583Z",
  "updatedAt": "2026-01-22T18:05:33.036Z"
}


No expone información sensible

Actualizar perfil del usuario

PUT /api/users/me

{
  "firstName": "NombreActualizado",
  "lastName": "ApellidoActualizado",
  "phone": "3000000000"
}


Solo permite modificar el usuario autenticado

Cambios persistidos en base de datos

10. Manejo de errores
Código	Significado
400	Error de validación
401	No autorizado
404	Recurso no encontrado
500	Error interno del servidor
11. Estructura del proyecto

La estructura del proyecto respeta una separación clara entre:

Frontend

Backend

Documentación

Está diseñada para escalar sin romper la arquitectura ni duplicar lógica.

Ver estructura detallada en la sección correspondiente del repositorio.

12. Convenciones del proyecto

Código claro y documentado

Nombres explícitos

Separación estricta de responsabilidades

No duplicación de lógica

Enfoque en seguridad y mantenibilidad

13. Próxima fase (Semana 6)

Panel Super Admin funcional

Creación de usuarios admin y cashier

Estados de usuario (activo / inactivo)

Logs administrativos

Preparación para despliegue productivo

14. Autoría

Desarrollado por Eduar Roa
Contrato de prestación de servicios profesionales
Proyecto para Soluciones La Mákinet

15. Nota final

Este proyecto constituye una base tecnológica evolutiva.

Cualquier nueva funcionalidad deberá respetar:

La arquitectura definida

El modelo de roles

Las políticas de seguridad establecidas


