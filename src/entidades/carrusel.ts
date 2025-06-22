import { Atraccion } from "../abstracts/atraccion.entity";
import { ConsumoEnergia } from "../abstracts/consumoEnergia";
import { IAtraccion } from "../interfaces/IAtraccion";

export class Carrusel extends Atraccion implements IAtraccion {
    private costosFijos: number;

    constructor(nombre: string, capacidadMaxima: number, precioBaseEntrada: number){
        super(nombre, capacidadMaxima)
        this.precioBaseEntrada = precioBaseEntrada;
    }

    calcularCostoOperacion(): number {
        throw new Error("Method not implemented.");
    }

}