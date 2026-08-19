
import { estado, cargarEstado } from '../globals.js';

export function initEstadisticas() {
    cargarEstado();
    const { ventas, catalogos, vendedores } = estado;

    const totalRecaudado = document.getElementById('totalRecaudado');
    const masVendido = document.getElementById('masVendido');
    const mejorVendedor = document.getElementById('mejorVendedor');
    const listaStock = document.getElementById('catalogos-con-stock');

    if (!totalRecaudado || !masVendido || !mejorVendedor || !listaStock) return;

    let total = 0;
    for (const unaVenta of ventas) {
        total += Number(unaVenta.total || 0);
    }
    totalRecaudado.value = total;

    let mayor = 0;
    let objMayor = null;
    for (const unCatalogo of catalogos) {
        let cantVendidos = unCatalogo.cantVendidos || 0;
        if (cantVendidos > mayor) {
            mayor = cantVendidos;
            objMayor = unCatalogo;
        }
    }
    masVendido.value = objMayor
        ? `${objMayor.nombre} con ${(objMayor.cantVendidos || 0)} unidades`
        : 'Sin ventas';

    mayor = 0;
    objMayor = null;
    for (const unVendedor of vendedores) {
        let cantVentas = unVendedor.cantVentas || 0;
        if (cantVentas > mayor) {
            mayor = cantVentas;
            objMayor = unVendedor;
        }
    }
    mejorVendedor.value = objMayor
        ? `${objMayor.nombre} ${(objMayor.cantVentas || 0)} ventas`
        : 'Sin ventas';

    let lista = listaStock.options;
    lista.length = 0;
    for (const objCatalogo of catalogos) {
        if (objCatalogo.stock > 0) {
            const texto = `${objCatalogo.codigo} : Nombre: ${objCatalogo.nombre} - Precio: ${objCatalogo.precio} - Stock: ${objCatalogo.stock}`;
            lista.add(new Option(texto, objCatalogo.codigo));
        }
    }
}

