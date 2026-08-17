console.log("Script conectado");

const selectorCantidad = document.getElementById("selector-cantidad");
const BotonGenerar = document.getElementById ("generar-paleta");
const ContenedorPaleta = document.getElementById("contenedor-paleta");
const GuardarPaleta= document.getElementById("guardar-paleta");
const botonpopupGuardar= document.getElementById("guardar");
const botonpopupCancelar= document.getElementById("cancelar");
const popup= document.getElementById("popup-guardar");
const nombrePaleta= document.getElementById("nombre-paleta");

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
    
    divInfo.classList.add("color-info")

    titulo.textContent = colorAleatorio;

    botonCopiar.textContent = "Copiar";
    botonCopiar.classList.add("boton");

    botonCopiar.addEventListener("click",function() {
        console.log("color copiado")

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

    localStorage.setItem(
        "paleta",
        JSON.stringify(paletaGuardada)
    );

    console.log(paletaGuardada);
});


renderizarPaleta()

