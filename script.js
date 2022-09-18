// LISTA PALABRA DE JUEGO
let list_words = [
    'VEGETAL',
    'MARIPOSA',
    'PANTALLA',
    'BIBLIOTECA'
];
// PALABRA A ADIVINAR
let default_word = '';
// ARREGLO A GRAFICAR
let arrDefaultWord = [];
let arrGraficar = [];
// CONTADOR DE ERRORES
let cantidadErrores = 0;
let cantidadAciertos = 0;
let lblErrores = document.getElementById('__lblErrores');
let finJuego = true;
// ANCHO DE VENTALLA
let widthScreen = window.innerWidth;

// OBTENER CANVAS PARA CARACTERES
const canvCaracteres = document.getElementById('__pizarra');
    canvCaracteres.height = 60;
    canvCaracteres.width = 600;
const cntxCaracteres = canvCaracteres.getContext("2d");

// OBTENER CANVAS AHORCADO
const canvAhorcado = document.getElementById('__ahorcado');
    canvAhorcado.height = 300;
    canvAhorcado.width = widthScreen;
const cntxAhorcado = canvAhorcado.getContext("2d");


function inicializarVariables() {
    // Limpiar errores
    lblErrores.innerHTML = '';

    arrGraficar = [];
    cantidadErrores = 0;
    cantidadAciertos = 0;

    finJuego = false;

    // LIMPIAMOS CANVAS
    cntxCaracteres.clearRect(0, 0, canvCaracteres.width, canvCaracteres.height);
    cntxAhorcado.clearRect(0, 0, canvAhorcado.width, canvAhorcado.height);
};
// LANZAR PALABRA NUEVA E INICIAR JUEGO
function lanzar__palabra() {
    console.log(finJuego);
    let w = document.getElementById('txtNuevaPalabra').value;
    default_word = w.toString().toUpperCase();
    // Lanzar
    document.getElementById('txtNuevaPalabra').value = '';
    iniciar__juego(default_word);
}
function definir__arreglo__graficar(xPalabra) {
    let cnt = -15; // step 40
    // EXPLOTAMOS PALABRA EN ARREGLO Y CREAMOS UNA COPIA VACIA
    arrDefaultWord = xPalabra.split('');
    // CREAR COPIA VACIA
    arrDefaultWord.map((e) => {
        arrGraficar.push([' ', cnt + 40]);
        cnt = cnt + 40;
    });

    // DEFINIENDO ANCHO CANVAS DE CARACTERES PARA CENTRAR EN PANTALLA
    canvCaracteres.width = (arrDefaultWord.length * 40) + 10;

    // IMPRIMIR ARREGLO CARACTERES PARA AYUDA DE USUARIO POR PRIMERA VEZ
    graficar__arreglo(arrGraficar);
}
function iniciar__juego(xWord) {
    // REINICIAR VARIABLES
    inicializarVariables();
    
    // DEFINIR PALABRA A JUGAR
    if (xWord.length === 0) {
        // ELEGIR PALABRA AL AZAR
        let rndIndex = Math.floor(Math.random() * (list_words.length));
        default_word = list_words[rndIndex];
        console.log(default_word);
    } else {
        default_word = xWord;
    }
    

    // DEFINIR ARREGLO DE PALABRA PARA JUGAR
    definir__arreglo__graficar(default_word);
}
function graficar__arreglo(xArregloGrafica) {
    let _y = 30;

    // DEFINIR FUENTE Y ALINEACION
    cntxCaracteres.font = "30px Verdana";
    cntxCaracteres.textAlign = "center";
    cntxCaracteres.lineWidth = 3;
    // RECORRER ARREGLO A GRAFICAR
    cntxCaracteres.beginPath();
    for (let _x = 0; _x < xArregloGrafica.length; _x++) {
        // DIBUJAR CARACTER
        let char = '';
        cntxCaracteres.fillText(xArregloGrafica[_x][0], xArregloGrafica[_x][1], _y);

        // COLOR Y GROSOR
        cntxCaracteres.strokeStyle = "blue";
        
        // GRAFICAR
        cntxCaracteres.moveTo(xArregloGrafica[_x][1] - 15, _y + 10); // 0 = x - 15
        cntxCaracteres.lineTo(xArregloGrafica[_x][1] + 15, _y + 10);
        cntxCaracteres.stroke();
        // FINALIZAR
    }
    cntxCaracteres.fill();
    
}
function buscar_letra(event) {
    // VERIFICAR SI FIN JUEGO
    if (finJuego) {
        return;
    }

    let encontrado = false;
    // RECORRER ARREGLO DE PALABRA EN BUSCA DE LETRA
    for(let x = 0; x < arrDefaultWord.length; x++) {
        // SI ENCUENTRA LA LETRA EN EL ARREGLO
        if (arrDefaultWord[x] === event.key.toString().toUpperCase()) {
            // COPIAR CARACTER ENCONTRADO EN COPIA VACIA
            arrGraficar[x][0] = arrDefaultWord[x];
            // ENVIAR ARREGLO A GRAFICAR
            graficar__arreglo(arrGraficar);
            // ELIMINAMOS LA LETRA ENCONTRADA EN EL ARREGLO DE PALABRA
            arrDefaultWord[x] = '#';
            // AUMENTAR CANTIDAD ACIERTOS
            cantidadAciertos++;
            // INDICAR QUE SE ENCONTRO COINCIDENCIA
            encontrado = true;
            break;
        }
    }
    // VERIFICAR SI NO SE ENCONTRO COINCIDENCIA
    if (!encontrado) {
        lblErrores.innerHTML += `<span>${event.key.toUpperCase()}</span>`;
        // SUMAMMOS CANTIDAD DE ERRORES
        cantidadErrores++;
        // GRAFICAMOS AHORCADO
        graficarAhorcado(cantidadErrores);
    }
    // VERIFICAR SI FIN DE JUEGO
    if (cantidadAciertos === arrDefaultWord.length) {
        // MOSTRAR VENTANA GANASTE
        finJuego = true
        show__page(5);
    }
}

function graficarAhorcado(xErrores) {
    switch (xErrores) {
        case 1:
            ahorcado_1();
            break;
        case 2:
            ahorcado_2();
            break;
        case 3:
            ahorcado_3();
            break;
        case 4:
            ahorcado_4();
            break;
        case 5:
            ahorcado_5();
            show__page(4);
            finJuego = true;
            break;
    }
}
// DIBUJAR FASES DE AHORCADO
function ahorcado_1() {
    let cen_x = widthScreen / 2;

    // BASE
    cntxAhorcado.beginPath();
    cntxAhorcado.moveTo(cen_x - 60, 299);
    cntxAhorcado.lineTo(cen_x + 60, 299);
    cntxAhorcado.stroke();
    
    // TORRE
    cntxAhorcado.beginPath();
    cntxAhorcado.moveTo(cen_x, 300);
    cntxAhorcado.lineTo(cen_x, 0);
    cntxAhorcado.stroke();
    
    // TECHO
    cntxAhorcado.beginPath();
    cntxAhorcado.moveTo(cen_x, 1);
    cntxAhorcado.lineTo(cen_x + 100, 1);
    cntxAhorcado.stroke();
    
    // GANCHO
    cntxAhorcado.beginPath();
    cntxAhorcado.moveTo(cen_x + 100, 0);
    cntxAhorcado.lineTo(cen_x + 100, 50);
    cntxAhorcado.stroke();
}
function ahorcado_2() {
    let cen_x = widthScreen / 2;    

    // CIRCULO
    cntxAhorcado.beginPath();
    cntxAhorcado.arc(cen_x + 100, 70, 20, 0, 2 * Math.PI);
    cntxAhorcado.stroke();
}
function ahorcado_3() {
    let cen_x = widthScreen / 2;    

    // COLUMNA
    cntxAhorcado.beginPath();
    cntxAhorcado.moveTo(cen_x + 100, 90);
    cntxAhorcado.lineTo(cen_x + 100, 160);
    cntxAhorcado.stroke();
}
function ahorcado_4() {
    let cen_x = widthScreen / 2;    

    // TOP IZQUIERDO
    cntxAhorcado.beginPath();
    cntxAhorcado.moveTo(cen_x + 100, 90);
    cntxAhorcado.lineTo(cen_x + 70, 140);
    cntxAhorcado.stroke();

    // TOP DERECHO
    cntxAhorcado.beginPath();
    cntxAhorcado.moveTo(cen_x + 100, 90);
    cntxAhorcado.lineTo(cen_x + 130, 140);
    cntxAhorcado.stroke();
}
function ahorcado_5() {
    let cen_x = widthScreen / 2;    

    // TOP IZQUIERDO
    cntxAhorcado.beginPath();
    cntxAhorcado.moveTo(cen_x + 100, 160);
    cntxAhorcado.lineTo(cen_x + 70, 200);
    cntxAhorcado.stroke();

    // TOP DERECHO
    cntxAhorcado.beginPath();
    cntxAhorcado.moveTo(cen_x + 100, 160);
    cntxAhorcado.lineTo(cen_x + 130, 200);
    cntxAhorcado.stroke();
}