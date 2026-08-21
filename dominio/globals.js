import { Memoria } from './memoria.js';

export const CLAVES_MEMORIA = Object.freeze({
    catalogos: 'catalogos',
    vendedores: 'vendedores',
    ventas: 'ventas'
});

export const estado = {
    catalogos: [],
    vendedores: [],
    ventas: []
};

export const cargarEstado = () => {
    const memoria = new Memoria();

    for (const entidad of Object.keys(estado)) {
        const datos = memoria.leer(CLAVES_MEMORIA[entidad]) || [];
        estado[entidad].splice(0, estado[entidad].length, ...datos);
    }

    for (const venta of estado.ventas) {
        let codigoCatalogo = venta.catalogoCodigo || venta.catalogo;
        let codigoVendedor = venta.vendedorCodigo || venta.vendedor;

        if (venta.catalogo != null && venta.catalogo.codigo != null) {
            codigoCatalogo = venta.catalogo.codigo;
        }

        if (venta.vendedor != null && venta.vendedor.codigo != null) {
            codigoVendedor = venta.vendedor.codigo;
        }

        venta.catalogo = null;
        venta.vendedor = null;

        for (const catalogo of estado.catalogos) {
            if (catalogo.codigo == codigoCatalogo) {
                venta.catalogo = catalogo;
                break;
            }
        }

        for (const vendedor of estado.vendedores) {
            if (vendedor.codigo == codigoVendedor) {
                venta.vendedor = vendedor;
                break;
            }
        }
    }

    return estado;
};

export const guardarEstado = () => {
    const memoria = new Memoria();

    for (const entidad of Object.keys(estado)) {
        if (entidad == 'ventas') {
            const ventasPersistidas = [];

            for (const venta of estado.ventas) {
                ventasPersistidas.push({
                    codigo: venta.codigo,
                    fecha: venta.fecha,
                    catalogoCodigo: venta.catalogo == null ? '' : venta.catalogo.codigo,
                    vendedorCodigo: venta.vendedor == null ? '' : venta.vendedor.codigo,
                    cantidad: venta.cantidad,
                    total: venta.total
                });
            }

            memoria.escribir(CLAVES_MEMORIA[entidad], ventasPersistidas);
        } else {
            memoria.escribir(CLAVES_MEMORIA[entidad], estado[entidad]);
        }
    }
};