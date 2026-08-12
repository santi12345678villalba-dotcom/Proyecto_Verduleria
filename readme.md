# 🍎 FrutaManía - Sistema de Gestión de Verdulería

---

## 📝 Descripción

**FrutaManía** es una aplicación web diseñada para la gestión integral de una verdulería. Permite administrar el catálogo de productos, gestionar vendedores, registrar ventas y visualizar estadísticas en tiempo real.

El sistema cuenta con un ABM completo (Alta, Baja, Modificación) para cada entidad, persistencia de datos mediante LocalStorage y una interfaz moderna y responsive.

---

## ✨ Características Principales

- ABM completo de productos, vendedores y ventas
- Persistencia de datos con LocalStorage
- Estadísticas en tiempo real (total recaudado, producto más vendido, mejor vendedor)
- Visualización de productos con imágenes
- Diseño responsive con Bootstrap
- Consumo de API para cotización de monedas
- Validaciones de stock y datos
- Interfaz accesible y fácil de usar
---

## 📁 Estructura del Proyecto

```
FrutaMania/
│
├── css/
│   └── estilo.css
│
├── dominio/
│   ├── clases/
│   │   ├── catalogo.js
│   │   ├── vendedor.js
│   │   └── ventas.js
│   │
│   ├── controller/
│   │   ├── CatalogoABM.js
│   │   ├── Estadisticas.js
│   │   ├── VendedoresABM.js
│   │   └── VentasABM.js
│   │
│   ├── globals.js
│   └── memoria.js
│
├── imagenes/
│   ├── logo.png
│   ├── Logoverduleria.png
│   └── sinlogo.png
│
├── index.html
├── catalogo.html
├── vendedores.html
├── ventas.html
│
└── README.md
```

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Descripción |
|------------|-------------|
| **HTML5** | Estructura del sitio |
| **CSS3** | Estilos personalizados |
| **Bootstrap 5** | Framework CSS responsive |
| **JavaScript ES6+** | Lógica de programación |
| **Módulos ES6** | Organización del código |
| **LocalStorage** | Persistencia de datos |
| **Fetch API** | Consumo de servicios externos |
| **GitHub** | Control de versiones |
| **Netlify** | Despliegue en producción |

---

## 📋 Funcionalidades

### Catálogo de Productos
- Agregar, modificar y eliminar productos
- Visualización en tabla con imágenes
- Validación de precios y stock

### Gestión de Vendedores
- Registrar, modificar y eliminar vendedores
- Seguimiento automático de ventas realizadas

### Registro de Ventas
- Registrar ventas con fecha automática
- Selección de vendedor y producto
- Cálculo automático del total
- Validación de stock disponible
- Actualización automática de stock y estadísticas

### Estadísticas
- Total recaudado
- Producto más vendido
- Mejor vendedor
- Listado de productos con stock disponible

---


## 📊 Estado del Proyecto

| Hito | Estado | Fecha |
|------|--------|-------|
| Estructura inicial | ✅ Completado | Semana 1 |
| Clases y LocalStorage | ✅ Completado | Semana 1 |
| Módulos ES6 | ✅ Completado | Semana 1 |
| Interfaz con Bootstrap | ✅ Completado | Semana 2 |
| Responsive Design | ✅ Completado | Semana 2 |
| Consumo de API | ✅ Completado | Semana 3 |
| Async/Await | ✅ Completado | Semana 3 |
| Accesibilidad | ✅ Completado | Semana 3 |
| Seguridad | ✅ Completado | Semana 4 |
| Publicación | ✅ Completado | Semana 4 |
| Defensa | ⏳ Pendiente | Semana 6 |

---

## 📬 Contacto

- 📧 **Email:** frutamania@gmail.com
- 📞 **Teléfono:** 099123456
- 🏢 **Dirección:** Rosario, Avenida Principal 1234
