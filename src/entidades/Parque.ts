import { Atraccion } from "../abstracts/atraccion.entity";
import { IAtraccion } from "../interfaces/IAtraccion";

export class Parque implements IAtraccion {
    private readonly nombre: string;
    private costoFijoAcumulado: number = 0;
    private costoVariableAcumulado: number = 0;
    private ingresosAcumulados: number = 0;
    private precioKwh!: number;
    
    protected atracciones: Atraccion[] = [];

    constructor(nombre: string){
        this.nombre = nombre;
    }
    getNombre(){
        return this.nombre;
    }

    agregarAtraccion(atraccion: Atraccion){
        this.atracciones.push(atraccion)
    }

    calcularCostoOperacion(): number {
        throw new Error("Method not implemented.");
    }

    listarAtracciones(){
        return this.atracciones
    }

    desactivarAtraccion(nombre: string) {
        const indice = this.atracciones.findIndex(e => e.nombre == nombre)
        this.atracciones[indice].desactivar()
    }

    activarAtraccion(nombre: string) {
        const indice = this.atracciones.findIndex(e => e.nombre == nombre)
        this.atracciones[indice].activar()
    }
}