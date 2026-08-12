
//#region Metodos de Estadísticas
const CargoDatosEstadisticas = () => {
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
    
    TotalRecaudado();
    CatalogoMasVendido();
    MejorVendedor();
    CatalogosConStock();
};


const TotalRecaudado = () => {
    let total = 0;

    for (const unaVenta of ventas) {
        total = total + unaVenta.total;
    }

    document.getElementById('totalRecaudado').value = total;
};


const CatalogosConStock = () => {
    let lista = document.getElementById('catalogos-con-stock').options;
    lista.length = 0;

    for (const objCatalogo of catalogos) {
        if (objCatalogo.stock > 0) {

            let texto = '' + objCatalogo.codigo +
                ' : Nombre: ' + objCatalogo.nombre +
                ' - Precio: ' + objCatalogo.precio +
                ' - Stock: ' + objCatalogo.stock;

            let elemento = new Option(
                texto,
                objCatalogo.codigo
            );

            lista.add(elemento);
        }
    }
};


const CatalogoMasVendido = () => {
    let mayor = 0;
    let objMayor = null;

    for (const unCatalogo of catalogos) {
        let cantVendidos = unCatalogo.cantVendidos || 0;

        if (cantVendidos > mayor) {
            mayor = cantVendidos;
            objMayor = unCatalogo;
        }
    }

    if (objMayor) {
        document.getElementById('masVendido').value =
            objMayor.nombre +
            " con " +
            (objMayor.cantVendidos || 0) +
            " unidades";
    } else {
        document.getElementById('masVendido').value =
            'Sin ventas';
    }
};


const MejorVendedor = () => {
    let mayor = 0;
    let objMayor = null;

    for (const unVendedor of vendedores) {
        let cantVentas = unVendedor.cantVentas || 0;

        if (cantVentas > mayor) {
            mayor = cantVentas;
            objMayor = unVendedor;
        }
    }

    if (objMayor) {
        document.getElementById('mejorVendedor').value =
            objMayor.nombre +
            "  " +
            (objMayor.cantVentas || 0) +
            " ventas";
    } else {
        document.getElementById('mejorVendedor').value =
            'Sin ventas';
    }
};


//#endregion