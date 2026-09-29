# Prototipo navegable PARAUTOS

Prototipo estatico del APF2. Simula los flujos principales del modulo web sin conectarse a Spring Boot ni MySQL.

## Funcionalidades demostrables

- Inicio de sesion simulado en `index.html`.
- Panel de indicadores, alertas y busqueda de ordenes.
- Registro de una orden: datos, checklist de 44 items, danos, evidencias, diagnostico y firma.
- Cotizacion, repuestos, cambio de estado y control final.
- Acta de conformidad de servicios imprimible tras completar todas las verificaciones del control final.
- Reportes operativos de demostracion.
- Consulta publica en `seguimiento.html` mediante placa y codigo.

Los cambios se almacenan solo en `localStorage` del navegador. Usa el boton **Restablecer datos demo** en el panel para iniciar otra demostracion.

## Publicacion manual en GitHub Pages

1. Copia el contenido de esta carpeta a la raiz de un repositorio GitHub independiente.
2. Sube los archivos a la rama `main`.
3. En GitHub, abre **Settings > Pages**.
4. Selecciona **Deploy from a branch**, rama `main` y carpeta `/(root)`.
5. Guarda la configuracion y usa la URL publicada en el informe APF2. GitHub Pages abrirá `index.html` con la pantalla de acceso; después del ingreso se abrirá `panel.html`.

## Limites

Este prototipo no implementa autenticacion real, MySQL, sincronizacion, correo, auditoria inalterable ni generacion de PDF en servidor. Simula los perfiles de administrador y asesor solo para demostrar la visibilidad de funciones. Es una demostracion navegable creada bajo direccion del equipo con apoyo de IA.
