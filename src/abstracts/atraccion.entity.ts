import { ConsumoEnergia } from "./consumoEnergia";

export abstract class Atraccion {
    readonly nombre: string = "";
    /**
     * Precio base de entrado por persona
     */
    protected precioBaseEntrada: number = 0;
    protected readonly capacidadMaximaDePersonas: number = 100;
    /**
     * cantidad de personas que actualmente se encuentren en la atracción. 
     */
    protected cantidadPersonasActuales: number = 0;
    private estado: boolean = false; // (activa o inactiva)

    /**
     * Consumo de energia de la atraccion
     */
    private energia: ConsumoEnergia;
    /**
     * Constructor de la clase Atraccion
     * @param nombre Nombre de la atracción
     * @param capacidadMaximaDePersonas Capacidad máxima de personas que pueden ingresar a la atracción
     * @param energia Consumo de energía asociado a la atracción
     */
    constructor(nombre: string, capacidadMaximaDePersonas: number, energia: ConsumoEnergia) {
        this.nombre = nombre;
        this.capacidadMaximaDePersonas = capacidadMaximaDePersonas;
        this.energia = energia;
    }

    /**
     * valída y activa la atraccion
     */
    activar() {
        this.estado = true
    }
    /**
     * valída y desactiva la atraccion
     */

    desactivar() {
        this.estado = false
    }
    /**
     * valida si hay bancos/asientos/cupos disponibles e ingresa personas a la atraccion
     * @param cantidad numero de personas a ingresar
     */
    ingresarPersonas(cantidad: number): void {
        if (!this.estado) throw new Error("No se puede ingresar personas, la atraccion esta inactiva")
        if ((this.cantidadPersonasActuales + cantidad) <= this.capacidadMaximaDePersonas){
            this.cantidadPersonasActuales += cantidad
        } else {
            throw new Error("capacidad maxima de personas insuficiente")
        }
    }
    /**
     * devuelve la cantidad de bancos/asientos/cupos disponibles de personas
     * @returns {number}
     */
    bancosDisponibles(): number {
        return this.capacidadMaximaDePersonas - this.cantidadPersonasActuales
    }
    /**
     * devuelve la capacidad maxima de personas
     * @returns {number}
     */
    capacidadMaxima(): number {
        return this.capacidadMaximaDePersonas
    }
    /**
     * devuelve el estado de la atracción
     * @returns {boolean}
     */
    mostrarInformacion(): boolean {
        return this.estado
    }
}