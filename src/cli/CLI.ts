import { Atraccion } from "../abstracts/atraccion.entity";
import { Carrusel } from "../entidades/carrusel";
import { CasaDelTerror } from "../entidades/casaDelTerror";
import { MontañaRusa } from "../entidades/montanaRusa";
import { Parque } from "../entidades/Parque";
import { TipoAtraccion } from "../types/Atracciones.enum";
import { MainMenuOpt as menu } from "../types/MenuPricipal";
import readLineSync from "readline-sync";
import { CenterText, BuildMenu } from "./utils/gui.utils"; 
import { Combustible } from "../types/Combustibles.enum";

export class CLI {
    private parque: Parque;

    constructor (parque: Parque) {
        this.parque = parque;
    }

    public mostrarMenuPrincipal(): void {
        const opciones = new Map<menu, string>([
            [menu.AGREGAR, "Agregar nueva atracción"],
            [menu.LISTAR, "Ver estado de todas las atracciones"],
            [menu.INGRESA_PERSONA, "Ingresar personas a una atracción"],
            [menu.ACTIVAR_DESACTIVAR, "Activar/Desactivar atracción"],
            [menu.SALIR, "Salir"]
        ])
        console.clear();

        const titulo = CenterText(64, "SISTEMA DE GESTIÓN DE PARQUE DE ATRACCIONES")
        const bienvenida = CenterText(64,"Bienvenido al sistema del")
        const nombreEmpresa = CenterText(64,this.parque.getNombre())
        console.log(`
        \r┌${"─".repeat(64)}┐\n\r│${titulo}│\n\r│${" ".repeat(64)}│
        \r│${bienvenida}│\n\r│${nombreEmpresa}│\n\r├${"─".repeat(64)}┤`);
        Array.from(opciones.entries()).forEach(([key,value]) => {
            console.log(`│ ${key.toString().padEnd(2)}. ${value.padEnd(59)}│`)
        });
        console.log(`└${"─".repeat(64)}┘`);

    }

    public ejecutarOpcion(opcion: menu): boolean {
        try {
            switch (+opcion) {
                case menu.AGREGAR:
                    this.agregarNuevaAtraccion();
                    break;
                case menu.LISTAR:
                    this.verEstadoAtracciones();
                    break;
                case menu.INGRESA_PERSONA:
                    this.ingresarPersonasAtraccion();
                    break;
                case menu.ACTIVAR_DESACTIVAR:
                    this.activarDesactivarAtraccion();
                    break;
                case menu.COSTO:
                    this.calcularCostoTotal();
                    break;
                case menu.SALIR:
                    this.salir();
                    break
                default:
                    console.log('\n❌ Opcion no válida. Por favor, selecciona una opcion del 1 al 8.');
            }
        } catch (error) {
            console.log(`\n❌ Error: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        } finally {
            this.pausar();
            return menu.SALIR !== +opcion;
        }
    }
    private calcularCostoTotal() {
        throw new Error("Method not implemented.");
    }
    private activarDesactivarAtraccion() {
        const atracciones = this.parque.listarAtracciones()
        const refresh = () => {
            let mapOpt = new Map(atracciones.map((atraccion) => ([atraccion.nombre, atraccion.mostrarInformacion()? 'activo' : 'inactivo'])))
            BuildMenu("Activar/Desactivar Atraccion", mapOpt)
        }
        refresh()
        const atraccion = readLineSync.questionInt("\nSelecciona un indice...")
        if (atraccion < 1 || atraccion > atracciones.length) {
            throw new Error('Indice de atracción no válido');
        }
        const seleccion = atracciones[atraccion-1]
        if (seleccion.mostrarInformacion()) {
            seleccion.desactivar()
        } else {
            seleccion.activar()
        }
        refresh()
    }

    private ingresarPersonasAtraccion() {
        const atracciones = this.parque.listarAtracciones()
        let mapOpt = new Map<string, string|number>(atracciones.map(({nombre}) => ([nombre, ``])))
        BuildMenu("Agregar personas", mapOpt)
        const atraccion = readLineSync.questionInt("\nSelecciona un indice...")
        if (atraccion < 1 || atraccion > atracciones.length) {
            throw new Error('Indice de atracción no válido');
        }
        const seleccion = atracciones[atraccion-1]
        mapOpt = new Map([
            ["Capacidad:", seleccion.capacidadMaxima()],
            ["Cantidad actual:", seleccion.capacidadMaxima()-seleccion.bancosDisponibles()],
            ["Disponible:", seleccion.bancosDisponibles()]
        ])
        BuildMenu(`Agregar personas: ${seleccion.nombre}`, mapOpt)
        const cantidad = readLineSync.questionInt("\nIngresa cantidad de personas: ")
        if(cantidad < 1 || isNaN(cantidad)) {
            throw new Error("Valor ingresado no valido")
        }
        seleccion.ingresarPersonas(cantidad)
    }
    private verEstadoAtracciones() {
        const atracciones = this.parque.listarAtracciones()
        const mapOpt = new Map(atracciones.map((atraccion) => ([atraccion.nombre, atraccion.mostrarInformacion()? 'activo' : 'inactivo'])))
        BuildMenu(`Estado de Atracciones`, mapOpt)
    }

    private agregarNuevaAtraccion() {

        const menuInputValues = new Map<string,string | number>([
            ["Tipo:", ""],
            ["Nombre:", ""],
            ["Precio:", ""],
            ["Capacidad:",""],
            ["Combustible:",""],
            ["Unidad de medida:",""],
            ["Consumo por hora:",""]
        ])
		const refresh = ()=> BuildMenu(`Nueva Atraccion`,menuInputValues)
        refresh()

        const tiposAtraccion = Object.values(TipoAtraccion)
        const tipo = readLineSync.keyInSelect(tiposAtraccion,'\nSelecciona el tipo de atraccion: ');
    
        menuInputValues.set("Tipo:", tiposAtraccion[tipo])
        refresh()

        const nombre = readLineSync.question('Nombre de la atraccion: ');
		menuInputValues.set("Nombre:",nombre)
		refresh()
		
        const precio = readLineSync.questionFloat('Precio base de entrada: $');
		menuInputValues.set("Precio:", precio)
		refresh()
		
        const capacidad = readLineSync.questionInt('Capacidad maxima de personas: ');
		menuInputValues.set("Capacidad:", capacidad)
		refresh()

        const indexCombustible = readLineSync.keyInSelect(Object.keys(Combustible),"Ingrese el tipo de combustible (electricidad, gas, etc.): ");
        const tipoCombustible = Object.values(Combustible)[indexCombustible];
        menuInputValues.set("Combustible:", tipoCombustible)
        menuInputValues.set("Unidad de medida:", tipoCombustible == Combustible.ELECTRICIDAD ? "KWH" : "LITROS")
        refresh()

        const consumoPorHora = readLineSync.questionFloat("Ingrese el consumo de energía por hora: ");
        menuInputValues.set("Consumo por hora:", consumoPorHora)
        refresh()

        let nuevaAtraccion;

        switch(tiposAtraccion[tipo]){
            case TipoAtraccion.CARRUSEL:
                nuevaAtraccion = this.#nuevoCarrusel(menuInputValues);
                //nuevaAtraccion = new Carrusel()
                break
            case TipoAtraccion.LA_CASA_DEL_TERROR:
                nuevaAtraccion = this.#nuevoCasaDelTerror(menuInputValues)
                break
            case TipoAtraccion.MONTANA_RUSA:
                nuevaAtraccion = this.#nuevoMontanaRusa(menuInputValues)
                break
            default:
                throw new Error("Tipo de atraccion no valido")
        }
        console.log(nuevaAtraccion)
        this.parque.agregarAtraccion(nuevaAtraccion)
    }

    #nuevoCarrusel(data: Map<string,string | number>) {
        
        const [ tipo, nombre, precio, capacidad, combustible, unidadMedida, consumoPorHora ] = data.values();
        const atraccion = new Carrusel(
            nombre as string, 
            capacidad as number,
            combustible as Combustible, 
            consumoPorHora as number, 
            precio as number);
        return atraccion
    }

    #nuevoCasaDelTerror(data: Map<string,string | number>) {
        
        const [ tipo, nombre, precio, capacidad, combustible, unidadMedida, consumoPorHora ] = data.values();
        const atraccion = new CasaDelTerror(
            nombre as string, 
            capacidad as number,
            combustible as Combustible, 
            consumoPorHora as number, 
            precio as number);
        return atraccion
    }

    #nuevoMontanaRusa(data: Map<string,string | number>) {
        
        const [ tipo, nombre, precio, capacidad, combustible, unidadMedida, consumoPorHora ] = data.values();
        const atraccion = new MontañaRusa(
            nombre as string, 
            capacidad as number,
            combustible as Combustible, 
            consumoPorHora as number, 
            precio as number);
        return atraccion
    }

    private salir(): void {
        console.clear();
        const titulo = CenterText(70,"GRACIAS POR USAR EL SISTEMA")
        const nombreEmpresa = CenterText(70,this.parque.getNombre())
        const saludo = CenterText(70,"¡Que tengas un excelente día!")
        console.log(`
            \r┌${"─".repeat(70)}┐
            \r│${titulo}│
            \r│${" ".repeat(70)}│
            \r│${nombreEmpresa}│
            \r│${" ".repeat(70)}│
            \r│${saludo}│
            \r└${"─".repeat(70)}┘`);
    }

    private pausar(): void {
        console.log('\n');
        readLineSync.question('Presiona ENTER para continuar...');
    }
}