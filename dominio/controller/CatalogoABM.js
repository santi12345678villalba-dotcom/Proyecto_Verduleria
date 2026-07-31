let catalogos = [];

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

