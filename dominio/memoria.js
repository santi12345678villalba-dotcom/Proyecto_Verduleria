export class Memoria {
    constructor(){}
    leer(clave){
        const datos = localStorage.getItem(clave);
        if(!datos){
            return null;
        }

        try {
            return JSON.parse(datos);
        } catch (error) {
            localStorage.removeItem(clave);
            return null;
        }
    }
    escribir(clave, dato){
        localStorage.setItem(clave, JSON.stringify(dato));
    }
}
