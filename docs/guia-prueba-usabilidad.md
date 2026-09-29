# Guía de prueba de usabilidad - PARAUTOS

## 1. Propósito

Evaluar si las pantallas críticas del prototipo de PARAUTOS pueden ser utilizadas por usuarios representativos para registrar una recepción, gestionar una cotización y consultar información de control. La prueba identifica problemas de interacción antes de implementar la versión integrada con backend.

Esta guía evalúa el prototipo estático ubicado en `documentos/prototipo/`. Sus resultados no validan autenticación real, permisos de servidor, persistencia MySQL ni integraciones externas.

## 2. Alcance

| Incluido | Excluido |
|---|---|
| Inicio de sesión demostrativo, navegación por rol, nueva orden, checklist, daños, cotización, repuestos, reportes y auditoría visual. | Autenticación real, autorización en backend, envío de correos, archivos reales, integración con aseguradoras, datos productivos y tiempos de red. |

## 3. Participantes

Se requiere un mínimo de tres participantes. Se recomienda aplicar las sesiones individualmente y registrar datos sin exponer información personal innecesaria.

| Código | Perfil esperado | Relación con el proceso | Sesión | Resultado |
|---|---|---|---|---|
| P01 | Asesor o persona con experiencia en atención | Registra o comprende una recepción vehicular. | Pendiente | Pendiente |
| P02 | Administrador o encargado de control | Revisa pendientes, reportes o registros. | Pendiente | Pendiente |
| P03 | Usuario externo o cliente potencial | Puede realizar una consulta simple de estado. | Pendiente | Pendiente |

No se usará el nombre completo de los participantes en el informe. El código es suficiente para preservar la evidencia y la confidencialidad.

## 4. Consentimiento breve

Leer al participante antes de iniciar:

> Esta actividad evalúa el prototipo, no sus habilidades. La sesión dura aproximadamente 15 a 20 minutos. Se registrarán las tareas realizadas, el tiempo aproximado, errores observados y comentarios sobre la pantalla. Puede detenerse en cualquier momento. Los resultados se usarán únicamente para mejorar el proyecto académico de PARAUTOS y se reportarán de forma anónima.

| Participante | Fecha | Acepta participar | Firma o conformidad verbal |
|---|---|---|---|
| P__ | __/__/2026 | Sí / No | ________________________ |

## 5. Materiales y preparación

1. Publicar el contenido de `documentos/prototipo/` en GitHub Pages o abrirlo desde un servidor estático local.
2. Usar Chrome o Edge actualizado; realizar al menos una sesión en teléfono Android si está disponible.
3. Borrar datos previos del prototipo o usar una ventana privada antes de cada sesión para evitar que los datos de una persona afecten a otra.
4. Tener disponible una hoja de registro, cronómetro y, si el participante acepta, capturas no identificables de los hallazgos.
5. No mostrar las instrucciones de operación salvo que correspondan al guion de ayuda indicado en esta guía.

## 6. Roles de prueba y credenciales demostrativas

| Rol | Usuario | Uso durante la prueba |
|---|---|---|
| Administrador | `camaya` | Reportes, auditoría y operación general. |
| Asesor | `crcavero` | Operación diaria sin Reportes ni Auditoría. |

Las credenciales son únicamente demostrativas. No representan cuentas reales ni deben reutilizarse en un entorno productivo.

## 7. Protocolo del moderador

1. Dar la bienvenida, leer el consentimiento y solicitar conformidad.
2. Explicar que se debe pensar en voz alta: indicar qué espera encontrar, qué resulta claro y qué produce duda.
3. Entregar una tarea a la vez, sin anticipar los controles o pasos.
4. Iniciar el cronómetro al terminar de leer la tarea y detenerlo al alcanzar el criterio de éxito, abandonar o superar cinco minutos.
5. Registrar errores, dudas, retrocesos y comentarios textuales relevantes.
6. Si la persona queda bloqueada, brindar una ayuda mínima y registrarla como asistencia. No completar la tarea por el participante.
7. Al finalizar, aplicar las preguntas de salida y agradecer su participación.

## 8. Escala de resultados

| Resultado | Definición |
|---|---|
| Completada sin ayuda | Cumple el criterio sin orientación del moderador. |
| Completada con ayuda | Cumple el criterio después de una orientación mínima. |
| No completada | Abandona, no alcanza el criterio o supera cinco minutos. |

| Severidad | Criterio de clasificación |
|---:|---|
| 1 - Baja | Molestia menor; no impide completar la tarea. |
| 2 - Media | Genera demora o confusión repetida; existe alternativa para completar. |
| 3 - Alta | Impide completar una tarea crítica o puede causar registro incorrecto. |

## 9. Tareas de prueba

### Tarea 1. Registrar una recepción básica

**Perfil:** P01, con rol Asesor.  
**Escenario:** Un cliente ingresa un vehículo para evaluación. Debe crear la orden y dejar registrada la recepción inicial.  
**Instrucción al participante:**

> Inicie sesión como asesor. Registre una nueva orden para un vehículo de prueba, complete los datos obligatorios, revise el checklist, marque al menos un daño visible, agregue una observación y avance hasta la aceptación de la recepción.

**Criterio de éxito:** la orden muestra datos del vehículo, checklist registrado, al menos un daño u observación y el participante comprende dónde se confirma la recepción.  
**Datos de prueba sugeridos:** placa `TST-101`, cliente `Cliente Prueba`, teléfono `900000001`.  
**Métricas:** tiempo, resultado, ayudas, errores, confusiones y comentario espontáneo.

| Participante | Tiempo | Resultado | Ayuda | Errores o hallazgos | Severidad |
|---|---:|---|---|---|---:|
| P01 | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |

### Tarea 2. Registrar cotización y repuesto pendiente

**Perfil:** P01 o P02, con rol Asesor.  
**Escenario:** La orden requiere una actividad de mano de obra y un repuesto que aún no ha sido recibido.  
**Instrucción al participante:**

> Abra la orden creada o una orden de demostración. Registre una línea de mano de obra, un repuesto y deje el repuesto en condición pendiente. Después, identifique dónde puede revisar o modificar el estado de la cotización.

**Criterio de éxito:** existe al menos una línea de mano de obra, un repuesto y el participante localiza el estado de la cotización o del abastecimiento.  
**Métricas:** tiempo, uso de teclado o táctil, errores de navegación, comprensión de los estados y comentario espontáneo.

| Participante | Tiempo | Resultado | Ayuda | Errores o hallazgos | Severidad |
|---|---:|---|---|---|---:|
| P01/P02 | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |

### Tarea 3. Consultar pendientes o seguimiento

**Perfil:** P02 como Administrador y P03 como Cliente potencial.  
**Escenario administrador:** se necesita identificar una cotización pendiente y consultar el registro de auditoría relacionado.  
**Instrucción al participante administrador:**

> Inicie sesión como administrador. Localice una cotización pendiente usando los filtros de Reportes y, después, encuentre una acción relacionada en Auditoría.

**Criterio de éxito administrador:** localiza un pendiente y utiliza al menos un filtro en Reportes o Auditoría.

**Escenario cliente:** desea conocer el avance de su vehículo sin llamar al taller.  
**Instrucción al participante cliente:**

> Desde la pantalla de seguimiento, ingrese la placa y el código de consulta entregados por el moderador. Indique cuál es el estado mostrado y qué haría si necesitara más información.

**Criterio de éxito cliente:** comprende cómo realizar la consulta y reconoce el estado presentado.

| Participante | Variante | Tiempo | Resultado | Ayuda | Hallazgos | Severidad |
|---|---|---:|---|---|---|---:|
| P02 | Administrador | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| P03 | Cliente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |

## 10. Preguntas de salida

Aplicar estas preguntas después de las tareas:

1. ¿Qué parte fue más clara y por qué?
2. ¿En qué momento dudó sobre qué debía hacer?
3. ¿Qué etiqueta, botón o mensaje cambiaría?
4. ¿Considera que podría usar esta pantalla durante una atención real? ¿Por qué?
5. En una escala de 1 a 5, ¿qué tan fácil fue completar las tareas?

| Participante | Facilidad (1-5) | Comentario principal | Cambio sugerido |
|---|---:|---|---|
| P__ | Pendiente | Pendiente | Pendiente |

## 11. Consolidación de hallazgos

Registrar una fila por problema distinto. Un hallazgo se considera recurrente si aparece en dos o más participantes.

| ID | Pantalla/tarea | Hallazgo observado | Participantes | Severidad | Cambio propuesto | Estado |
|---|---|---|---|---:|---|---|
| HU01 | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |

## 12. Informe de resultados para APF2

Cuando se completen las sesiones, añadir al Anexo G del informe APF2:

1. Número de participantes, perfiles y dispositivo usado.
2. Tabla consolidada de éxito por tarea y tiempos observados.
3. Tres a cinco hallazgos principales con severidad.
4. Capturas o fotografías autorizadas, sin datos personales expuestos.
5. Cambios aplicados al prototipo, indicando antes y después.
6. Riesgos o limitaciones: tamaño de muestra, prototipo estático, datos simulados y ausencia de backend.

## 13. Criterio de cierre

La evidencia de usabilidad queda lista cuando existen tres consentimientos o conformidades, registros de las tareas, hallazgos clasificados, al menos un cambio justificado por hallazgo y un resumen insertado en el Anexo G. Si no se alcanzan tres participantes, el informe debe declarar el número real de sesiones y no extrapolar conclusiones.
