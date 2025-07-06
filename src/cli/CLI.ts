import { Parque } from "../entidades/Parque";
import { TipoAtraccion } from "../types/Atracciones.enum";
import { MainMenuOpt } from "../types/MenuPricipal";
import readLineSync from "readline-sync";

export class CLI {
    private parque: Parque;

    constructor (parque: Parque) {
        this.parque = parque;
    }
    public mostrarMenuPrincipal(): void {
        const opciones = new Map<MainMenuOpt, string>([
            [MainMenuOpt.AGREGAR, "Agregar nueva atracción"],
            [MainMenuOpt.LISTAR, "Ver estado de todas las atracciones"],
            [MainMenuOpt.INGRESA_PERSONA, "Ingresar personas a una atracción"],
            [MainMenuOpt.ACTIVAR_DESACTIVAR, "Activar/Desactivar atracción"],
            [MainMenuOpt.ESTADISTICAS, "Ver estadísticas del parque"],
            [MainMenuOpt.MANTENIMIENTO, "Realizar mantenimiento (solo carruseles)"],
            [MainMenuOpt.SALIR, "Salir"]
        ])
        console.clear();
        console.log(`
        \r┌────────────────────────────────────────────────────────────────┐
        \r│           SISTEMA DE GESTIÓN DE PARQUE DE ATRACCIONES          │
        \r│                                                                │
        \r│                    Bienvenido al sistema del                   │
        \r│                    ${this.parque.getNombre().toUpperCase().padEnd(44)}│
        \r├────────────────────────────────────────────────────────────────┤`);
        Array.from(opciones.entries()).forEach(([key,value]) => {
            console.log(`│ ${key.toString().padEnd(2)}. ${value.padEnd(59)}│`)
        });
        console.log(`└────────────────────────────────────────────────────────────────┘`);

    }

    public ejecutarOpcion(opcion: MainMenuOpt): boolean {
        try {
            switch (+opcion) {
                case MainMenuOpt.AGREGAR:
                    this.agregarNuevaAtraccion();
                    break;
                case MainMenuOpt.LISTAR:
                    this.verEstadoAtracciones();
                    break;
                case MainMenuOpt.INGRESA_PERSONA:
                    this.ingresarPersonasAtraccion();
                    break;
                case MainMenuOpt.ACTIVAR_DESACTIVAR:
                    this.activarDesactivarAtraccion();
                break;
                case MainMenuOpt.COSTO:
                    this.calcularCostoTotal();
                    break;
                case MainMenuOpt.ESTADISTICAS:
                    this.verEstadisticas();
                    break;
                case MainMenuOpt.MANTENIMIENTO:
                    this.realizarMantenimiento();
                    break;
                case MainMenuOpt.SALIR:
                    this.salir();
                    return false;
                default:
                    console.log('\n❌ Opcion no válida. Por favor, selecciona una opcion del 1 al 8.');
            }
        } catch (error) {
            console.log(`\n❌ Error: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        } finally {
            this.pausar();
            return true;
        }
    }
    private realizarMantenimiento() {
        throw new Error("Method not implemented.");
    }
    private verEstadisticas() {
        throw new Error("Method not implemented.");
    }
    private calcularCostoTotal() {
        throw new Error("Method not implemented.");
    }
    private activarDesactivarAtraccion() {
        throw new Error("Method not implemented.");
    }
    private ingresarPersonasAtraccion() {
        throw new Error("Method not implemented.");
    }
    private verEstadoAtracciones() {
        throw new Error("Method not implemented.");
    }
    private agregarNuevaAtraccion() {
        const opciones = Array.from(Object.keys(TipoAtraccion))
        console.clear();
        function header(){
            console.log(`
            \r┌────────────────────────────────────────────────────────────────┐
            \r│                     AGREGAR NUEVA ATRACCIÓN                    │
            \r├────────────────────────────────────────────────────────────────┤`);
        }
        header()
        console.log(`
            \r└────────────────────────────────────────────────────────────────┘`)

    }

    private salir(): void {
        console.clear();
        console.log(`
            \r┌────────────────────────────────────────────────────────────────┐
            \r│                  GRACIAS POR USAR EL SISTEMA                   │
            \r│                                                                │
            \r│                   ${this.parque.getNombre().toUpperCase().padEnd(44)} │
            \r│                                                                │
            \r│                  ¡Que tengas un excelente día!                 │
            \r└────────────────────────────────────────────────────────────────┘`);
    }

    private pausar(): void {
        console.log('\n');
        readLineSync.question('Presiona ENTER para continuar...');
    }
}