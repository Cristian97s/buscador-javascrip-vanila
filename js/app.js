// variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//contenerdor para resultados
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max - 10;

//generar un objeto con la busqueda
const datosBusqueda = {
    marca : '',
    modelo : '',
    year : '',
    minimo : '',
    maximo : '',
    puertas : '',
    transmision : '',
    color : '',
}

// eventos
document.addEventListener('DOMContentLoaded', ()=> {
    mostrarAutos(autos); //muestra los autos al cargar

    // llena las opciones de años
    llenarSelect();
})

// event listener para los select de busqueda
marca.addEventListener('change', e => { 
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
});

year.addEventListener('change', e => {
    datosBusqueda.year = parseInt( e.target.value );

    filtrarAuto();
});

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;

    filtrarAuto();
});

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;

    filtrarAuto();
});

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt( e.target.value );

    filtrarAuto();
});

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;

    filtrarAuto();
});

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;

    filtrarAuto();
});

// funciones
function mostrarAutos(autos) {

    limpiarHTML(); // Eliminar el HTML previo

    autos.forEach( auto => {

        const {marca,modelo, year, puertas, transmision, precio, color} = auto;
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas- Tramsmisión: ${transmision} - Precio: ${precio} - Color: ${color}
        `;

        // insertar en el html
        resultado.appendChild(autoHTML)
    })
}

// limpiar HTML
function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

// genera los años del slecet
function llenarSelect() {
    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion)//agrega las opciones del años
    }
}

//funcion que filtra en base a la busqueda
function filtrarAuto() {
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear).filter( filtrarMinimo ).filter( filtrarMaximo).filter( filtrarPuertas ).filter( filtrarTransmision ).filter( filtrarColor );

    if( resultado.length ) {
        mostrarAutos(resultado);
    }else {
        noResultado();
    }
}

function noResultado() {

    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta','error');
    noResultado.textContent = 'No hay resultados';
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
    const { marca } = datosBusqueda;
    if( marca ){
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto) {
    const { year } = datosBusqueda;
    if( year ){
        return auto.year === year;
    }
    return auto;
}

function filtrarMinimo(auto) {
    const { minimo } = datosBusqueda;
    if( minimo ){
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto) {
    const { maximo } = datosBusqueda;
    if( maximo ){
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto) {
    const { puertas } = datosBusqueda;
    if( puertas ){
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto) {
    const { transmision } = datosBusqueda;
    if( transmision ){
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto) {
    const { color } = datosBusqueda;
    if( color ){
        return auto.color === color;
    }
    return auto;
}