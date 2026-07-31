let vendedores = [];
let catalogos = [];
let ventas = [];

//#region Metodos de Ventas
function CargoDatosVentas(){
    const LaMemoria = new Memoria();
    ventas = LaMemoria.leer('ventas');
    catalogos = LaMemoria.leer('catalogos');
    vendedores = LaMemoria.leer('vendedores');
    
    if(!ventas){
        ventas = [];
    }
    if(!catalogos){
        catalogos = [];
    }
    if(!vendedores){
        vendedores = [];
    }
    InicializarVenta();
    CargarVendedores();
    CargarDatosCatalogos();
    ListarVentas();
}

function CargarVendedores(){
    let lista = document.getElementById('codigo-vendedor').options;
    lista.length = 0;

    let elementoBase = new Option("Seleccione un vendedor", "");
    lista.add(elementoBase);

    for (let objVendedor of vendedores) {
        let elemento = new Option(objVendedor.nombre, objVendedor.codigo);
        lista.add(elemento);
    }
}

function CargarDatosCatalogos(){
    let lista = document.getElementById('codigo-catalogo').options;
    lista.length = 0;

    let elementoBase = new Option("Seleccione algo del catalogo", "");
    lista.add(elementoBase);

    for (let objCatalogo of catalogos) {
        let elemento = new Option(objCatalogo.nombre, objCatalogo.codigo);
        lista.add(elemento);
    }
}

function CargarPrecioCatalogo(){
    document.getElementById('precio-catalogo').value = "";

    let codigoCatalogo = document.getElementById('codigo-catalogo').value;
    for (let objCatalogo of catalogos) {
        if(objCatalogo.codigo == codigoCatalogo){
            document.getElementById('precio-catalogo').value = objCatalogo.precio;
        }
    }
}

function ActualizarStock(pcodigoCatalogo, pCantidad){
    for (const unCatalogo of catalogos) {
        if(unCatalogo.codigo == pcodigoCatalogo){
            unCatalogo.stock = unCatalogo.stock - pCantidad;
        }
    }
}

function DevolverStock(pcodigoCatalogo, pCantidad){
    for (const unCatalogo of catalogos) {
        if(unCatalogo.codigo == pcodigoCatalogo){
            unCatalogo.stock = unCatalogo.stock + pCantidad;
        }
    }
}


function ActualizarCantidadVendidos(pcodigoCatalogo, pCantidad){
    for (const unCatalogo of catalogos) {
        if(unCatalogo.codigo == pcodigoCatalogo){
            if(!unCatalogo.cantVendidos){
                unCatalogo.cantVendidos = 0;
            }
            unCatalogo.cantVendidos += pCantidad;
        }
    }
}


function DevolverCantidadVendidos(pcodigoCatalogo, pCantidad){
    for (const unCatalogo of catalogos) {
        if(unCatalogo.codigo == pcodigoCatalogo){
            if(!unCatalogo.cantVendidos){
                unCatalogo.cantVendidos = 0;
            }
            unCatalogo.cantVendidos = unCatalogo.cantVendidos - pCantidad;
        }
    }
}

function ActualizarCantidadVentas(pCodigoVendedor){
    for (const unVendedor of vendedores) {
        if(unVendedor.codigo == pCodigoVendedor){
            if(!unVendedor.cantVentas){
                unVendedor.cantVentas = 0;
            }
            unVendedor.cantVentas += 1;
        }
    }
}

function DevolverCantidadVentas(pCodigoVendedor){
    for (const unVendedor of vendedores) {
        if(unVendedor.codigo == pCodigoVendedor){
            if(!unVendedor.cantVentas){
                unVendedor.cantVentas = 0;
            }
            unVendedor.cantVentas -= 1;
        }
    }
}

function CalculoTotal(){
    let precio = document.getElementById('precio-catalogo').value;
    let cantidad = document.getElementById('cantidad').value;
    let total = 0;
    if(cantidad > 0){
        total = precio * cantidad;
        document.getElementById('total').value = total;
    }
}

function ListarVentas(){
 
    let lista = document.getElementById('lista-ventas').options;
    lista.length = 0;

    for (let objVenta of ventas) {
        console.log(objVenta);
        console.log("catalogo:", objVenta.catalogo);
        console.log("vendedor:", objVenta.vendedor);
        let texto = 'Codigo: ' + objVenta.codigo + ' - Fecha: ' + objVenta.fecha 
        + ' - Nombre: '+ objVenta.vendedor.nombre +' - Catalogo: ' + objVenta.catalogo.codigo + ' - Total: ' + objVenta.total+ ' - Cantidad: ' + objVenta.cantidad;
        let elemento = new Option(texto, objVenta.codigo);
        lista.add(elemento);
    }
   
   
}
function InicializarVenta(){

    let hoy = new Date();
    console.log("HOY", hoy);
    
    let anio = hoy.getFullYear();
    let mes = ""+(hoy.getMonth()+1);
    mes = (mes.length == 1)?"0"+mes:mes;
    let dia = ""+hoy.getDate();
    dia = (dia.length == 1)?"0"+dia:dia;

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
    // Pongo el foco en la caja de texto nombre
    document.getElementById("codigo").focus();
}

function AgregarVenta(){
    // Leo los datos ingresados de las cajas de texto
    let codigo = document.getElementById("codigo").value;
    let fecha = document.getElementById("fecha").value;
    let codigoVendedor = document.getElementById("codigo-vendedor").value;
    let codigoCatalogo = document.getElementById("codigo-catalogo").value;
    let cantidad = parseInt(document.getElementById("cantidad").value);
    let total = parseInt(document.getElementById("total").value);

    if(cantidad <= 0){
        alert("La cantidad debe ser mayor a 0!");
        return;
    }
   for (const unCatalogo of catalogos) {
    if(unCatalogo.codigo == codigoCatalogo){  
    if (cantidad > unCatalogo.stock) {
            alert("La cantidad ingresada excede el stock disponible!, quedan " + unCatalogo.stock + " unidades en stock de " + unCatalogo.nombre);
            return;
        }
    }
    }

    // Debemos agregar validacion para las cajas de texto que no vengan vacías
    if(codigo == "" || fecha == "" || codigoVendedor == "" || codigoCatalogo == ""){
        alert("Debe ingresar todos los campos!");
        return;
    }
    if(isNaN(cantidad) || isNaN(total)){
        alert("Los valores ingresados no son correctos!");
        return;
    }

    let unCatalogo = BuscarCatalogo(codigoCatalogo);
    // validar que el objeto catalogo existe
    let unVendedor = BuscarVendedor(codigoVendedor);
    // validar que el objeto vendedor existe
    let unaVenta = new Ventas(codigo, fecha, unCatalogo, unVendedor, cantidad, total);
    ventas.push(unaVenta);

    // Luego de la venta tengo que actualizar el stock del catalogo vendido
    // y sumar la cantidad vendida y las ventas del vendedor.
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

}

function SeleccionarVenta(){
    let codigoSeleccionado = document.getElementById('lista-ventas').value;
    
    for (let objVenta of ventas) {
        if(objVenta.codigo == codigoSeleccionado){
            document.getElementById("codigo").value = objVenta.codigo;
            document.getElementById("fecha").value = objVenta.fecha;
            document.getElementById("codigo-vendedor").value = objVenta.vendedor.codigo;
            document.getElementById("codigo-catalogo").value = objVenta.catalogo.codigo;
            CargarPrecioCatalogo();
            document.getElementById("cantidad").value = objVenta.cantidad;
            document.getElementById("total").value = objVenta.total;
        }
    }
}

function ModificarVenta(){
    let codigoSeleccionado = document.getElementById("lista-ventas").value;
    let fecha = document.getElementById("fecha").value;
    let codigoCatalogo = document.getElementById("codigo-catalogo").value;
    let codigoVendedor = document.getElementById("codigo-vendedor").value;
    let cantidad = parseInt(document.getElementById("cantidad").value);
    let total = parseInt(document.getElementById("total").value);

    if(cantidad <= 0){
        alert("La cantidad debe ser mayor a 0!");
        return;
    }

    if(codigoSeleccionado == "" || fecha == "" || codigoVendedor == "" || codigoCatalogo == ""){
        alert("Debe ingresar todos los campos!");
        return;
    }
    if(isNaN(cantidad) || isNaN(total)){
        alert("Los valores ingresados no son correctos!");
        return;
    }

    let unaVenta = BuscarVenta(codigoSeleccionado);
    if(!unaVenta){
        alert("No se encontró la venta seleccionada!");
        return;
    }

    let unCatalogo = BuscarCatalogo(codigoCatalogo);
    if(!unCatalogo){
        alert("Debe seleccionar un catálogo válido!");
        return;
    }

    let unVendedor = BuscarVendedor(codigoVendedor);
    if(!unVendedor){
        alert("Debe seleccionar un vendedor válido!");
        return;
    }

    let stockDisponible = unCatalogo.stock;
    if(unaVenta.catalogo.codigo == codigoCatalogo){
        stockDisponible += unaVenta.cantidad;
    }

    if(cantidad > stockDisponible){
        alert("La cantidad ingresada excede el stock disponible!, quedan " + stockDisponible + " unidades en stock de " + unCatalogo.nombre);
        return;
    }

    DevolverStock(unaVenta.catalogo.codigo, unaVenta.cantidad);
    DevolverCantidadVendidos(unaVenta.catalogo.codigo, unaVenta.cantidad);
    DevolverCantidadVentas(unaVenta.vendedor.codigo);

    ActualizarStock(codigoCatalogo, cantidad);
    ActualizarCantidadVendidos(codigoCatalogo, cantidad);
    ActualizarCantidadVentas(codigoVendedor);

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
}

function BuscarVenta(pCodigo){
    for (let objVenta of ventas) {
        if(objVenta.codigo == pCodigo){
            return objVenta;
        }
    }
    return null;
}


function EliminarVenta(){
    // Leo el codigo desde la linea seleccionada
    let codigoSeleccionado = document.getElementById("lista-ventas").value;
    let posicionVenta = -1;

    // Debemos agregar validacion para las cajas de texto que no vengan vacías
    if(codigoSeleccionado == ""){
        alert("Debe seleccionar una Venta!");
        return;
    }

    let unaVenta = BuscarVenta(codigoSeleccionado);

    for (let pos = 0; pos < ventas.length; pos++) {
        if(ventas[pos].codigo == codigoSeleccionado){
            posicionVenta = pos;
        }
    }
    if(posicionVenta != -1){
        ventas.splice(posicionVenta, 1);
    }

    const LaMemoria = new Memoria();
    LaMemoria.escribir('ventas', ventas);

    // Luego de la venta tengo que actualizar el stock del catalogo vendido
    // tambien sumarle la cantidad vendida al nuevo atributo
    DevolverStock(unaVenta.catalogo.codigo, unaVenta.cantidad);
    DevolverCantidadVendidos(unaVenta.catalogo.codigo, unaVenta.cantidad);
    LaMemoria.escribir('catalogos', catalogos);

    // actualizar cantventas del vendedor y actualizar localStorage del array de vendedores
    DevolverCantidadVentas(unaVenta.vendedor.codigo);
    LaMemoria.escribir('vendedores', vendedores);
    
    alert("Venta eliminada correctamente!");
    InicializarVenta();
    ListarVentas();
}

function LimpiarVenta(){
  const LaMemoria = new Memoria();
    LaMemoria.escribir('ventas', ventas);
alert("Cajas limpiadas correctamente!");
    InicializarVenta();

}

//#endregion

//#region Metodos de catalogos

function CargoDatosCatalogos(){
    const LaMemoria = new Memoria();
    catalogos = LaMemoria.leer('catalogos');
    
    if(!catalogos){
        catalogos = [];
    }
    InicializarCatalogo();
    ListarCatalogos();
    mostrarComoLista();

}

function ListarCatalogos(){
    let lista = document.getElementById('lista-catalogos').options;
    lista.length = 0;

    for (let objCatalogo of catalogos) {
        let texto = 'Codigo: ' + objCatalogo.codigo + ' : Nombre: ' + objCatalogo.nombre 
        + ' - Precio: ' + objCatalogo.precio + ' - Stock: ' + objCatalogo.stock;
        let elemento = new Option(texto, objCatalogo.codigo);
        lista.add(elemento);
    }
}

function mostrarComoLista() {
  let contenedor = document.getElementById("contenedorCatalogo");
  let html = "";

  html += '<table class="tabla-Catalgo">';
  html += '<thead>';
  html += '<tr>';
  html += '<th>Foto</th>';
  html += '<th>Codigo</th>';
  html += '<th>Nombre</th>';
  html += '<th>Precio</th>';
  html += '<th>Stock</th>';
  html += '</tr>';
  html += '</thead>';
  html += '<tbody>';

  for (let i = 0; i < catalogos.length; i++) {
    html += '<tr>';
    html += '<td><img class="foto-lista" src="imagenes/' + catalogos[i].foto + '" alt="Foto de catalogo" onerror="this.src=\'imagenes/sinlogo.png\'"></td>';
    //  html += '<td><img class="foto-lista" src="imagenes/logo.png"    alt="Foto de catalogo" ></td>';

    html += '<td>' + catalogos[i].codigo + '</td>';
    html += '<td>' + catalogos[i].nombre + '</td>';
    html += '<td>' + catalogos[i].precio + '</td>';
    html += '<td>' + catalogos[i].stock + '</td>';
    html += '<td class="acciones">';
    html += '</td>';
    html += '</tr>';
  }


  html += '</tbody>';
  html += '</table>';

  contenedor.innerHTML = html;
}

function InicializarCatalogo(){
    
    // Luego de agregarlas al array, limpio las cajas de texto
    document.getElementById("foto").value = "";
    document.getElementById("codigo").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";
    // Pongo el foco en la caja de texto nombre
    document.getElementById("codigo").focus();
}

function AgregarCatalogo(){
    // Leo los datos ingresados de las cajas de texto
    let foto = document.getElementById("foto").value;
    let codigo = document.getElementById("codigo").value;
    let nombre = document.getElementById("nombre").value;
    let descripcion = document.getElementById("descripcion").value;
    let precio = parseInt(document.getElementById("precio").value);
    let stock = parseInt(document.getElementById("stock").value);

    // Debemos agregar validacion para las cajas de texto que no vengan vacías
    if(codigo == "" || nombre == "" || descripcion == ""){
        alert("Debe ingresar todos los campos para poder agregar el catalogo!");
        return;
    }
    if(isNaN(precio) || isNaN(stock)){
        alert("Los valores ingresados no son correctos!");
        return;
    }

    let unCatalogo = new Catalogo(foto, codigo, nombre, descripcion, precio, stock);
    catalogos.push(unCatalogo);

    const LaMemoria = new Memoria();
    LaMemoria.escribir('catalogos', catalogos);

    alert("Catalogo añadido correctamente!");
    InicializarCatalogo();
    ListarCatalogos();
    mostrarComoLista();
}

function SeleccionarCatalogo(){
    let codigoSeleccionado = document.getElementById('lista-catalogos').value;
   
    for (let objCatalogo of catalogos) {
        if(objCatalogo.codigo == codigoSeleccionado){
            document.getElementById("foto").value = objCatalogo.foto;
            document.getElementById("codigo").value = objCatalogo.codigo;
            document.getElementById("nombre").value = objCatalogo.nombre;
            document.getElementById("descripcion").value = objCatalogo.descripcion;
            document.getElementById("precio").value = objCatalogo.precio;
            document.getElementById("stock").value = objCatalogo.stock;
        }
    }
}

function ModificarCatalogo(){
    // Leo el codigo desde la linea seleccionada
    let codigoSeleccionado = document.getElementById("lista-catalogos").value;
    // Leo los datos ingresados de las cajas de texto
    let foto = document.getElementById("foto").value;
    let nombre = document.getElementById("nombre").value;
    let descripcion = document.getElementById("descripcion").value;
    let precio = parseInt(document.getElementById("precio").value);
    let stock = parseInt(document.getElementById("stock").value);

    // Debemos agregar validacion para las cajas de texto que no vengan vacías
    if(codigoSeleccionado == "" || nombre == "" || descripcion == ""){
        alert("Debe ingresar todos los campos para modificar el catalogo!");
        return;
    }
    if(isNaN(precio) || isNaN(stock)){
        alert("Los valores ingresados no son correctos!");
        return;
    }
    // Cargo el objeto vendedor desde la funcion buscar
    let unCatalogo = BuscarCatalogo(codigoSeleccionado);

    unCatalogo.foto = foto;
    unCatalogo.nombre = nombre;
    unCatalogo.descripcion = descripcion;
    unCatalogo.precio = precio;
    unCatalogo.stock = stock;

    const LaMemoria = new Memoria();
    LaMemoria.escribir('catalogos', catalogos);
    alert("Catalogo modificado correctamente!");
    InicializarCatalogo();
    ListarCatalogos();
    mostrarComoLista();
}

function BuscarCatalogo(pCodigo){
    for (let objCatalogo of catalogos) {
        if(objCatalogo.codigo == pCodigo){
            return objCatalogo;
        }
    }
    return null;
}

function EliminarCatalogo(){
    // Leo el codigo desde la linea seleccionada
    let codigoSeleccionado = document.getElementById("lista-catalogos").value;
    let posicionCatalogo = -1;

    // Debemos agregar validacion para las cajas de texto que no vengan vacías
    if(codigoSeleccionado == ""){
        alert("Debe seleccionar un catalogo!");
        return;
    }

    for (let pos = 0; pos < catalogos.length; pos++) {
        if(catalogos[pos].codigo == codigoSeleccionado){
            posicionCatalogo = pos;
        }
    }
    if(posicionCatalogo != -1){
        catalogos.splice(posicionCatalogo, 1);
    }

    const LaMemoria = new Memoria();
    LaMemoria.escribir('catalogos', catalogos);
    
    alert("Catalogo eliminado correctamente!");
    InicializarCatalogo();
    ListarCatalogos();
    mostrarComoLista();
}

function LimpiarCatalogo(){
const LaMemoria = new Memoria();
LaMemoria.escribir('catalogos', catalogos);
alert("Cajas limpiadas correctamente!");
    InicializarCatalogo();

}

//#endregion

//#region Metodos de Vendedores

function CargoDatosVendedor(){
    const LaMemoria = new Memoria();
    vendedores = LaMemoria.leer('vendedores');
    
    if(!vendedores){
        vendedores = [];
    }
    InicializarVendedor();
    ListarVendedores();
}

function AgregarVendedor(){
    // Leo los datos ingresados de las cajas de texto
    let codigo = document.getElementById("codigo").value;
    let nombre = document.getElementById("nombre").value;
    let cedula = document.getElementById("cedula").value;

    // Debemos agregar validacion para las cajas de texto que no vengan vacías
    if(cedula == "" || nombre == "" || codigo == ""){
        alert("Debe ingresar todos los campos para poder agregar el vendedor!");
        return;
    }

    let unVendedor = new Vendedor(codigo, nombre, cedula);
    vendedores.push(unVendedor);

    const LaMemoria = new Memoria();
    LaMemoria.escribir('vendedores', vendedores);

    InicializarVendedor();
    ListarVendedores();

}

function SeleccionarVendedor(){
    let codigoSeleccionado = document.getElementById('lista-vendedores').value;
    
    for (let objVendedor of vendedores) {
        if(objVendedor.codigo == codigoSeleccionado){
            document.getElementById("codigo").value = objVendedor.codigo;
            document.getElementById("nombre").value = objVendedor.nombre;
            document.getElementById("cedula").value = objVendedor.cedula;
        }
    }
}

function ListarVendedores(){
    let lista = document.getElementById('lista-vendedores').options;
    lista.length = 0;

    for (let objVendedor of vendedores) {
        let texto = 'Codigo: ' + objVendedor.codigo + ' : Nombre: ' + objVendedor.nombre 
        + ' - Cedula: ' + objVendedor.cedula;
        let elemento = new Option(texto, objVendedor.codigo);
        lista.add(elemento);
    }
}
function InicializarVendedor(){
    
    // Luego de agregarlas al array, limpio las cajas de texto
    document.getElementById("codigo").value = "";
    document.getElementById("cedula").value = "";
    document.getElementById("nombre").value = "";
    // Pongo el foco en la caja de texto nombre
    document.getElementById("codigo").focus();
}

function ModificarVendedor(){
    // Leo el codigo desde la linea seleccionada
    let codigoSeleccionado = document.getElementById("lista-vendedores").value;
    // Leo los datos ingresados de las cajas de texto
    let nombre = document.getElementById("nombre").value;
    let cedula = document.getElementById("cedula").value;

    // Debemos agregar validacion para las cajas de texto que no vengan vacías
    if(codigoSeleccionado == "" || nombre == "" || cedula == ""){
        alert("Debe ingresar todos los campos para modificar el vendedor!");
        return;
    }
    // Cargo el objeto vendedor desde la funcion buscar
    let unVendedor = BuscarVendedor(codigoSeleccionado);

    unVendedor.nombre = nombre;
    unVendedor.cedula = cedula;

    const LaMemoria = new Memoria();
    LaMemoria.escribir('vendedores', vendedores);
    
    InicializarVendedor();
    ListarVendedores();
}

function BuscarVendedor(pCodigo){
    for (let objVendedor of vendedores) {
        if(objVendedor.codigo == pCodigo){
            return objVendedor;
        }
    }
    return null;
}

function EliminarVendedor(){
    // Leo el codigo desde la linea seleccionada
    let codigoSeleccionado = document.getElementById("lista-vendedores").value;
    let posicionVendedor = -1;

    // Debemos agregar validacion para las cajas de texto que no vengan vacías
    if(codigoSeleccionado == ""){
        alert("Debe seleccionar un Vendedor!");
        return;
    }

    for (let pos = 0; pos < vendedores.length; pos++) {
        if(vendedores[pos].codigo == codigoSeleccionado){
            posicionVendedor = pos;
        }
    }
    if(posicionVendedor != -1){
        vendedores.splice(posicionVendedor, 1);
    }

    const LaMemoria = new Memoria();
    LaMemoria.escribir('vendedores', vendedores);
    alert("Vendedor eliminado correctamente!");
    InicializarVendedor();
    ListarVendedores();
}

function LimpiarVendedor(){
  const LaMemoria = new Memoria();
    LaMemoria.escribir('vendedores', vendedores);
alert("Cajas limpiadas correctamente!");
    InicializarVendedor();
}



//#endregion

//#region Metodos de Estadísticas

function CargoDatosEstadisticas(){
    const LaMemoria = new Memoria();
    ventas = LaMemoria.leer('ventas');
    catalogos = LaMemoria.leer('catalogos');
    vendedores = LaMemoria.leer('vendedores');

    if(!ventas){
        ventas = [];
    }
    if(!catalogos){
        catalogos = [];
    }
    if(!vendedores){
        vendedores = [];
    }
    
    TotalRecaudado();
    CatalogoMasVendido();
    MejorVendedor();
    CatalogosConStock();
}

function TotalRecaudado(){
    let total = 0;
    for (const unaVenta of ventas) {
        total = total + unaVenta.total;
    }
    document.getElementById('totalRecaudado').value = total;
}

function CatalogosConStock(){
    let lista = document.getElementById('catalogos-con-stock').options;
    lista.length = 0;

    for (const objCatalogo of catalogos) {
        if(objCatalogo.stock > 0){
            let texto = '' + objCatalogo.codigo + ' : Nombre: ' + objCatalogo.nombre 
            + ' - Precio: ' + objCatalogo.precio + ' - Stock: ' + objCatalogo.stock;
            let elemento = new Option(texto, objCatalogo.codigo);
            lista.add(elemento);
        }
    }
}

function CatalogoMasVendido(){
    let mayor = 0;
    let objMayor = null;
    for (const unCatalogo of catalogos) {
        let cantVendidos = unCatalogo.cantVendidos || 0;
        if(cantVendidos > mayor){
            mayor = cantVendidos;
            objMayor = unCatalogo;
        }
    }
    if(objMayor){
        document.getElementById('masVendido').value = objMayor.nombre 
        + " con " + (objMayor.cantVendidos || 0) + " unidades";
    } else {
        document.getElementById('masVendido').value = 'Sin ventas';
    }
}

function MejorVendedor(){
    let mayor = 0;
    let objMayor = null;
    for (const unVendedor of vendedores) {
        let cantVentas = unVendedor.cantVentas || 0;
        if(cantVentas > mayor){
            mayor = cantVentas;
            objMayor = unVendedor;
        }
    }
    if(objMayor){
        document.getElementById('mejorVendedor').value = objMayor.nombre 
        + "  " + (objMayor.cantVentas || 0) + " ventas";
    } else {
        document.getElementById('mejorVendedor').value = 'Sin ventas';
    }
}
//#endregion