console.log("Script conectado");

const selectorCantidad = document.getElementById("selector-cantidad");
const BotonGenerar = document.getElementById ("GenerarPaleta");
const ContenedorPaleta = document.getElementById("contenedor-paleta");

console.log("Elemento Selector:", selectorCantidad);
console.log("Elemento Boton:", BotonGenerar);
console.log("Elemento Contenedor:", ContenedorPaleta );


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

for (let i = 0; i < cantidad; i++) {
    const tarjeta = document.createElement("article");
    const divInfo= document.createElement("div");
    const titulo = document.createElement("h3");
    const descripcion = document.createElement("p");
    const botonCopiar = document.createElement ("button")


    const colorAleatorio = generarColorHex();

    tarjeta.style.backgroundColor = colorAleatorio;
    tarjeta.classList.add ("color-tarjeta");

    titulo.textContent = colorAleatorio;
    descripcion.textContent = "Copiar";

    botonCopiar.textContent = "Copiar";
    botonCopiar.classList.add("boton");

    botonCopiar.addEventListener("click",function() {
        console.log("color copiadoo")

})

divInfo.appendChild (titulo);
tarjeta.appendChild(divInfo);
divInfo.appendChild(botonCopiar);

ContenedorPaleta.appendChild(tarjeta);
}

}

BotonGenerar.addEventListener("click",renderizarPaleta);

renderizarPaleta();

