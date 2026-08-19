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

    return estado;
};

export const guardarEstado = () => {
    const memoria = new Memoria();

    for (const entidad of Object.keys(estado)) {
        memoria.escribir(CLAVES_MEMORIA[entidad], estado[entidad]);
    }
};