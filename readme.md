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

### Tecnologías utilizadas

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

## Integrantes del Grupo:
-César Vilegas
-Santiago Villalba 