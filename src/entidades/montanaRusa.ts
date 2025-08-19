import { Atraccion } from "../abstracts/atraccion.entity";
import { ConsumoEnergia } from "../abstracts/consumoEnergia";
import { IAtraccion } from "../interfaces/IAtraccion";
import { Combustible } from "../types/Combustibles.enum";

export class MontañaRusa extends Atraccion implements IAtraccion {

    constructor(nombre: string, capacidadMaxima: number, combustible: Combustible, consumoHora: number, precioBaseEntrada: number){
        const energia = new ConsumoEnergia(consumoHora, combustible)
        super(nombre, capacidadMaxima, energia)
        this.precioBaseEntrada = precioBaseEntrada;
    }

    calcularCostoOperacion(): number {
        throw new Error("Method not implemented.");
    }

}