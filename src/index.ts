import {CLI} from './cli/CLI';
import { Carrusel } from './entidades/carrusel';
import { CasaDelTerror } from './entidades/casaDelTerror';
import { MontañaRusa } from './entidades/montanaRusa';
import { Parque } from './entidades/Parque';
import readLineSync from 'readline-sync';
import { Combustible } from './types/Combustibles.enum';

const parque = new Parque("El santiagueño")
const terminal = new CLI(parque)

const carruselPrueba = new Carrusel("carrusel de prueba",15, Combustible.ELECTRICIDAD,5000,1000)
const casaDelTerrorPrueba = new CasaDelTerror("casa del terror de prueba", 10, Combustible.ELECTRICIDAD,5000, 2000)
const montanaRusaPrueba = new MontañaRusa("montana rusa de prueba", 20, Combustible.ELECTRICIDAD,5000, 1500)

parque.agregarAtraccion(carruselPrueba);
parque.agregarAtraccion(casaDelTerrorPrueba);
parque.agregarAtraccion(montanaRusaPrueba);

let continuar = true;
while (continuar) {
    terminal.mostrarMenuPrincipal();
    try {
        const opcion = readLineSync.questionInt('\nSelecciona una opcion: ');
        continuar = terminal.ejecutarOpcion(opcion);
    } catch (error) {
        console.log('\n❌ Por favor, ingresa un numero valido.');
        readLineSync.question('Presiona ENTER para continuar...');
    }
}
