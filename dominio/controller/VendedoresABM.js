import { Vendedor } from "../clases/vendedor.js";
import { Memoria } from "../memoria.js";
import { initNavBar } from './NavBar.js';
import { initClima } from './Clima.js';

let vendedores = [];

const marcarCampoVendedor = (id, esInvalido) => {
    let campo = document.getElementById(id);

    if (esInvalido) {
        campo.classList.add("campo-invalido");
    } else {
        campo.classList.remove("campo-invalido");
    }
};

const validarCamposVendedor = (marcarCamposVacios = false) => {
    let codigo = document.getElementById("codigo").value;
    let nombre = document.getElementById("nombre").value;
    let cedula = document.getElementById("cedula").value;
    let codigoInvalido = false;
    let nombreInvalido = false;
    let cedulaInvalida = false;

    if (codigo == "" && marcarCamposVacios) codigoInvalido = true;
    if (codigo != "" && (isNaN(codigo) || Number(codigo) <= 0)) codigoInvalido = true;
    if (nombre == "" && marcarCamposVacios) nombreInvalido = true;
    if (cedula == "" && marcarCamposVacios) cedulaInvalida = true;
    if (cedula != "" && (isNaN(cedula) || Number(cedula) <= 0)) cedulaInvalida = true;

    marcarCampoVendedor("codigo", codigoInvalido);
    marcarCampoVendedor("nombre", nombreInvalido);
    marcarCampoVendedor("cedula", cedulaInvalida);

    if (codigoInvalido || nombreInvalido || cedulaInvalida) {
        return false;
    }

    return true;
};

const limpiarMarcasVendedor = () => {
    marcarCampoVendedor("codigo", false);
    marcarCampoVendedor("nombre", false);
    marcarCampoVendedor("cedula", false);
};

const inicializarInterfazVendedor = () => {
    initNavBar();
    initClima();
};


//#region Metodos de Vendedores

const CargoDatosVendedor = () => {
    const LaMemoria = new Memoria();
    vendedores = LaMemoria.leer('vendedores');
    
    if (!vendedores) {
        vendedores = [];
    }

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
    }

    let unVendedor = new Vendedor(codigo, nombre, cedula);
    vendedores.push(unVendedor);

    const LaMemoria = new Memoria();
    LaMemoria.escribir('vendedores', vendedores);

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

    const LaMemoria = new Memoria();
    LaMemoria.escribir('vendedores', vendedores);

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

    for (let pos = 0; pos < vendedores.length; pos++) {
        if (vendedores[pos].codigo == codigoSeleccionado) {
            posicionVendedor = pos;
        }
    }

    if (posicionVendedor != -1) {
        vendedores.splice(posicionVendedor, 1);
    }

    const LaMemoria = new Memoria();
    LaMemoria.escribir('vendedores', vendedores);

    MostrarModal("Vendedor eliminado correctamente!");

    InicializarVendedor();
    ListarVendedores();
};


const LimpiarVendedor = () => {
    const LaMemoria = new Memoria();

    LaMemoria.escribir('vendedores', vendedores);

    MostrarModal("Cajas limpiadas correctamente!");

    InicializarVendedor();
};


//#endregion

document.getElementById("btnAgregarVendedor")
    .addEventListener("click", AgregarVendedor);

document.getElementById("btnModificarVendedor")
    .addEventListener("click", ModificarVendedor);

document.getElementById("btnEliminarVendedor")
    .addEventListener("click", EliminarVendedor);

document.getElementById("btnLimpiarVendedor")
    .addEventListener("click", LimpiarVendedor);

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
