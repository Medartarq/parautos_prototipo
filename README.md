# Prototipo navegable PARAUTOS

Prototipo estatico del APF2. Simula los flujos principales del modulo web sin conectarse a Spring Boot ni MySQL.

## Funcionalidades demostrables

- Inicio de sesion simulado en `index.html`.
- Panel de indicadores, alertas y busqueda de ordenes.
- Registro de una orden: datos, checklist de 44 items con confirmación de revisión, evidencias con metadatos, diagnóstico, firma y aceptación.
- Siniestro pendiente con recordatorio persistente hasta registrar su número.
- Cotización en soles o dólares, agrupada en Planchado, Pintura, Mecánica y Repuestos.
- Gestión global de repuestos con proveedor recomendado, fechas, cantidades parciales, flete, ampliación y filtros operativos.
- Flujo contextual de estados internos y públicos: publicación auditada de vehículo listo para recojo, entrega y consulta pública separada.
- Cotizaciones versionadas: historial, motivo de ajuste, instantáneas de envío/aprobación y bloqueo de ajustes tras aprobar.
- Control final con cotización aprobada, recepción de repuestos, verificación de mano de obra y reapertura auditada antes de la entrega.
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

Este prototipo no implementa autenticación real, MySQL, sincronización, correo, seguridad de permisos, auditoría inalterable ni generación de PDF en servidor. Los datos, firmas, evidencias, versiones y auditorías viven solo en `localStorage` del navegador y sirven exclusivamente para la demostración; no constituyen controles de backend ni de seguridad.
