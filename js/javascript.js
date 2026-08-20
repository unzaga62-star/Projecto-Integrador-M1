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
const mensajeGuardado= document.getElementById("mensaje-guardado");
const errorNombre = document.getElementById("error-nombre");

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

function convertirHexAHsl(colorHex) {

    const rojo = parseInt(colorHex.substring(1, 3), 16) / 255;
    const verde = parseInt(colorHex.substring(3, 5), 16) / 255;
    const azul = parseInt(colorHex.substring(5, 7), 16) / 255;

    const max = Math.max(rojo, verde, azul);
    const min = Math.min(rojo, verde, azul);

    let h = 0;
    let s = 0;

    const l = (max + min) / 2;

    if (max !== min) {

        const diferencia = max - min;

        if (l > 0.5) {
            s = diferencia / (2 - max - min);
        } else {
            s = diferencia / (max + min);
        }

        if (max === rojo) {
            h = (verde - azul) / diferencia;

            if (verde < azul) {
                h = h + 6;
            }

        } else if (max === verde) {
            h = (azul - rojo) / diferencia + 2;

        } else {
            h = (rojo - verde) / diferencia + 4;
        }

        h = h / 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    const luminosidad = Math.round(l * 100);

    return "hsl(" + h + ", " + s + "%, " + luminosidad + "%)";
}

function obtenerColorTexto(colorHex) {

    const rojo = parseInt(colorHex.substring(1, 3), 16);
    const verde = parseInt(colorHex.substring(3, 5), 16);
    const azul = parseInt(colorHex.substring(5, 7), 16);

    const brillo = (rojo + verde + azul) / 3;

    if (brillo > 128) {
        return "#000000";
    } else {
        return "#FFFFFF";
    }
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

    // CONVERTIR EL HEX A HSL
    const colorHsl = convertirHexAHsl(colorAleatorio);

    console.log(colorAleatorio, colorHsl);

    const colorTexto = obtenerColorTexto(colorAleatorio);

    tarjeta.style.backgroundColor = colorAleatorio;

    tarjeta.style.color = colorTexto;

    tarjeta.classList.add ("color-tarjeta");
    
    divInfo.classList.add("color-info");

    titulo.textContent = colorAleatorio;
    descripcion.textContent = colorHsl;

    botonCopiar.textContent = "COPIAR";
    botonCopiar.classList.add("boton");

    botonCopiar.addEventListener("click", function() {

        navigator.clipboard.writeText(colorAleatorio);
    
        botonCopiar.textContent = "¡COPIADO!";
    
        setTimeout(function() {
            botonCopiar.textContent = "COPIAR";
        }, 1000);
    
    });



divInfo.appendChild (titulo);
divInfo.appendChild(descripcion);
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
    popup.classList.add("oculto");
    errorNombre.textContent = "";
    nombrePaleta.value = "";
});

botonpopupGuardar.addEventListener("click",function() {
    const nombre = nombrePaleta.value.trim();

    if (nombre === "") {
        errorNombre.textContent = "Debes escribir un nombre para la paleta";
        return;
    }

    errorNombre.textContent = "";

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

    //LIIMPIA EL TEXTO DEL POP UP
    nombrePaleta.value = "";

    //Cierra pop up de guardar
    popup.classList.add("oculto");


    //Mensaje box

    mensajeGuardado.classList.remove("oculto");

    //Efecto para que cierre post 1 segundo

    setTimeout(function() {
        mensajeGuardado.classList.add("oculto");
    }, 1200);

    console.log(paletasGuardadas);
})


function renderizarGuardados() {
    const datosGuardados = localStorage.getItem ("paletas");
    
    if(!datosGuardados) {
        listaGuardados.textContent = "Todavía no guardaste paletas.";
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

    botonCopiarPaletaGuardado.textContent="COPIAR";
    botonCopiarPaletaGuardado.classList.add("boton-copiar-paleta");

    botonCopiarPaletaGuardado.addEventListener("click", function() {

        const coloresCopiar = paletaGuardada.colores.join(", ");
    
        navigator.clipboard.writeText(coloresCopiar);
    
        botonCopiarPaletaGuardado.textContent = "¡COPIADO!";
    
        setTimeout(function() {
            botonCopiarPaletaGuardado.textContent = "COPIAR";
        }, 1000);
    
    });

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

