# Generador de Paletas de Colores

Aplicación web que permite generar paletas de colores aleatorias,
visualizar sus códigos de color y guardar las paletas favoritas para
consultarlas posteriormente.

## Funcionalidades

-   Generación aleatoria de paletas de colores.
-   Selección de cantidad de colores: 6, 8 o 9.
-   Visualización de los colores en formato HEX y HSL.
-   Adaptación automática del color del texto según el fondo para
    mejorar su legibilidad.
-   Copiado del código HEX de cada color al portapapeles.
-   Guardado de paletas con un nombre personalizado.
-   Persistencia de las paletas guardadas mediante LocalStorage.
-   Visualización de las paletas guardadas.
-   Copiado de los colores de una paleta guardada.
-   Validación para evitar guardar una paleta sin nombre.
-   Mensajes visuales de confirmación y error.
-   Diseño responsive para adaptarse a distintos tamaños de pantalla.

## Tecnologías utilizadas

-   HTML5
-   CSS3
-   JavaScript
-   LocalStorage

## Funcionamiento

Al ingresar a la aplicación se genera automáticamente una paleta de
colores.

El usuario puede seleccionar la cantidad de colores que desea generar y
presionar el botón **Generar paleta** para obtener una nueva combinación
aleatoria.

Cada color muestra su código HEX y su correspondiente valor HSL. El
botón **Copiar** permite copiar el código HEX al portapapeles.

También es posible guardar la paleta actual utilizando el botón
**Guardar paleta**. El usuario debe ingresar un nombre para
identificarla.

Las paletas guardadas se almacenan utilizando LocalStorage, por lo que
permanecen disponibles aunque se recargue la página.

## Estructura del proyecto

``` text
/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
└── README.md
```

> La estructura puede variar según la organización final de los archivos
> del proyecto.

## Autor

Desarrollado por \[Ivo Unzaga\]
