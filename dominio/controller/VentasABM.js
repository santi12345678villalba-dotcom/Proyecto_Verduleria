import { Ventas } from "../clases/ventas.js";
import { estado, cargarEstado, guardarEstado } from "../globals.js";
import { initNavBar } from './NavBar.js';
import { initClima } from './Clima.js';

const { ventas, catalogos, vendedores } = estado;

const marcarCampoVenta = (id, mensaje = "") => {
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
const validarCamposVenta = (marcarCamposVacios = false) => {
    const codigo = document.getElementById("codigo").value;
    const fecha = document.getElementById("fecha").value;
    const vendedor = document.getElementById("codigo-vendedor").value;
    const catalogo = document.getElementById("codigo-catalogo").value;
    const cantidad = document.getElementById("cantidad").value;

    let codigoInvalido = false;
    let fechaInvalida = false;
    let vendedorInvalido = false;
    let catalogoInvalido = false;
    let cantidadInvalida = false;

    if (codigo == "" && marcarCamposVacios) {
        codigoInvalido = true;
    }

    if (codigo != "" && (isNaN(codigo) || Number(codigo) <= 0)) {
        codigoInvalido = true;
    }

    if (fecha == "" && marcarCamposVacios) {
        fechaInvalida = true;
    }

    if (fecha != "" && isNaN(Date.parse(fecha))) {
        fechaInvalida = true;
    }

    if (vendedor == "" && marcarCamposVacios) {
        vendedorInvalido = true;
    }

    if (catalogo == "" && marcarCamposVacios) {
        catalogoInvalido = true;
    }

    if (cantidad == "" && marcarCamposVacios) {
        cantidadInvalida = true;
    }

    if (cantidad != "" && (isNaN(cantidad) || Number(cantidad) <= 0)) {
        cantidadInvalida = true;
    }

    marcarCampoVenta(
        "codigo",
        codigoInvalido
            ? "El código debe ser un número."
            : ""
    );

    marcarCampoVenta(
        "fecha",
        fechaInvalida
            ? "Debe seleccionar una fecha válida."
            : ""
    );

    marcarCampoVenta(
        "codigo-vendedor",
        vendedorInvalido
            ? "Debe seleccionar un vendedor."
            : ""
    );

    marcarCampoVenta(
        "codigo-catalogo",
        catalogoInvalido
            ? "Debe seleccionar un producto del catálogo."
            : ""
    );

    marcarCampoVenta(
        "cantidad",
        cantidadInvalida
            ? "La cantidad debe ser un número mayor que 0 y no puede contener letras."
            : ""
    );

    return !(
        codigoInvalido ||
        fechaInvalida ||
        vendedorInvalido ||
        catalogoInvalido ||
        cantidadInvalida
    );
};

const limpiarMarcasVenta = () => {
    const campos = [
        "codigo",
        "fecha",
        "codigo-vendedor",
        "codigo-catalogo",
        "cantidad"
    ];

    for (const campo of campos) {
        marcarCampoVenta(campo, "");
    }
};
const inicializarInterfazVentas = () => {
    initNavBar();
    initClima();
};


//#region Metodos de Ventas

const CargoDatosVentas = () => {
    cargarEstado();

    InicializarVenta();
    CargarVendedores();
    CargarDatosCatalogos();
    ListarVentas();
};


const CargarVendedores = () => {
    let lista = document.getElementById('codigo-vendedor').options;
    lista.length = 0;

    let elementoBase = new Option("Seleccione un vendedor", "");
    lista.add(elementoBase);

    for (let objVendedor of vendedores) {
        let elemento = new Option(
            objVendedor.nombre,
            objVendedor.codigo
        );

        lista.add(elemento);
    }
};


const CargarDatosCatalogos = () => {
    let lista = document.getElementById('codigo-catalogo').options;
    lista.length = 0;

    let elementoBase = new Option(
        "Seleccione algo del catalogo",
        ""
    );

    lista.add(elementoBase);

    for (let objCatalogo of catalogos) {
        let elemento = new Option(
            objCatalogo.nombre,
            objCatalogo.codigo
        );

        lista.add(elemento);
    }
};


const CargarPrecioCatalogo = () => {
    document.getElementById('precio-catalogo').value = "";

    let codigoCatalogo = document.getElementById('codigo-catalogo').value;

    for (let objCatalogo of catalogos) {
        if (objCatalogo.codigo == codigoCatalogo) {
            document.getElementById('precio-catalogo').value =
                objCatalogo.precio;
        }
    }
};


const ActualizarStock = (pcodigoCatalogo, pCantidad) => {
    for (const unCatalogo of catalogos) {
        if (unCatalogo.codigo == pcodigoCatalogo) {
            unCatalogo.stock = unCatalogo.stock - pCantidad;
        }
    }
};


const DevolverStock = (pcodigoCatalogo, pCantidad) => {
    for (const unCatalogo of catalogos) {
        if (unCatalogo.codigo == pcodigoCatalogo) {
            unCatalogo.stock = unCatalogo.stock + pCantidad;
        }
    }
};


const ActualizarCantidadVendidos = (pcodigoCatalogo, pCantidad) => {
    for (const unCatalogo of catalogos) {
        if (unCatalogo.codigo == pcodigoCatalogo) {

            if (!unCatalogo.cantVendidos) {
                unCatalogo.cantVendidos = 0;
            }

            unCatalogo.cantVendidos += pCantidad;
        }
    }
};


const DevolverCantidadVendidos = (pcodigoCatalogo, pCantidad) => {
    for (const unCatalogo of catalogos) {
        if (unCatalogo.codigo == pcodigoCatalogo) {

            if (!unCatalogo.cantVendidos) {
                unCatalogo.cantVendidos = 0;
            }

            unCatalogo.cantVendidos =
                unCatalogo.cantVendidos - pCantidad;
        }
    }
};


const ActualizarCantidadVentas = (pCodigoVendedor) => {
    for (const unVendedor of vendedores) {
        if (unVendedor.codigo == pCodigoVendedor) {

            if (!unVendedor.cantVentas) {
                unVendedor.cantVentas = 0;
            }

            unVendedor.cantVentas += 1;
        }
    }
};


const DevolverCantidadVentas = (pCodigoVendedor) => {
    for (const unVendedor of vendedores) {
        if (unVendedor.codigo == pCodigoVendedor) {

            if (!unVendedor.cantVentas) {
                unVendedor.cantVentas = 0;
            }

            unVendedor.cantVentas -= 1;
        }
    }
};


const CalculoTotal = () => {
    const precio = Number(document.getElementById('precio-catalogo').value || 0);
    const cantidad = Number(document.getElementById('cantidad').value || 0);

    if (cantidad > 0 && precio > 0) {
        document.getElementById('total').value = (precio * cantidad).toString();
        return;
    }

    document.getElementById('total').value = "";
};


const ListarVentas = () => {
    let lista = document.getElementById('lista-ventas').options;
    lista.length = 0;

    for (let objVenta of ventas) {

        console.log(objVenta);
        console.log("catalogo:", objVenta.catalogo);
        console.log("vendedor:", objVenta.vendedor);

        if (!objVenta.catalogo || !objVenta.vendedor) {
            continue;
        }

        let texto = 'Codigo: ' + objVenta.codigo +
            ' - Fecha: ' + objVenta.fecha +
            ' - Nombre: ' + objVenta.vendedor.nombre +
            ' - Catalogo: ' + objVenta.catalogo.codigo +
            ' - Total: ' + objVenta.total +
            ' - Cantidad: ' + objVenta.cantidad;

        let elemento = new Option(
            texto,
            objVenta.codigo
        );

        lista.add(elemento);
    }
};


const InicializarVenta = () => {

    let hoy = new Date();

    console.log("HOY", hoy);

    let anio = hoy.getFullYear();

    let mes = "" + (hoy.getMonth() + 1);
    mes = (mes.length == 1) ? "0" + mes : mes;

    let dia = "" + hoy.getDate();
    dia = (dia.length == 1) ? "0" + dia : dia;

    let fecha = anio + "-" + mes + "-" + dia;

    console.log("FECHA", fecha);

    // Luego de agregarlas al array, limpio las cajas de texto
    document.getElementById("codigo").value = "";
    document.getElementById("fecha").value = fecha;
    document.getElementById("codigo-vendedor").value = "";
    document.getElementById("codigo-catalogo").value = "";
    document.getElementById("precio-catalogo").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("total").value = "";

    limpiarMarcasVenta();

    // Pongo el foco en la caja de texto codigo
    document.getElementById("codigo").focus();
};


const BuscarCatalogo = (pCodigo) => {
    for (let objCatalogo of catalogos) {
        if (objCatalogo.codigo == pCodigo) {
            return objCatalogo;
        }
    }

    return null;
};


const BuscarVendedor = (pCodigo) => {
    for (let objVendedor of vendedores) {
        if (objVendedor.codigo == pCodigo) {
            return objVendedor;
        }
    }

    return null;
};


const AgregarVenta = () => {
    if (!validarCamposVenta(true)) {
        MostrarModal("Debe completar correctamente los campos de la venta!");
        return;
    }

    // Leo los datos ingresados de las cajas de texto
    let codigo = document.getElementById("codigo").value;
    let fecha = document.getElementById("fecha").value;
    let codigoVendedor = document.getElementById("codigo-vendedor").value;
    let codigoCatalogo = document.getElementById("codigo-catalogo").value;
    let cantidad = parseInt(
        document.getElementById("cantidad").value
    );
    let total = parseFloat(
        document.getElementById("total").value
    );

    if (cantidad <= 0) {
        MostrarModal("La cantidad debe ser mayor a 0!");
        return;
    }

    for (const unCatalogo of catalogos) {
        if (unCatalogo.codigo == codigoCatalogo) {

            if (cantidad > unCatalogo.stock) {
                MostrarModal(
                    "La cantidad ingresada excede el stock disponible!, quedan " +
                    unCatalogo.stock +
                    " unidades en stock de " +
                    unCatalogo.nombre
                );

                return;
            }
        }
    }

    // Validación de campos vacíos
    if (
        codigo == "" ||
        fecha == "" ||
        codigoVendedor == "" ||
        codigoCatalogo == ""
    ) {
        MostrarModal("Debe ingresar todos los campos!");
        return;
    }

    for (let objVenta of ventas) {
        if (objVenta.codigo == codigo) {
            MostrarModal("Ya existe una venta con ese código!");
            return;
        }

    }

    if (isNaN(cantidad) || isNaN(total)) {
        MostrarModal("Los valores ingresados no son correctos!");
        return;
    }

    let unCatalogo = BuscarCatalogo(codigoCatalogo);
    let unVendedor = BuscarVendedor(codigoVendedor);

    if (unCatalogo == null || unVendedor == null) {
        MostrarModal("Debe seleccionar un catálogo y un vendedor válidos!");
        return;
    }

    let unaVenta = new Ventas(
        codigo,
        fecha,
        unCatalogo,
        unVendedor,
        cantidad,
        total
    );

    ventas.push(unaVenta);

    // Actualizamos stock y estadísticas
    ActualizarStock(codigoCatalogo, cantidad);
    ActualizarCantidadVendidos(codigoCatalogo, cantidad);
    ActualizarCantidadVentas(codigoVendedor);

    guardarEstado();

    MostrarModal("Venta añadida correctamente!");

    InicializarVenta();
    ListarVentas();
};


const SeleccionarVenta = () => {
    let codigoSeleccionado =
        document.getElementById('lista-ventas').value;

    for (let objVenta of ventas) {
        if (objVenta.codigo == codigoSeleccionado) {

            document.getElementById("codigo").value =
                objVenta.codigo;

            document.getElementById("fecha").value =
                objVenta.fecha;

            document.getElementById("codigo-vendedor").value =
                objVenta.vendedor.codigo;

            document.getElementById("codigo-catalogo").value =
                objVenta.catalogo.codigo;

            CargarPrecioCatalogo();

            document.getElementById("cantidad").value =
                objVenta.cantidad;

            document.getElementById("total").value =
                objVenta.total;
        }
    }
};


const ModificarVenta = () => {
    if (!validarCamposVenta(true)) {
        MostrarModal("Debe completar correctamente los campos de la venta!");
        return;
    }

    let codigoSeleccionado =
        document.getElementById("lista-ventas").value;

    let fecha =
        document.getElementById("fecha").value;

    let codigoCatalogo =
        document.getElementById("codigo-catalogo").value;

    let codigoVendedor =
        document.getElementById("codigo-vendedor").value;

    let cantidad =
        parseInt(document.getElementById("cantidad").value);

    let total =
        parseFloat(document.getElementById("total").value);


    if (cantidad <= 0) {
        MostrarModal("La cantidad debe ser mayor a 0!");
        return;
    }


    if (
        codigoSeleccionado == "" ||
        fecha == "" ||
        codigoVendedor == "" ||
        codigoCatalogo == ""
    ) {
        MostrarModal("Debe ingresar todos los campos!");
        return;
    }

    if (isNaN(Date.parse(fecha))) {
        MostrarModal("La fecha ingresada no es válida!");
        return;
    }


    if (isNaN(cantidad) || isNaN(total)) {
        MostrarModal("Los valores ingresados no son correctos!");
        return;
    }


    let unaVenta = BuscarVenta(codigoSeleccionado);

    if (!unaVenta) {
        MostrarModal("No se encontró la venta seleccionada!");
        return;
    }

    let unCatalogo = BuscarCatalogo(codigoCatalogo);

    if (!unCatalogo) {
        MostrarModal("Debe seleccionar un catálogo válido!");
        return;
    }


    let unVendedor = BuscarVendedor(codigoVendedor);

    if (!unVendedor) {
        MostrarModal("Debe seleccionar un vendedor válido!");
        return;
    }


    let stockDisponible = unCatalogo.stock;

    if (unaVenta.catalogo.codigo == codigoCatalogo) {
        stockDisponible += unaVenta.cantidad;
    }


    if (cantidad > stockDisponible) {
        MostrarModal(
            "La cantidad ingresada excede el stock disponible!, quedan " +
            stockDisponible +
            " unidades en stock de " +
            unCatalogo.nombre
        );

        return;
    }


    // Devuelvo los datos de la venta anterior
    DevolverStock(
        unaVenta.catalogo.codigo,
        unaVenta.cantidad
    );

    DevolverCantidadVendidos(
        unaVenta.catalogo.codigo,
        unaVenta.cantidad
    );

    DevolverCantidadVentas(
        unaVenta.vendedor.codigo
    );


    // Actualizo con los nuevos datos
    ActualizarStock(
        codigoCatalogo,
        cantidad
    );

    ActualizarCantidadVendidos(
        codigoCatalogo,
        cantidad
    );

    ActualizarCantidadVentas(
        codigoVendedor
    );


    unaVenta.fecha = fecha;
    unaVenta.vendedor = unVendedor;
    unaVenta.catalogo = unCatalogo;
    unaVenta.cantidad = cantidad;
    unaVenta.total = total;


    guardarEstado();

    MostrarModal("Venta modificada correctamente!");

    InicializarVenta();
    ListarVentas();
};


const BuscarVenta = (pCodigo) => {
    for (let objVenta of ventas) {
        if (objVenta.codigo == pCodigo) {
            return objVenta;
        }
    }

    return null;
};


const EliminarVenta = () => {
    // Leo el codigo desde la linea seleccionada
    let codigoSeleccionado =
        document.getElementById("lista-ventas").value;

    let posicionVenta = -1;


    // Validación
    if (codigoSeleccionado == "") {
        MostrarModal("Debe seleccionar una Venta!");
        return;
    }


    let unaVenta = BuscarVenta(codigoSeleccionado);


    for (let pos = 0; pos < ventas.length; pos++) {
        if (ventas[pos].codigo == codigoSeleccionado) {
            posicionVenta = pos;
        }
    }


    ConfirmarModal("Desea eliminar la venta seleccionada?", () => {
        if (posicionVenta != -1) {
            ventas.splice(posicionVenta, 1);
        }

        guardarEstado();


        // Devuelvo el stock y las cantidades
        DevolverStock(
            unaVenta.catalogo.codigo,
            unaVenta.cantidad
        );

        DevolverCantidadVendidos(
            unaVenta.catalogo.codigo,
            unaVenta.cantidad
        );

        // Actualizo cantidad de ventas del vendedor
        DevolverCantidadVentas(
            unaVenta.vendedor.codigo
        );

        guardarEstado();


        MostrarModal("Venta eliminada correctamente!");

        InicializarVenta();
        ListarVentas();
    });
};


const LimpiarVenta = () => {
    guardarEstado();

    MostrarModal("Cajas limpiadas correctamente!");

    InicializarVenta();
};


//#endregion


document.getElementById("botones-ventas").addEventListener("click", (event) => {
    const acciones = {
        btnAgregarVenta: AgregarVenta,
        btnModificarVenta: ModificarVenta,
        btnEliminarVenta: EliminarVenta,
        btnLimpiarVenta: LimpiarVenta
    };

    acciones[event.target.id]?.();
});
document.getElementById("codigo-catalogo").addEventListener("change", () => {
    CargarPrecioCatalogo();
    CalculoTotal();
    validarCamposVenta();
});
document.getElementById("cantidad").addEventListener("input", CalculoTotal);
document.getElementById("codigo").addEventListener("input", () => validarCamposVenta(false));
document.getElementById("fecha").addEventListener("change", () => validarCamposVenta(false));
document.getElementById("codigo-vendedor").addEventListener("change", () => validarCamposVenta(false));
document.getElementById("cantidad").addEventListener("input", () => validarCamposVenta(false));
document.getElementById("lista-ventas").addEventListener("change", SeleccionarVenta);

document.addEventListener('DOMContentLoaded', inicializarInterfazVentas);

CargoDatosVentas();