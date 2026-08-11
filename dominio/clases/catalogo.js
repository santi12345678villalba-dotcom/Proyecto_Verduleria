export class Catalogo {
  constructor(pFoto, pCodigo, pNombre, pDescripcion, pPrecio, pStock){
        this.foto = pFoto;
        this.codigo = pCodigo;
        this.nombre = pNombre;
        this.descripcion = pDescripcion;
        this.precio = pPrecio;
        this.stock = pStock;
        this.cantVendidos = 0;
    }
}
