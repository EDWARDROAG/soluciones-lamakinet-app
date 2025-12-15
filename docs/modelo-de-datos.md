# Modelo de Datos – Fase Inicial

## Tabla: usuarios
Descripción: Gestión de usuarios del sistema.

Campos:
- id (PK)
- nombre
- email
- password
- activo
- fecha_creacion

## Tabla: contenidos
Descripción: Información administrable del sitio web.

Campos:
- id (PK)
- titulo
- descripcion
- tipo
- estado
- fecha_creacion

## Tabla: contactos
Descripción: Mensajes enviados desde el formulario de contacto.

Campos:
- id (PK)
- nombre
- email
- mensaje
- fecha_envio

## Relaciones
- Un usuario puede crear o administrar múltiples contenidos.
- La tabla contactos no depende de otras tablas.
