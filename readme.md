# 🍎 FrutaManía — Sistema de Gestión para Verdulería

FrutaManía es una aplicación web desarrollada para administrar las operaciones principales de una verdulería. El sistema permite gestionar productos y vendedores, registrar ventas, controlar el stock y consultar estadísticas actualizadas a partir de la información almacenada.

El proyecto fue construido con HTML, CSS y JavaScript, utiliza módulos ES6 para organizar el código y guarda los datos en el navegador mediante LocalStorage. Además, incorpora Bootstrap para adaptar la interfaz a computadoras, tablets y dispositivos móviles.

## Funcionalidades principales

- ABM de productos, vendedores y ventas.
- Persistencia local de la información con LocalStorage.
- Control y actualización automática del stock.
- Cálculo automático del importe total de cada venta.
- Estadísticas de ventas actualizadas en tiempo real.
- Catálogo visual de productos con imágenes.
- Validación de campos, selecciones y stock disponible.
- Consumo de servicios externos mediante Fetch API.
- Mensajes y validaciones presentados mediante ventanas modales.
- Diseño moderno, accesible y responsive con Bootstrap 5.

## Estadísticas disponibles

La pantalla principal muestra automáticamente:

- Total recaudado por todas las ventas.
- Producto con mayor cantidad de unidades vendidas.
- Vendedor con mayor cantidad de ventas realizadas.
- Listado de productos que todavía tienen stock disponible.

## Módulos del sistema

### Catálogo de productos

- Agregar nuevos productos.
- Modificar productos existentes.
- Eliminar productos del catálogo.
- Registrar código, nombre, descripción, precio, stock e imagen.
- Visualizar los productos en una tabla con sus datos principales.
- Utilizar una imagen predeterminada cuando la imagen indicada no existe.

### Gestión de vendedores

- Registrar vendedores mediante código, nombre y cédula.
- Modificar y eliminar vendedores existentes.
- Llevar el conteo automático de las ventas realizadas por cada vendedor.

### Registro de ventas

- Agregar, modificar y eliminar ventas.
- Seleccionar un vendedor y un producto previamente registrados.
- Completar automáticamente el precio del producto seleccionado.
- Calcular el total según el precio y la cantidad ingresada.
- Verificar que exista stock suficiente antes de confirmar la operación.
- Descontar o devolver stock cuando una venta se agrega, modifica o elimina.
- Actualizar automáticamente las estadísticas de productos y vendedores.

## Tecnologías utilizadas

| Tecnología | Uso en el proyecto |
| **HTML5** | Estructura semántica de las páginas |
| **CSS** | Estilos personalizados y adaptación visual |
| **Bootstrap 5** | Componentes y diseño responsive |
| **JavaScript ES6+** | Lógica, eventos, validaciones y manipulación del DOM |
| **Módulos ES6** | Separación de clases, controladores y servicios |
| **LocalStorage** | Persistencia de datos en el navegador |
| **Fetch API** | Consumo de servicios externos |
| **Git y GitHub** | Control de versiones y alojamiento del código |

## Estructura del proyecto

Proyecto_Verduleria/
├── css/
│   └── estilo.css
├── dominio/
│   ├── clases/
│   │   ├── catalogo.js
│   │   ├── vendedor.js
│   │   └── ventas.js
│   ├── controller/
│   │   ├── CatalogoABM.js
│   │   ├── Clima.js
│   │   ├── Estadisticas.js
│   │   ├── IndexController.js
│   │   ├── modal.js
│   │   ├── NavBar.js
│   │   ├── VendedoresABM.js
│   │   └── VentasABM.js
│   ├── services/
│   │   └── climaApi.js
│   └── memoria.js
├── imagenes/
│   ├── banana.png
│   ├── fondo.png
│   ├── kiwi.png
│   ├── lechuga.png
│   ├── logo.png
│   ├── Logoverduleria.png
│   ├── manzana.png
│   ├── papas.png
│   ├── peras.png
│   ├── remolacha.png
│   ├── sandia.png
│   ├── sinlogo.png
│   ├── tomate.png
│   ├── zanahoria.png
│   └── zapallo.png
├── index.html
├── catalogo.html
├── vendedores.html
├── ventas.html
└── README.md

## Persistencia de datos

La aplicación guarda la información en LocalStorage utilizando las siguientes claves:

- catalogos: productos registrados, stock y unidades vendidas.
- vendedores: datos de los vendedores y cantidad de ventas realizadas.
- ventas: operaciones de venta registradas.

Los datos permanecen disponibles en el mismo navegador hasta que se elimine el almacenamiento local.

## Validaciones implementadas

- Campos obligatorios.
- Códigos y registros existentes.
- Selección válida de producto y vendedor.
- Valores numéricos para precio, cantidad y stock.
- Disponibilidad de stock antes de registrar o modificar una venta.
- Reposición correcta del stock al modificar o eliminar operaciones.

## Taller 2026

### Avances por semana

- **Semana 1:** reorganización del proyecto, clases JavaScript y módulos ES6.
- **Semana 2:** Bootstrap 5, CSS responsive, formularios, validaciones y delegación de eventos.
- **Semana 3:** Fetch, API pública del clima, `async/await`, LocalStorage y mejoras de usabilidad.
- **Semana 4:** prevención de XSS mediante creación segura de nodos, validación de datos, SEO básico y manejo de errores.
- **Semana 5:** corrección de relaciones entre ventas, productos y vendedores; revisión de accesibilidad y documentación.
- **Semana 6:** pruebas finales, publicación y preparación de la defensa.

### Problemas encontrados y soluciones

- Las ventas podían conservar referencias antiguas después de recargar la página. Se resolvió persistiendo códigos de catálogo y vendedor, y reconstruyendo las relaciones al cargar.
- El LocalStorage podía romper la aplicación si contenía JSON inválido. Ahora los datos corruptos se descartan de forma controlada.
- Se podía eliminar un producto o vendedor asociado a ventas. La aplicación ahora bloquea esa operación para preservar la integridad de los datos.
- Los mensajes modales no tenían semántica accesible. Se agregó rol de diálogo, descripción, cierre con Escape y foco inicial.

### Seguridad y accesibilidad

Los datos generados por usuarios se muestran usando `textContent`, `createElement` y `replaceChildren`, evitando insertar esos valores como HTML. Las imágenes del catálogo validan el nombre del archivo y utilizan una imagen alternativa si falla la carga. Los formularios poseen etiquetas asociadas, mensajes de error y estados `aria-invalid`.

### Funcionalidades pendientes

- Publicar la aplicación y agregar la URL definitiva.
- Incorporar filtros y búsqueda en los listados.
- Agregar gráficos de ventas y recaudación.
- Realizar pruebas manuales en navegadores y dispositivos móviles.

### Ejecución

La aplicación es estática y puede ejecutarse mediante un servidor local, por ejemplo la extensión Live Server de Visual Studio Code. Se recomienda abrir `index.html` a través de HTTP para que los módulos ES6 funcionen correctamente.

## Contacto

- **Email:** frutamania@gmail.com
- **Teléfono:** 099 123 456
- **Dirección:** Avenida Principal 1234, Rosario