import { Vendedor } from "../clases/vendedor.js";
import { estado, cargarEstado, guardarEstado } from "../globals.js";
import { initNavBar } from './NavBar.js';
import { initClima } from './Clima.js';

const { vendedores, ventas } = estado;

const marcarCampoVendedor = (id, mensaje = "") => {
    const campo = document.getElementById(id);
    const contenedor = campo.parentElement;

    let mensajeError = contenedor.querySelector(".mensaje-error");

    if (mensaje != "") {
        campo.classList.add("campo-invalido");
        campo.setAttribute("aria-invalid", "true");

        if (!mensajeError) {
            mensajeError = document.createElement("small");
            mensajeError.classList.add("mensaje-error");
            contenedor.appendChild(mensajeError);
        }

        mensajeError.textContent = mensaje;
    } else {
        campo.classList.remove("campo-invalido");
        campo.setAttribute("aria-invalid", "false");

        if (mensajeError) {
            mensajeError.remove();
        }
    }
};

const validarCamposVendedor = (marcarCamposVacios = false) => {
    const codigo = document.getElementById("codigo").value;
    const nombre = document.getElementById("nombre").value;
    const cedula = document.getElementById("cedula").value;

    let codigoInvalido = false;
    let nombreInvalido = false;
    let cedulaInvalida = false;

    // Validación del código
    if (codigo == "" && marcarCamposVacios) {
        codigoInvalido = true;
    }

    if (codigo != "" && (isNaN(codigo) || Number(codigo) <= 0)) {
        codigoInvalido = true;
    }

    // Validación del nombre
    if (nombre == "" && marcarCamposVacios) {
        nombreInvalido = true;
    }

    if (nombre != "" && /\d/.test(nombre)) {
        nombreInvalido = true;
    }

    // Validación de la cédula
    if (cedula == "" && marcarCamposVacios) {
        cedulaInvalida = true;
    }

    if (cedula != "" && (isNaN(cedula) || Number(cedula) <= 0)) {
        cedulaInvalida = true;
    }

    // Mostrar o quitar los mensajes
    marcarCampoVendedor(
        "codigo",
        codigoInvalido
            ? "El código debe ser un número."
            : ""
    );

    marcarCampoVendedor(
        "nombre",
        nombreInvalido
            ? nombre == ""
                ? "Debe escribir el nombre del vendedor."
                : "El nombre no puede contener números."
            : ""
    );

    marcarCampoVendedor(
        "cedula",
        cedulaInvalida
            ? "La cédula debe contener números sin guiones."
            : ""
    );

    // Devuelve false si algún campo es inválido
    if (codigoInvalido || nombreInvalido || cedulaInvalida) {
        return false;
    }

    return true;
};
const limpiarMarcasVendedor = () => {
    marcarCampoVendedor("codigo", "");
    marcarCampoVendedor("nombre", "");
    marcarCampoVendedor("cedula", "");
};

const inicializarInterfazVendedor = () => {
    initNavBar();
    initClima();
};


//#region Metodos de Vendedores

const CargoDatosVendedor = () => {
    cargarEstado();

    InicializarVendedor();
    ListarVendedores();
};


const AgregarVendedor = () => {
    if (!validarCamposVendedor(true)) {
        MostrarModal("Debe completar correctamente los datos del vendedor!");
        return;
    }

    // Leo los datos ingresados de las cajas de texto
    let codigo = document.getElementById("codigo").value;
    let nombre = document.getElementById("nombre").value;
    let cedula = document.getElementById("cedula").value;

    // Debemos agregar validacion para las cajas de texto que no vengan vacías
    if (cedula == "" || nombre == "" || codigo == "") {
        MostrarModal("Debe ingresar todos los campos para poder agregar el vendedor!");
        return;
    }

    for (let objVendedor of vendedores) {
        if (objVendedor.codigo == codigo) {
            MostrarModal("Ya existe un vendedor con ese código!");
            return;
        }

        if (objVendedor.nombre.trim().toLowerCase() == nombre.trim().toLowerCase()) {
            MostrarModal("Ya existe un vendedor con ese nombre!");
            return;
        }

        if (String(objVendedor.cedula).trim() == cedula.trim()) {
            MostrarModal("Ya existe un vendedor con esa cédula!");
            return;
        }
    }

    let unVendedor = new Vendedor(codigo, nombre, cedula);
    vendedores.push(unVendedor);

    guardarEstado();

    MostrarModal("Vendedor añadido correctamente!");

    InicializarVendedor();
    ListarVendedores();
};


const SeleccionarVendedor = () => {
    let codigoSeleccionado = document.getElementById('lista-vendedores').value;
    
    for (let objVendedor of vendedores) {
        if (objVendedor.codigo == codigoSeleccionado) {
            document.getElementById("codigo").value = objVendedor.codigo;
            document.getElementById("nombre").value = objVendedor.nombre;
            document.getElementById("cedula").value = objVendedor.cedula;
        }
    }
};


const ListarVendedores = () => {
    let lista = document.getElementById('lista-vendedores').options;
    lista.length = 0;

    for (let objVendedor of vendedores) {
        let texto = 'Codigo: ' + objVendedor.codigo + 
                    ' : Nombre: ' + objVendedor.nombre +
                    ' - Cedula: ' + objVendedor.cedula;

        let elemento = new Option(texto, objVendedor.codigo);
        lista.add(elemento);
    }
};


const InicializarVendedor = () => {
    
    // Luego de agregarlas al array, limpio las cajas de texto
    document.getElementById("codigo").value = "";
    document.getElementById("cedula").value = "";
    document.getElementById("nombre").value = "";
    limpiarMarcasVendedor();

    // Pongo el foco en la caja de texto codigo
    document.getElementById("codigo").focus();
};


const ModificarVendedor = () => {
    if (!validarCamposVendedor(true)) {
        MostrarModal("Debe completar correctamente los datos del vendedor!");
        return;
    }

    // Leo el codigo desde la linea seleccionada
    let codigoSeleccionado = document.getElementById("lista-vendedores").value;

    // Leo los datos ingresados de las cajas de texto
    let nombre = document.getElementById("nombre").value;
    let cedula = document.getElementById("cedula").value;

    // Debemos agregar validacion para las cajas de texto que no vengan vacías
    if (codigoSeleccionado == "" || nombre == "" || cedula == "") {
        MostrarModal("Debe ingresar todos los campos para modificar el vendedor!");
        return;
    }

    // Cargo el objeto vendedor desde la funcion buscar
    let unVendedor = BuscarVendedor(codigoSeleccionado);

    if (unVendedor == null) {
        MostrarModal("Debe seleccionar un vendedor válido!");
        return;
    }

    unVendedor.nombre = nombre;
    unVendedor.cedula = cedula;

    guardarEstado();

    MostrarModal("Vendedor modificado correctamente!");

    InicializarVendedor();
    ListarVendedores();
};


const BuscarVendedor = (pCodigo) => {
    for (let objVendedor of vendedores) {
        if (objVendedor.codigo == pCodigo) {
            return objVendedor;
        }
    }

    return null;
};


const EliminarVendedor = () => {
    // Leo el codigo desde la linea seleccionada
    let codigoSeleccionado = document.getElementById("lista-vendedores").value;
    let posicionVendedor = -1;

    // Debemos agregar validacion para las cajas de texto que no vengan vacías
    if (codigoSeleccionado == "") {
        MostrarModal("Debe seleccionar un Vendedor!");
        return;
    }

    for (let pos = 0; pos < ventas.length; pos++) {
        if (ventas[pos].vendedor.codigo == codigoSeleccionado) {
            MostrarModal("No se puede eliminar este vendedor porque tiene ventas registradas!");
            return;
        }
    }

    for (let pos = 0; pos < vendedores.length; pos++) {
        if (vendedores[pos].codigo == codigoSeleccionado) {
            posicionVendedor = pos;
        }
    }

    ConfirmarModal("Desea eliminar el vendedor seleccionado?", () => {
        if (posicionVendedor != -1) {
            vendedores.splice(posicionVendedor, 1);
        }

        guardarEstado();

        MostrarModal("Vendedor eliminado correctamente!");

        InicializarVendedor();
        ListarVendedores();
    });
};


const LimpiarVendedor = () => {
    guardarEstado();

    MostrarModal("Cajas limpiadas correctamente!");

    InicializarVendedor();
};


//#endregion

document.getElementById("botones-vendedores").addEventListener("click", (event) => {
    const acciones = {
        btnAgregarVendedor: AgregarVendedor,
        btnModificarVendedor: ModificarVendedor,
        btnEliminarVendedor: EliminarVendedor,
        btnLimpiarVendedor: LimpiarVendedor
    };

    acciones[event.target.id]?.();
});

document.getElementById("lista-vendedores")
    .addEventListener("change", SeleccionarVendedor);

document.getElementById("codigo")
    .addEventListener("input", () => validarCamposVendedor(false));

document.getElementById("nombre")
    .addEventListener("input", () => validarCamposVendedor(false));

document.getElementById("cedula")
    .addEventListener("input", () => validarCamposVendedor(false));

document.addEventListener('DOMContentLoaded', inicializarInterfazVendedor);

CargoDatosVendedor();
