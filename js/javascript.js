console.log("Script conectado");

const selectorCantidad = document.getElementById("selector-cantidad");
const BotonGenerar = document.getElementById ("generar-paleta");
const ContenedorPaleta = document.getElementById("contenedor-paleta");
const GuardarPaleta= document.getElementById("guardar-paleta");
const botonpopupGuardar= document.getElementById("guardar");
const botonpopupCancelar= document.getElementById("cancelar");
const popup= document.getElementById("popup-guardar");
const nombrePaleta= document.getElementById("nombre-paleta");
const listaGuardados = document.getElementById("lista-guardados");
const mensajeGuardado= document.getElementById("mensaje-guardado")

let paletaActual=[];


console.log("Elemento Selector:", selectorCantidad);
console.log("Elemento Boton:", BotonGenerar);
console.log("Elemento Contenedor:", ContenedorPaleta );
console.log("guardar-paleta",GuardarPaleta);

function generarColorHex () {
    const caracteres = "0123456789ABCDEF";
    let color = "#";


for (let i = 0; i < 6; i++) {
    const indiceAleatorio = Math.floor(Math.random()* caracteres.length);
    color += caracteres[indiceAleatorio]; 
}

return color;
}

console.log("color aleatorio de prueba:", generarColorHex());

function renderizarPaleta() {
    const cantidad = parseInt (selectorCantidad.value);
    ContenedorPaleta.innerHTML= "";
    paletaActual = [];

for (let i = 0; i < cantidad; i++) {
    const tarjeta = document.createElement("article");
    const divInfo= document.createElement("div");
    const titulo = document.createElement("h3");
    const descripcion = document.createElement("p");
    const botonCopiar = document.createElement ("button");

    const colorAleatorio = generarColorHex();
    paletaActual.push(colorAleatorio);

    tarjeta.style.backgroundColor = colorAleatorio;

    tarjeta.classList.add ("color-tarjeta");
    
    divInfo.classList.add("color-info");

    titulo.textContent = colorAleatorio;

    botonCopiar.textContent = "Copiar";
    botonCopiar.classList.add("boton");

    botonCopiar.addEventListener("click",function() {
        console.log("color copiado");

})

divInfo.appendChild (titulo);
divInfo.appendChild(botonCopiar);

tarjeta.appendChild(divInfo);

ContenedorPaleta.appendChild(tarjeta);
}

};


BotonGenerar.addEventListener("click",renderizarPaleta);

GuardarPaleta.addEventListener("click",function() {
    popup.classList.remove("oculto");
});

botonpopupCancelar.addEventListener("click",function() {
    popup.classList.add("oculto")
});

botonpopupGuardar.addEventListener("click",function() {
    const nombre = nombrePaleta.value;

    const paletaGuardada = { 
        nombre: nombre,
        colores: paletaActual,
    };

    const datosGuardados = localStorage.getItem("paletas");

    let paletasGuardadas;

    if(datosGuardados) {
        paletasGuardadas = JSON.parse(datosGuardados);
    } else {
        paletasGuardadas =[]
    }

    paletasGuardadas.push(paletaGuardada);

    localStorage.setItem(
        "paletas",
        JSON.stringify(paletasGuardadas)
    );

    
    //

    renderizarGuardados ();

    //Cierra pop up de guardar
    popup.classList.add("oculto");


    //Mensaje box

    mensajeGuardado.classList.remove("oculto");

    //Efecto para que cierre post 1 segundo

    setTimeout(function() {
        mensajeGuardado.classList.add("oculto");
    }, 1000);

    console.log(paletasGuardadas);
})


function renderizarGuardados() {
    const datosGuardados = localStorage.getItem ("paletas");
    
    if(!datosGuardados) {
        return;
    }
    
    const paletasGuardadas = JSON.parse (datosGuardados);

    
    listaGuardados.innerHTML="";

    for (let i = 0; i < paletasGuardadas.length; i++) {

    const paletaGuardada = paletasGuardadas[i];

    const tarjetaGuardada = document.createElement("article");
    const tituloGuardado = document.createElement("h3");
    const miniColores = document.createElement("div");
    const accionesGuardado = document.createElement("div");
    const botonCopiarPaletaGuardado = document.createElement("button");


    accionesGuardado.classList.add ("acciones-guardado");

    botonCopiarPaletaGuardado.textContent="Copiar";
    botonCopiarPaletaGuardado.classList.add("boton-copiar-paleta");

    tarjetaGuardada.classList.add("paleta-guardada");
    miniColores.classList.add("mini-colores");

    tituloGuardado.textContent = paletaGuardada.nombre;

    for (let j = 0; j < paletaGuardada.colores.length; j++) {

    const miniColor=document.createElement("div");

    miniColor.style.backgroundColor = paletaGuardada.colores[j];
    miniColor.classList.add("mini-color");

    miniColores.appendChild(miniColor);
    
    }


accionesGuardado.appendChild(botonCopiarPaletaGuardado);

tarjetaGuardada.appendChild(tituloGuardado);
tarjetaGuardada.appendChild(miniColores);
tarjetaGuardada.appendChild(accionesGuardado);

listaGuardados.appendChild(tarjetaGuardada);
    }
}
renderizarPaleta();

renderizarGuardados();

