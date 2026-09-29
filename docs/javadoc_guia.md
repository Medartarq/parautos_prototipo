# Guía de Javadoc

## Aplicación al repositorio

El prototipo de `documentos/prototipo` está escrito en HTML, CSS y JavaScript, por lo que Javadoc no se genera para sus archivos. Esta guía está preparada para documentar el código Java de la aplicación Spring Boot existente en `src/main/java`, sin modificar su código fuente.

Los paquetes actuales incluyen `api`, `config`, `dominio`, `repo`, `service` y `servicio` bajo `com.parautos.app`.

## Plantillas

Documente clases públicas, servicios, controladores y métodos cuya intención, reglas o efectos no sean evidentes. Mantenga el texto en español, describa el contrato y no repita el nombre del elemento.

### Clase o servicio

```java
/**
 * Gestiona las operaciones de negocio relacionadas con las órdenes de servicio.
 *
 * <p>Centraliza las validaciones y coordinaciones requeridas antes de persistir
 * cambios en una orden.</p>
 *
 * @author Equipo PARAUTOS
 * @since 1.0
 */
public class OrdenService {
}
```

### Método con parámetros y retorno

```java
/**
 * Obtiene la orden identificada por su id.
 *
 * @param id identificador persistente de la orden
 * @return la orden encontrada
 * @throws EntidadNoEncontradaException si no existe una orden con el id indicado
 */
public Orden obtenerPorId(Long id) {
    // Implementación existente.
}
```

### Método que cambia estado

```java
/**
 * Cambia el estado de una orden después de validar la transición solicitada.
 *
 * @param id identificador de la orden que se actualizará
 * @param nuevoEstado estado de destino solicitado
 * @return la orden actualizada
 * @throws IllegalStateException si la transición no está permitida
 */
public Orden cambiarEstado(Long id, EstadoOrden nuevoEstado) {
    // Implementación existente.
}
```

### Campo o constante

```java
/** Número máximo de evidencias permitidas por orden. */
private static final int MAX_EVIDENCIAS = 15;
```

## Etiquetas recomendadas

- `@param`: significado, unidad o formato esperado de cada parámetro.
- `@return`: valor devuelto y condiciones relevantes, no solo "resultado".
- `@throws`: excepción y condición que la provoca.
- `@since`: versión en la que se incorporó la API.
- `@deprecated`: alternativa y versión prevista de retiro, cuando corresponda.
- `{@link Tipo#metodo(...)}`: enlace a clases o métodos relacionados.

Evite documentar getters, setters o repositorios derivados de Spring Data si su comportamiento no añade reglas, restricciones o efectos propios.

## Generar documentación con Maven

El `pom.xml` actual no declara el plugin de Javadoc. Sin editar el proyecto se puede intentar invocarlo por coordenadas completas desde la raíz del repositorio:

```powershell
./mvnw org.apache.maven.plugins:maven-javadoc-plugin:3.11.2:javadoc
```

Si no existe Maven Wrapper, use Maven instalado:

```powershell
mvn org.apache.maven.plugins:maven-javadoc-plugin:3.11.2:javadoc
```

El resultado esperado queda en `target/site/apidocs/index.html`. Para generar también Javadoc de pruebas, ejecute:

```powershell
./mvnw org.apache.maven.plugins:maven-javadoc-plugin:3.11.2:test-javadoc
```

## Consideraciones de versión

El `pom.xml` declara Java 26 y compilación con release/target 21. Genere la documentación con un JDK compatible con la compilación configurada, preferentemente JDK 21 o el JDK que use el equipo para construir el proyecto. Si Maven reporta errores de doclint en comentarios heredados, corríjalos en el Javadoc o ejecute la generación con la configuración de doclint acordada por el equipo; no silencie errores sin revisarlos.

## Validación sugerida

1. Ejecute `mvn test` para confirmar que el proyecto compila y las pruebas pasan antes de documentar.
2. Añada Javadoc solo a APIs públicas o lógica de negocio que requiera contexto.
3. Ejecute el comando `javadoc` anterior.
4. Abra `target/site/apidocs/index.html` y compruebe enlaces, paquetes y texto de parámetros/excepciones.
5. Incluya `target/` en `.gitignore`; la documentación generada normalmente no se versiona salvo que el equipo lo acuerde.
