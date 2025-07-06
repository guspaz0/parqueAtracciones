import {CLI} from './cli/CLI';
import { Parque } from './entidades/Parque';
import readLineSync from 'readline-sync';

const parque = new Parque("El santiagueño")
const terminal = new CLI(parque)

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
