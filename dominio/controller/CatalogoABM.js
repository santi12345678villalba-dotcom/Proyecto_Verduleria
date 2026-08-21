import { Catalogo } from "../clases/catalogo.js";
import { estado, cargarEstado, guardarEstado } from "../globals.js";
import { initNavBar } from './NavBar.js';
import { initClima } from './Clima.js';

const { catalogos, ventas } = estado;
const marcarCampo = (id, mensaje = "") => {
    const campo = document.getElementById(id);
    const contenedor = campo.parentElement;

    let mensajeError = contenedor.querySelector(".mensaje-error");

    if (mensaje != "") {
        // Esta línea agrega el recuadro rojo
        campo.classList.add("campo-invalido");
        campo.setAttribute("aria-invalid", "true");

        if (!mensajeError) {
            mensajeError = document.createElement("small");
            mensajeError.classList.add("mensaje-error");
            contenedor.appendChild(mensajeError);
        }

        mensajeError.textContent = mensaje;
    } else {
        // Esta línea quita el recuadro rojo
        campo.classList.remove("campo-invalido");
        campo.setAttribute("aria-invalid", "false");

        if (mensajeError) {
            mensajeError.remove();
        }
    }
};

const validarCamposCatalogo = (marcarCamposVacios = false) => {
    const codigo = document.getElementById("codigo").value;
    const nombre = document.getElementById("nombre").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const precio = document.getElementById("precio").value;
    const stock = document.getElementById("stock").value;
    const foto = document.getElementById("foto").value.trim();

    let codigoInvalido = false;
    let nombreInvalido = false;
    let descripcionInvalida = false;
    let precioInvalido = false;
    let stockInvalido = false;

    // Código
    if (codigo == "" && marcarCamposVacios) {
        codigoInvalido = true;
    }

    if (codigo != "" && (isNaN(codigo) || Number(codigo) <= 0)) {
        codigoInvalido = true;
    }

    // Nombre
    if (nombre == "" && marcarCamposVacios) {
        nombreInvalido = true;
    }

    if (nombre != "" && /\d/.test(nombre)) {
        nombreInvalido = true;
    }

    // Descripción
    if (descripcion == "" && marcarCamposVacios) {
        descripcionInvalida = true;
    }

    // Precio
    if (precio == "" && marcarCamposVacios) {
        precioInvalido = true;
    }

    if (precio != "" && (isNaN(precio) || Number(precio) <= 0)) {
        precioInvalido = true;
    }

    // Stock
    if (stock == "" && marcarCamposVacios) {
        stockInvalido = true;
    }

    if (stock != "" && (isNaN(stock) || Number(stock) < 0)) {
        stockInvalido = true;
    }

    // Mostrar o quitar los mensajes
    marcarCampo(
        "codigo",
        codigoInvalido
            ? "El código debe ser un número."
            : ""
    );

    marcarCampo(
        "nombre",
        nombreInvalido
            ? nombre == ""
                ? "Debe escribir el nombre del producto."
                : "El nombre no puede contener números."
            : ""
    );

    marcarCampo(
        "descripcion",
        descripcionInvalida
            ? "Debe escribir una descripción del producto."
            : ""
    );

    marcarCampo(
        "precio",
        precioInvalido
            ? "El precio debe ser un número."
            : ""
    );

    marcarCampo(
        "stock",
        stockInvalido
            ? "El stock debe ser un número"
            : ""
    );

    return !(
        codigoInvalido ||
        nombreInvalido ||
        descripcionInvalida ||
        precioInvalido ||
        stockInvalido
    );

};

const limpiarMarcasCatalogo = () => {
    const campos = [
        "codigo",
        "nombre",
        "descripcion",
        "precio",
        "stock",
        "foto"
    ];

    for (const campo of campos) {
        marcarCampo(campo, "");
    }
};

const inicializarInterfazCatalogo = () => {
    initNavBar();
    initClima();
};

//#region Metodos de catalogos

const CargoDatosCatalogos = () => {
    cargarEstado();

    InicializarCatalogo();
    ListarCatalogos();
    mostrarComoLista();
};


const ListarCatalogos = () => {
    let lista = document.getElementById('lista-catalogos').options;
    lista.length = 0;

    for (let objCatalogo of catalogos) {
        let texto = 'Codigo: ' + objCatalogo.codigo + 
                    ' : Nombre: ' + objCatalogo.nombre +
                    ' - Precio: ' + objCatalogo.precio + 
                    ' - Stock: ' + objCatalogo.stock;

        let elemento = new Option(texto, objCatalogo.codigo);
        lista.add(elemento);
    }
};


const mostrarComoLista = () => {
    const contenedor = document.getElementById("contenedorCatalogo");
    const tabla = document.createElement("table");
    tabla.classList.add("tabla-Catalgo");

    const encabezado = tabla.createTHead().insertRow();
    ["Foto", "Codigo", "Nombre", "Precio", "Stock"].forEach(texto => {
        const celda = document.createElement("th");
        celda.textContent = texto;
        encabezado.appendChild(celda);
    });

    const cuerpo = tabla.createTBody();
    for (const catalogo of catalogos) {
        const fila = cuerpo.insertRow();
        const celdaFoto = fila.insertCell();
        const imagen = document.createElement("img");
        imagen.classList.add("foto-lista");
        const nombreFotoValido = /^[\w.-]+\.(png|jpe?g|gif|webp)$/i.test(catalogo.foto || "");
        imagen.src = nombreFotoValido ? `imagenes/${catalogo.foto}` : "imagenes/sinlogo.png";
        imagen.alt = "Foto de catalogo";
        imagen.onerror = () => {
            imagen.src = "imagenes/sinlogo.png";
        };
        celdaFoto.appendChild(imagen);

        [catalogo.codigo, catalogo.nombre, catalogo.precio, catalogo.stock]
            .forEach(valor => {
                const celda = fila.insertCell();
                celda.textContent = valor;
            });
    }

    contenedor.replaceChildren(tabla);
};


const InicializarCatalogo = () => {
    
    // Luego de agregarlas al array, limpio las cajas de texto
    document.getElementById("foto").value = "";
    document.getElementById("codigo").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";

     // Quito los bordes rojos y mensajes de error
     limpiarMarcasCatalogo();

    // Pongo el foco en la caja de texto codigo
    document.getElementById("codigo").focus();
};


const AgregarCatalogo = () => {
    if (!validarCamposCatalogo(true)) {
        MostrarModal("Código, precio y stock deben tener valores numéricos válidos!");
        return;
    }

    // Leo los datos ingresados de las cajas de texto
    let foto = document.getElementById("foto").value;
    let codigo = document.getElementById("codigo").value;
    let nombre = document.getElementById("nombre").value;
    let descripcion = document.getElementById("descripcion").value;
    let precio = parseInt(document.getElementById("precio").value);
    let stock = parseInt(document.getElementById("stock").value);

    // Validación de campos vacíos
    if (codigo == "" || nombre == "" || descripcion == "") {
        MostrarModal("Debe ingresar todos los campos para poder agregar el catalogo!");
        return;
    }

    for (let objCatalogo of catalogos) {
        if (objCatalogo.codigo == codigo) {
            MostrarModal("Ya existe un catálogo con ese código!");
            return;
        }

        if (objCatalogo.nombre.trim().toLowerCase() == nombre.trim().toLowerCase()) {
            MostrarModal("Ya existe un catálogo con ese nombre!");
            return;
        }
    }

    // Validación de números
    if (isNaN(precio) || isNaN(stock)) {
        MostrarModal("Los valores ingresados no son correctos!");
        return;
    }

    if (precio <= 0 || stock < 0) {
        MostrarModal("El precio debe ser mayor a 0 y el stock no puede ser negativo!");
        return;
    }

    let unCatalogo = new Catalogo(
        foto,
        codigo,
        nombre,
        descripcion,
        precio,
        stock
    );

    catalogos.push(unCatalogo);

    guardarEstado();

    MostrarModal("Catalogo añadido correctamente!");

    InicializarCatalogo();
    ListarCatalogos();
    mostrarComoLista();
};


const SeleccionarCatalogo = () => {
    let codigoSeleccionado = document.getElementById('lista-catalogos').value;
   
    for (let objCatalogo of catalogos) {
        if (objCatalogo.codigo == codigoSeleccionado) {
            document.getElementById("foto").value = objCatalogo.foto;
            document.getElementById("codigo").value = objCatalogo.codigo;
            document.getElementById("nombre").value = objCatalogo.nombre;
            document.getElementById("descripcion").value = objCatalogo.descripcion;
            document.getElementById("precio").value = objCatalogo.precio;
            document.getElementById("stock").value = objCatalogo.stock;
        }
    }
};


const ModificarCatalogo = () => {
    if (!validarCamposCatalogo(true)) {
        MostrarModal("Código, precio y stock deben tener valores numéricos válidos!");
        return;
    }

    // Leo el codigo desde la linea seleccionada
    let codigoSeleccionado = document.getElementById("lista-catalogos").value;

    // Leo los datos ingresados de las cajas de texto
    let foto = document.getElementById("foto").value;
    let nombre = document.getElementById("nombre").value;
    let descripcion = document.getElementById("descripcion").value;
    let precio = parseInt(document.getElementById("precio").value);
    let stock = parseInt(document.getElementById("stock").value);

    // Validación de campos vacíos
    if (codigoSeleccionado == "" || nombre == "" || descripcion == "") {
        MostrarModal("Debe ingresar todos los campos para modificar el catalogo!");
        return;
    }

    // Validación de números
    if (isNaN(precio) || isNaN(stock)) {
        MostrarModal("Los valores ingresados no son correctos!");
        return;
    }

    if (precio <= 0 || stock < 0) {
        MostrarModal("El precio debe ser mayor a 0 y el stock no puede ser negativo!");
        return;
    }

    // Busco el catálogo
    let unCatalogo = BuscarCatalogo(codigoSeleccionado);

    if (unCatalogo == null) {
        MostrarModal("Debe seleccionar un catálogo válido!");
        return;
    }

    unCatalogo.foto = foto;
    unCatalogo.nombre = nombre;
    unCatalogo.descripcion = descripcion;
    unCatalogo.precio = precio;
    unCatalogo.stock = stock;

    guardarEstado();

    MostrarModal("Catalogo modificado correctamente!");

    InicializarCatalogo();
    ListarCatalogos();
    mostrarComoLista();
};


const BuscarCatalogo = (pCodigo) => {
    for (let objCatalogo of catalogos) {
        if (objCatalogo.codigo == pCodigo) {
            return objCatalogo;
        }
    }

    return null;
};


const EliminarCatalogo = () => {
    // Leo el codigo desde la linea seleccionada
    let codigoSeleccionado = document.getElementById("lista-catalogos").value;
    let posicionCatalogo = -1;

    // Validación
    if (codigoSeleccionado == "") {
        MostrarModal("Debe seleccionar un catalogo!");
        return;
    }

    for (let pos = 0; pos < ventas.length; pos++) {
        if (ventas[pos].catalogo.codigo == codigoSeleccionado) {
            MostrarModal("No se puede eliminar este catalogo porque tiene ventas registradas!");
            return;
        }
    }

    

    for (let pos = 0; pos < catalogos.length; pos++) {
        if (catalogos[pos].codigo == codigoSeleccionado) {
            posicionCatalogo = pos;
        }
    }

    ConfirmarModal("Desea eliminar el catalogo seleccionado?", () => {
        if (posicionCatalogo != -1) {
            catalogos.splice(posicionCatalogo, 1);
        }

        guardarEstado();

        MostrarModal("Catalogo eliminado correctamente!");

        InicializarCatalogo();
        ListarCatalogos();
        mostrarComoLista();
    });
};


const LimpiarCatalogo = () => {
    guardarEstado();

    MostrarModal("Cajas limpiadas correctamente!");

    InicializarCatalogo();
};

//#endregion

document
    .getElementById("codigo")
    .addEventListener("input", () => validarCamposCatalogo(false));

document
    .getElementById("nombre")
    .addEventListener("input", () => validarCamposCatalogo(false));

document
    .getElementById("descripcion")
    .addEventListener("input", () => validarCamposCatalogo(false));

document
    .getElementById("precio")
    .addEventListener("input", () => validarCamposCatalogo(false));

document
    .getElementById("stock")
    .addEventListener("input", () => validarCamposCatalogo(false));

document
    .getElementById("foto")
    .addEventListener("input", () => validarCamposCatalogo(false));

document.getElementById("botones-catalogo").addEventListener("click", (event) => {
    const acciones = {
        btnAgregarCatalogo: AgregarCatalogo,
        btnModificarCatalogo: ModificarCatalogo,
        btnEliminarCatalogo: EliminarCatalogo,
        btnLimpiarCatalogo: LimpiarCatalogo
    };

    acciones[event.target.id]?.();
});

document
    .getElementById("lista-catalogos")
    .addEventListener("change", SeleccionarCatalogo);

document.addEventListener('DOMContentLoaded', inicializarInterfazCatalogo);

CargoDatosCatalogos();