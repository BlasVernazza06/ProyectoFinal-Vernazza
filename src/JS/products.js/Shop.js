let carrito = JSON.parse(localStorage.getItem("miCarrito")) || [];

const buttonAdd = document.getElementsByClassName("Buy-Button")

const gridContainer = document.querySelector(".grid-Products");

function renderProductos() {
    gridContainer.innerHTML = "";
    //👇 console.log explicativo
    console.log("👇 este console.log, realiza un muestra de desestructuracion y acceso condicional a un objeto ") 
    productosCompra.forEach((producto) => {
        
        console.log(producto?.precio < 500.000  || "No existe un vuelo a ese precio")
        const desestructuracion = ( {precio, nombre}) => {
            if (precio > 500.000) {
                console.log(`El vuelo con un precio mayor a a 500.000 es ${nombre} y cuesta $${precio}`)
            }
        }
        desestructuracion(producto)
        const cardStructure = `
            <div class="Products ${producto.numProducto} animate__animated animate__zoomIn" >
                <img class="Product-Image" src="${producto.imagen}" alt="FotoMaldivas">

                <div class="Product-text">
                    <div class="title-card">
                        <p>${producto.nombre}</p>
                    </div>
                    <div class="subtitle-card">
                        <p>Desde <strong>${producto.desde}</strong> Hasta <strong>${producto.hasta}</strong></p>
                        <img src="src/images/products/Avion-Cards.svg" alt="AvionCard">
                        <span>Vuelo desde ${producto.origen} <img src="src/images/products/Flechas-Cards.svg" alt="FlechasDeLasCards"> ${producto.destino}</span>
                    </div>
                </div>
                <div class="footer-product">
                    <div class="footer-text">
                        <p class="first">Precio individual por persona</p>
                        <p class="second"> $ <span>${producto.precio}</span></p>
                        <p class="third"> Incluye impuestos, tasas y cargos</p>
                    </div>
                    
                    <div class="button-section"> 
                        <button onclick="agregarProductos(${producto.id}, this)" class="Buy-Button">Comprar</button>
                    </div>
                </div>
            </div>`;

        gridContainer.innerHTML += cardStructure;
    });
};

// Utilizacion de Asincronia, en donde se renderizan los productos luego de cierto tiempo
function RenderizacionAsincronica() {
    return new Promise((resolve) => {
        let contador = 0;
        const interval = setInterval(() => {
            contador++;
            console.log("Contador: ", contador);
            if (contador >= 6) {
                clearInterval(interval);
                resolve(); // Resuelve la promesa
            }
        }, 150);
    });
}

// Llamada a la función y manejo de la promesa
RenderizacionAsincronica(true)
    .then(() => {
        renderProductos(); // Se renderizan los productos después de que la promesa se resuelve
        console.log("");
        console.log("👇 este console, se resuelve al resolver la promesa");
        console.log("La renderización se completó.");
    })
    .catch((error) => {
        console.log(error);
    });
 
function agregarProductos(idProducto, button) {
    const productoElegido = productosCompra.find((producto) => producto.id == idProducto);
    const productoEnCarrito=carrito.find(producto => producto.id === productoElegido.id)

    if(productoEnCarrito){
        productoEnCarrito.cantidad++
        localStorage.setItem('miCarrito', JSON.stringify(carrito))
        console.log(localStorage);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Guardado con éxito",
            showConfirmButton: false,
            timer: 700
        });
    }
    else{
        carrito.push(productoElegido)
        localStorage.setItem('miCarrito',JSON.stringify(carrito))
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Guardado con éxito",
            showConfirmButton: false,
            timer: 700
        });
    }
    
    


    // Ejemplo de Asincronia, Modificando el DOM una vez que se agrega el producto al carrito
    setTimeout(() => {
        button.textContent = "En el Carrito";
        button.style.backgroundColor = '#11f037'; // Color de fondo cuando está en el carrito
        button.style.color = 'black'; // Color del texto

        // Funciones para manejar el hover
        const handleMouseOver = () => {
            button.style.borderColor = '#f07d11';
            button.style.backgroundColor = 'white';
            button.style.color = '#f07d11';
            button.textContent = "Seguir comprando" // Cambia el color del fondo al pasar el mouse
        };

        const handleMouseOut = () => {
            button.style.backgroundColor = '#11f037'; // Mantiene el color de fondo cuando está en el carrito
            button.style.color = 'black'; // Mantiene el color del texto
            button.textContent = "En el Carrito"
        };

        // Agregar los event listeners para el hover
        button.addEventListener('mouseover', handleMouseOver);
        button.addEventListener('mouseout', handleMouseOut);
    }, 400);
}

