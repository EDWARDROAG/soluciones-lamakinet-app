# Arquitectura Técnica del Sistema

## Arquitectura General
El sistema se desarrollará bajo una arquitectura en capas, separando claramente
la interfaz de usuario, la lógica de negocio y la persistencia de datos.

## Backend (.NET)
El backend estará organizado en tres capas principales:
- Api: controladores y exposición de endpoints
- Domain: entidades y reglas del negocio
- Infrastructure: acceso a datos y repositorios

Esta separación permite escalabilidad y mantenibilidad.

## Frontend
El frontend estará organizado por responsabilidades:
- Pages para vistas
- Components reutilizables
- Services para consumo de la API
- Styles para estilos globales y específicos

## Principios Técnicos
- Separación de responsabilidades
- Código mantenible
- Escalabilidad futura
- Seguridad básica desde el backend
