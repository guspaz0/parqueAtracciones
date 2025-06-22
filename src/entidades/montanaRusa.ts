import { Atraccion } from "../abstracts/atraccion.entity";
import { IAtraccion } from "../interfaces/IAtraccion";

export class MontañaRusa extends Atraccion implements IAtraccion {

    constructor(nombre: string, capacidadMaxima: number, precioBaseEntrada: number){
        super(nombre, capacidadMaxima)
        this.precioBaseEntrada = precioBaseEntrada;
    }

    calcularCostoOperacion(): number {
        throw new Error("Method not implemented.");
    }

}