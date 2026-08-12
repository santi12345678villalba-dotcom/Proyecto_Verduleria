import { Ventas } from "../clases/ventas.js";
import { Memoria } from "../memoria.js";

let ventas = [];
let catalogos = [];
let vendedores = [];


//#region Metodos de Ventas

const CargoDatosVentas = () => {
    const LaMemoria = new Memoria();

    ventas = LaMemoria.leer('ventas');
    catalogos = LaMemoria.leer('catalogos');
    vendedores = LaMemoria.leer('vendedores');
    
    if (!ventas) {
        ventas = [];
    }

    if (!catalogos) {
        catalogos = [];
    }

    if (!vendedores) {
        vendedores = [];
    }

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
    let precio = document.getElementById('precio-catalogo').value;
    let cantidad = document.getElementById('cantidad').value;
    let total = 0;

    if (cantidad > 0) {
        total = precio * cantidad;
        document.getElementById('total').value = total;
    }
};


const ListarVentas = () => {
    let lista = document.getElementById('lista-ventas').options;
    lista.length = 0;

    for (let objVenta of ventas) {

        console.log(objVenta);
        console.log("catalogo:", objVenta.catalogo);
        console.log("vendedor:", objVenta.vendedor);

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
    // Leo los datos ingresados de las cajas de texto
    let codigo = document.getElementById("codigo").value;
    let fecha = document.getElementById("fecha").value;
    let codigoVendedor = document.getElementById("codigo-vendedor").value;
    let codigoCatalogo = document.getElementById("codigo-catalogo").value;
    let cantidad = parseInt(
        document.getElementById("cantidad").value
    );
    let total = parseInt(
        document.getElementById("total").value
    );

    if (cantidad <= 0) {
        alert("La cantidad debe ser mayor a 0!");
        return;
    }

    for (const unCatalogo of catalogos) {
        if (unCatalogo.codigo == codigoCatalogo) {

            if (cantidad > unCatalogo.stock) {
                alert(
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
        alert("Debe ingresar todos los campos!");
        return;
    }

    if (isNaN(cantidad) || isNaN(total)) {
        alert("Los valores ingresados no son correctos!");
        return;
    }

    let unCatalogo = BuscarCatalogo(codigoCatalogo);
    let unVendedor = BuscarVendedor(codigoVendedor);

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

    const LaMemoria = new Memoria();

    LaMemoria.escribir('ventas', ventas);
    LaMemoria.escribir('catalogos', catalogos);
    LaMemoria.escribir('vendedores', vendedores);

    alert("Venta añadida correctamente!");

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
        parseInt(document.getElementById("total").value);


    if (cantidad <= 0) {
        alert("La cantidad debe ser mayor a 0!");
        return;
    }


    if (
        codigoSeleccionado == "" ||
        fecha == "" ||
        codigoVendedor == "" ||
        codigoCatalogo == ""
    ) {
        alert("Debe ingresar todos los campos!");
        return;
    }


    if (isNaN(cantidad) || isNaN(total)) {
        alert("Los valores ingresados no son correctos!");
        return;
    }


    let unaVenta = BuscarVenta(codigoSeleccionado);

    if (!unaVenta) {
        alert("No se encontró la venta seleccionada!");
        return;
    }


    let unCatalogo = BuscarCatalogo(codigoCatalogo);

    if (!unCatalogo) {
        alert("Debe seleccionar un catálogo válido!");
        return;
    }


    let unVendedor = BuscarVendedor(codigoVendedor);

    if (!unVendedor) {
        alert("Debe seleccionar un vendedor válido!");
        return;
    }


    let stockDisponible = unCatalogo.stock;

    if (unaVenta.catalogo.codigo == codigoCatalogo) {
        stockDisponible += unaVenta.cantidad;
    }


    if (cantidad > stockDisponible) {
        alert(
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


    const LaMemoria = new Memoria();

    LaMemoria.escribir('ventas', ventas);
    LaMemoria.escribir('catalogos', catalogos);
    LaMemoria.escribir('vendedores', vendedores);

    alert("Venta modificada correctamente!");

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
        alert("Debe seleccionar una Venta!");
        return;
    }


    let unaVenta = BuscarVenta(codigoSeleccionado);


    for (let pos = 0; pos < ventas.length; pos++) {
        if (ventas[pos].codigo == codigoSeleccionado) {
            posicionVenta = pos;
        }
    }


    if (posicionVenta != -1) {
        ventas.splice(posicionVenta, 1);
    }


    const LaMemoria = new Memoria();

    LaMemoria.escribir('ventas', ventas);


    // Devuelvo el stock y las cantidades
    DevolverStock(
        unaVenta.catalogo.codigo,
        unaVenta.cantidad
    );

    DevolverCantidadVendidos(
        unaVenta.catalogo.codigo,
        unaVenta.cantidad
    );

    LaMemoria.escribir('catalogos', catalogos);


    // Actualizo cantidad de ventas del vendedor
    DevolverCantidadVentas(
        unaVenta.vendedor.codigo
    );

    LaMemoria.escribir('vendedores', vendedores);


    alert("Venta eliminada correctamente!");

    InicializarVenta();
    ListarVentas();
};


const LimpiarVenta = () => {
    const LaMemoria = new Memoria();

    LaMemoria.escribir('ventas', ventas);

    alert("Cajas limpiadas correctamente!");

    InicializarVenta();
};


//#endregion


document.getElementById("btnAgregarVenta") .addEventListener("click", AgregarVenta);

document.getElementById("btnModificarVenta").addEventListener("click", ModificarVenta);

document.getElementById("btnEliminarVenta").addEventListener("click", EliminarVenta);

document.getElementById("btnLimpiarVenta").addEventListener("click", LimpiarVenta);

document.getElementById("lista-ventas").addEventListener("change", SeleccionarVenta);


CargoDatosVentas();