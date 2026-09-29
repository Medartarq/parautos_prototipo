# Documentación técnica - Prototipo estático PARAUTOS

## Alcance

El entregable documentado es el prototipo estático ubicado en `documentos/prototipo`, publicado en <https://medartarq.github.io/parautos_prototipo/>. No es la aplicación Spring Boot del repositorio: funciona íntegramente en el navegador, sin servidor ni base de datos.

## Arquitectura

| Capa | Archivos | Responsabilidad |
| --- | --- | --- |
| Acceso simulado | `index.html`, `css/login.css` | Selección de perfil demo y redirección al panel. |
| Interfaz principal | `panel.html`, `styles.css` | Contenedor, navegación lateral/móvil, área dinámica y modales. |
| Lógica de negocio y UI | `app.js` | Estado de órdenes, asistente de recepción, cotización, repuestos, control final, reportes y auditoría. |
| Persistencia adaptada | `api.js` | Contrato `Api` local; crea y guarda el estado en `localStorage`. |
| Enlaces alternativos | `order-bindings.js` | Funciones de interacción orientadas al contrato `Api`; se carga después de `api.js`. |
| Constancias | `constancia.js` | Vista e impresión de la hoja de ingreso. |
| Seguimiento público | `seguimiento.html`, `seguimiento.js` | Consulta por placa y código contra los datos locales del navegador. |
| Recursos | `assets/` | Logo, imágenes de carrocería por vista y fondo de acceso. |

`panel.html` carga, en orden, `constancia.js`, `api.js`, `order-bindings.js` y `app.js`. `Api.init()` inicializa el usuario, recupera o siembra el estado y renderiza la aplicación.

## Datos y persistencia

El estado de demostración se almacena como JSON en la misma procedencia del sitio, mediante estas claves:

- `parautos-apf2-user`: perfil elegido en el inicio de sesión.
- `parautos-apf2-static-v1`: estado completo usado por `api.js`.
- `parautosPrototypeV3`: clave leída por la lógica principal para compatibilidad del estado local.

La semilla contiene cinco órdenes con estados diferentes. Las nuevas órdenes reciben un identificador local, un número `OS-2026-xxxxx` y un código público aleatorio de ocho caracteres. Las fotos, la firma y los trazos de daños se convierten a datos locales del navegador, por lo que el espacio disponible depende de este.

## Reglas implementadas

- Acceso: `idRol` 1 representa Administrador y habilita Reportes/Auditoría; `idRol` 2 representa Asesor.
- Recepción: exige DNI/RUC, placa, modalidad, marca, modelo, color y carrocería; las modalidades distintas de Particular exigen siniestro.
- Checklist: expone 44 respuestas Sí/No agrupadas en cuatro categorías.
- Evidencias: limita la carga a 15 imágenes.
- Cotización: al aprobar, pasa a espera de repuestos si existe algún repuesto no recibido; en caso contrario, pasa a reparación.
- Control final: requiere mano de obra y todos los repuestos recibidos para registrarse. Una orden entregada no puede retroceder mediante el control.
- Entrega: solo puede establecerse cuando el estado previo es Lista para entrega.

## Ejecución local

No se instala Maven, Java, Node.js ni MySQL para el prototipo. Es necesario un servidor HTTP estático para que la carga de recursos y el almacenamiento tengan un origen consistente.

1. Abra una terminal en `documentos/prototipo`.
2. Ejecute uno de los servidores disponibles en su equipo:

```powershell
py -m http.server 8080
```

```powershell
npx --yes serve .
```

3. Abra `http://localhost:8080/` o la URL informada por `serve`.
4. Para verificar la consulta pública, abra `http://localhost:8080/seguimiento.html` en el mismo navegador y origen.

Abrir los HTML directamente con `file:///` no es la forma recomendada, porque el comportamiento de almacenamiento y recursos puede variar por navegador.

## Publicación y transferencia del repositorio

El sitio público se debe publicar desde un repositorio dedicado que tenga el contenido de `documentos/prototipo` en su raíz. No copie el resto del repositorio Spring Boot para este fin.

1. Cree un repositorio vacío en GitHub, por ejemplo `parautos_prototipo`.
2. Copie el contenido, incluidos `assets/` y `css/`, de `documentos/prototipo` a la raíz del nuevo repositorio.
3. Revise que `index.html`, `panel.html`, `seguimiento.html`, `app.js`, `api.js`, `styles.css`, `constancia.js` y `seguimiento.js` estén en esa raíz, conservando las carpetas de recursos.
4. Cree el primer commit y suba la rama `main`:

```powershell
git init
git add .
git commit -m "Publicar prototipo estatico PARAUTOS"
git branch -M main
git remote add origin https://github.com/<organizacion-o-usuario>/parautos_prototipo.git
git push -u origin main
```

5. En GitHub, abra **Settings > Pages**, seleccione **Deploy from a branch**, rama `main` y carpeta `/(root)`.
6. Espere el despliegue y valide `index.html`, `panel.html` y `seguimiento.html` en la URL de GitHub Pages.

La URL indicada para esta entrega es <https://medartarq.github.io/parautos_prototipo/>.

## Limitaciones técnicas

- No hay autenticación, autorización de servidor, API REST ni backend real.
- No hay MySQL, transacciones, concurrencia, copias de respaldo ni sincronización entre navegadores.
- `localStorage` puede eliminarse por el usuario, por las políticas del navegador o al limpiar datos del sitio.
- Los datos son demostrativos; no se debe tratar el sitio como un sistema de producción ni almacenar información personal real.
- La generación de PDF es una vista HTML impresa por el navegador, no una generación de documento en servidor.
- La consulta pública depende de los datos locales del mismo navegador; no comparte órdenes creadas desde otro equipo o perfil de navegador.

## Evolución recomendada

Para llevar el prototipo a producción, sustituya el adaptador local por endpoints autenticados, persista entidades y archivos en servicios de servidor, valide permisos en backend, registre auditoría inmutable y proteja la consulta pública con códigos de alcance y caducidad. Estas acciones no forman parte de este prototipo.
