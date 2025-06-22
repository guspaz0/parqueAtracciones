export abstract class ConsumoEnergia {
    protected readonly tipoCombustible!: 'Combustible' | 'Electricidad';
    
    /**
     * Consumo de energia aproximado por hora
     */
    protected readonly consumoPorHora: number;
    /**
     * tiempo en minutos transcurridos desde la ultima vez que se activó la atraccion
     */
    protected tiempoActivo: number = 0;
    private timerDaemon!: NodeJS.Timeout;

    constructor(consumoPorHora: number, tipoCombustible: 'Combustible' | 'Electricidad' ){
        this.consumoPorHora = consumoPorHora;
        this.tipoCombustible = tipoCombustible;
    }

    /**
     * Iniciar contador de minutos
     */
    iniciar(){
        this.tiempoActivo = 0;
        this.timerDaemon = setInterval(()=> {
            this.tiempoActivo += 1
        },1000*60);
    }

    /**
     * detiene el contador de minutos de energia consumida
     */
    detener(){
        clearInterval(this.timerDaemon)
    }

    /**
     * Muestra informacion por consola sobre parametros de energia
     */
    mostrarInformacionEnergia(){
        const h = this.tipoCombustible;
        const f = this.consumoPorHora;
        const g = this.tiempoActivo;
        console.log(`
            ┌─────────────────────────────────────┐
            │           Consumo Energia           │   
            ├─────────────────────────────────────┤
            │tipo combustible:  ${h}              │
            │consumo por hora:  ${f}              │
            │tiempo activo (M): ${g}              │
            └─────────────────────────────────────┘
        `)
    }
}