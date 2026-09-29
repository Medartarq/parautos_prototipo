# Manual de usuario - Prototipo PARAUTOS

## Acceso

Prototipo publicado: <https://medartarq.github.io/parautos_prototipo/>.

La pantalla de acceso es demostrativa. Seleccione uno de los perfiles, deje o cambie el usuario mostrado y pulse **Entrar**. La contraseña no se valida.

1. Seleccione **Christian Cavero · Asesor** para operar órdenes, cotizaciones, repuestos y control final.
2. Seleccione **Carlos Amaya · Administrador** para acceder además a **Reportes** y **Auditoría**.
3. Pulse **Entrar** para abrir el panel principal.

![Pantalla de acceso](../capturas_pantalla/login.PNG)

## Panel y órdenes

El panel muestra contadores de cotizaciones pendientes, aprobaciones, repuestos y reparaciones. Las órdenes demo incluyen la placa y el código público necesarios para probar el seguimiento.

1. En el menú, pulse **Órdenes**.
2. Escriba marca, modelo, color, placa o número de orden en el buscador; opcionalmente filtre por modalidad y estado.
3. Pulse el estado de una orden para abrir su detalle.
4. En el detalle, seleccione las pestañas **Resumen**, **Cotización**, **Repuestos**, **Control final** e **Historial**.
5. Para regresar al listado, pulse **Volver**.

![Listado de órdenes](../capturas_pantalla/MOrden01.PNG)

## Registrar una orden

El asistente guarda el borrador automáticamente en el navegador y permite usar **Guardar borrador** en cualquier etapa.

1. Pulse **Nueva orden**.
2. En **Datos**, complete DNI de 8 dígitos o RUC de 11, placa, modalidad, marca, modelo, color y carrocería. Para una aseguradora, complete también el número de siniestro.
3. Pulse **Continuar**. El prototipo normaliza formatos frecuentes de placa y avisa si el formato es inusual.
4. En **Checklist**, responda los 44 ítems con **Sí** o **No**. Las observaciones son opcionales.
5. En **Consideraciones**, marque solo las condiciones aplicables. No son obligatorias; el resumen indica las que caben en la hoja de entrada.
6. En **Daños**, escoja carrocería y vista; dibuje sobre la imagen. Puede deshacer, rehacer, limpiar y ampliar el editor.
7. En **Evidencias**, tome o seleccione hasta 15 imágenes JPG, PNG o WebP. Puede continuar sin completar el máximo.
8. En **Diagnóstico**, escriba la evaluación y, de ser necesario, adjunte una fotografía manuscrita.
9. En **Resumen**, trace la firma, active la aceptación y pulse **Confirmar y crear orden**.

![Nueva orden: datos](../capturas_pantalla/NOrden01.PNG)
![Nueva orden: checklist](../capturas_pantalla/NOrden03.PNG)
![Nueva orden: daños](../capturas_pantalla/NOrden05.PNG)

## Cotizar y avanzar una orden

1. Abra una orden y entre a la pestaña **Cotización**.
2. Para modalidad particular, agregue mano de obra y repuestos/insumos con descripción, cantidad y precio unitario. Para aseguradoras, active **Registrar cotización completa dentro de PARAUTOS** si desea registrar esos conceptos.
3. Si no se requieren materiales, active **Este servicio no requiere repuestos ni insumos**.
4. Pulse **Marcar enviada** para pasar a espera de aprobación.
5. Pulse **Marcar aprobada**. La orden pasa a **En reparación** si no tiene repuestos pendientes; de otro modo pasa a **Espera de repuestos**.
6. Use **Cotización formal PDF** u **Orden de servicio sin precios** para abrir una vista previa e imprimir o guardar con el diálogo del navegador.

![Cotización](../capturas_pantalla/cotizaciones.PNG)

## Repuestos, control final y entrega

1. En **Repuestos**, marque **Recibido** para cada material que haya llegado.
2. Abra **Control final**. Esta etapa queda bloqueada si falta recibir un repuesto o no hay mano de obra registrada.
3. Marque los conceptos de mano de obra verificados, o use **Marcar todos**.
4. Pulse **Registrar control final**. La orden cambia a **Lista para entrega**.
5. En el selector **Estado actual**, cambie a **Entregada** y confirme. Solo se permite desde **Lista para entrega**.
6. Si desmarca una verificación después de registrar el control, el prototipo anula dicho control y devuelve la orden a **En reparación**, salvo que ya esté entregada.

![Repuestos](../capturas_pantalla/repuestos.PNG)

## Consulta pública

La consulta pública está en `seguimiento.html` dentro de la publicación. Ingrese la placa y el código de una orden para ver su etapa. Por ejemplo, use `ABC-240` y `P4R148AX` de la orden demo OS-2026-00148.

## Reportes y auditoría

Estas opciones son visibles únicamente con el perfil **Administrador**.

1. Vuelva a `index.html` mediante **Cambiar perfil**.
2. Seleccione **Carlos Amaya · Administrador** e ingrese.
3. Abra **Reportes** para alternar entre el dashboard operativo y los reportes demostrativos.
4. Abra **Auditoría** para revisar los eventos registrados durante la demostración.

![Panel principal](../capturas_pantalla/panel01.PNG)
![Reportes](../capturas_pantalla/reportes.PNG)

## Limitaciones y reinicio

- No hay autenticación real: los dos perfiles son datos fijos de demostración y la contraseña no se comprueba.
- No existe backend, API, MySQL, correo ni sincronización entre dispositivos.
- Los datos, firmas e imágenes se almacenan solo en el `localStorage` del navegador actual. No use datos reales o sensibles.
- Las opciones PDF usan la impresión del navegador; no generan archivos en un servidor.
- La auditoría y los permisos son simulados y no constituyen controles de seguridad.
- Para reiniciar la demostración, use **Restablecer datos demo** desde el panel cuando esté disponible; alternativamente, elimine los datos del sitio en el navegador.
