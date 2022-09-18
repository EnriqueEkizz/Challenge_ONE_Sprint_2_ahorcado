// ANCHO DE NAVEGADOR
let first_page = '__win__1';

// MOSTRAR PAGINA 'AGREGAR PALABRA'
function show__page(xPage) {
    // BAJAR ANTERIOR PAGINA
    document.getElementById(first_page).style.zIndex = 1
    // MOSTRAR NUEVA PAGINA
    first_page = '__win__' + xPage;
    document.getElementById(first_page).style.zIndex = 2

    switch(xPage){
        case 2:
            document.getElementById('txtNuevaPalabra').focus();
    }
}