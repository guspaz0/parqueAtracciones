import { Combustible } from "../types/Combustibles.enum";
import { UnidadMedida } from "../types/UnidadMedida";

export class ConsumoEnergia {
    protected readonly tipoCombustible!: Combustible;
    
    /**
     * Consumo de energia aproximado por hora
     */
    protected readonly consumoPorHora: number;

    protected readonly unidadMedida: UnidadMedida;
    /**
     * tiempo en minutos transcurridos desde la ultima vez que se activó la atraccion
     */
    protected tiempoActivo: number = 0;
    private timerDaemon!: NodeJS.Timeout;

    constructor(consumoPorHora: number, tipoCombustible: Combustible){
        this.consumoPorHora = consumoPorHora;
        this.tipoCombustible = tipoCombustible;
        this.unidadMedida = tipoCombustible == Combustible.ELECTRICIDAD
            ? UnidadMedida.KWH 
            : UnidadMedida.LITROS;
    }

    /**
     * Iniciar contador de minutos
     */
    protected iniciar(){
        this.tiempoActivo = 0;
        this.timerDaemon = setInterval(()=> {
            this.tiempoActivo += 1
        },1000*60);
    }

    /**
     * detiene el contador de minutos de energia consumida
     */
    protected detener(){
        clearInterval(this.timerDaemon)
    }

    /**
     * Muestra informacion por consola sobre parametros de energia
     */
    protected mostrarInformacionEnergia(){
        return {
            tipo: this.tipoCombustible,
            consumoPorHora: this.consumoPorHora,
            tiempoActivo: this.tiempoActivo
        }
    }
}