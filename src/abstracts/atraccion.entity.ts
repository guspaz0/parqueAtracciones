export abstract class Atraccion {
    readonly nombre: string;
    /**
     * Precio base de entrado por persona
     */
    protected precioBaseEntrada!: number;
    protected readonly capacidadMaximaDePersonas: number;
    /**
     * cantidad de personas que actualmente se encuentren en la atracción. 
     */
    protected cantidadPersonasActuales: number = 0;
    private estado: boolean = false; // (activa o inactiva)

    constructor(nombre: string, capacidadMaximaDePersonas: number){
        this.nombre = nombre;
        this.capacidadMaximaDePersonas = capacidadMaximaDePersonas;
    }

    activar() {
        this.estado = true
    } 
    desactivar() {
        this.estado = false
    }
    ingresarPersonas(cantidad: number) {
        if (!this.estado) throw new Error("No se puede ingresar personas, la atraccion esta inactiva")
        if ((this.cantidadPersonasActuales + cantidad) <= this.capacidadMaximaDePersonas){
            this.cantidadPersonasActuales += cantidad
        } else {
            throw new Error("capacidad maxima de personas insuficiente")
        }
    }
    /**
     * imprime el estado de la atracción
     */
    mostrarInformacion(): void {
        //const relacionUsada =  this.cantidadPersonasActuales/this.capacidadMaximaDePersonas
        const a = this.nombre
        const b = this.precioBaseEntrada
        const c = this.capacidadMaximaDePersonas
        const d = this.cantidadPersonasActuales
        const e = this.estado? 'activo' : 'inactivo'
        console.log(`
            ┌─────────────────────────────────────┐
            │             Informacion             │   
            ├─────────────────────────────────────┤
            │nombre:            ${a}              │
            │precio Base:       ${b}              │
            │capacidad maxima:  ${c}              │
            │capacidad usada:   ${d}              │
            │estado:            ${e}              │
            └─────────────────────────────────────┘
        `)
    }
}