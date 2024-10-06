const botonFinalizarCompra = document.querySelector(".pay-button"); 
const purchasesSection = document.getElementById("purchasesSec");
const mainSection = document.querySelector('main');
const precios = document.getElementById('subtotal-price');
const productoCarrito = JSON.parse(localStorage.getItem('miCarrito')) || [];

productoCarrito.length > 0 ? renderizarProductos() : console.log("El carrito está vacío o no se encontraron productos en localStorage.")

// https://restcountries.com/ api de paises, para colocar en los lugares a los que viaja



function renderizarProductos() {
    purchasesSection.innerHTML = ""; 
    productoCarrito.forEach((prod) => {
        const productCart = `
            <article class="cards">
                <p>ID: ${prod.id}</p>
                <div class="image_container">
                    <img src="${prod.imagen}" alt="">
                </div>
                <div class="text_container">
                    <strong><p>${prod.nombre}</p></strong>
                    <p>Sale el día ${prod.desde}. Regresa el ${prod.hasta}</p>
                </div>
                <div class="buttonsProduct">
                    <button class="delete" onclick="eliminarProducto(${prod.id})">Eliminar</button>
                    <button class="details" onclick="toggleDetailCard(${prod.id})">Ver Detalles</button>
                </div>
                <div class="separator"></div>
                <div class="priceSec">
                    <p class="price">Precio: $${prod.precio}</p>
                    <p>Cantidad: ${prod.cantidad}</p>
                </div>
            </article>`;

        purchasesSection.innerHTML += productCart;
    });
}


function toggleDetailCard(id) {
    // Encuentra el producto seleccionado en el carrito
    const productoSeleccionado = productoCarrito.find((producto) => producto.id == id);
    
    if (productoSeleccionado) {
        const url = `https://restcountries.com/v3.1/name/${productoSeleccionado.pais}`;
        console.log(url);
        
        fetch(url)
            .then((response) => response.json())
            .then(data => {
                const pais = data[0]; 
                
                // Crea la tarjeta de detalles
                const card = `
                    <section class="cardContainer">
                        <div class="img_containerProduct">
                            <img src="${productoSeleccionado.imagen}" alt="Imagen del producto">
                        </div>
                        <div class="text_containerProduct">
                            <img src="./src/images/icono-flecha.png" class="close-card" onclick="cerrarCard()"></img>
                            <h2>${productoSeleccionado.nombre}</h2>
                            <p>Detalles sobre el país al que viaja: ${productoSeleccionado.pais}</p>
                            <p>Capital: ${pais.capital ? pais.capital[0] : 'No disponible'}</p>
                            <p>Población: ${pais.population.toLocaleString()}</p>
                            <p>Región: ${pais.region}</p>
                            <p>Fecha de salida: ${productoSeleccionado.desde}</p>
                            <p>Fecha de regreso: ${productoSeleccionado.hasta}</p>
                            <p>Precio: $${productoSeleccionado.precio}</p>
                        </div>
                    </section>`;

                // Agrega la superposición y la tarjeta al DOM
                mainSection.innerHTML += `<div class="overlay" id="overlay"></div>` + card;

                // Muestra la superposición
                document.getElementById("overlay").style.display = "block";
            });
    }
}

function cerrarCard() {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "none"; // Oculta la superposición

    const cardContainer = document.querySelector(".cardContainer");
    cardContainer.remove(); // Elimina la card
}


function eliminarProducto(id) {
    const productoEliminado = productoCarrito.find((producto) => producto.id == id);
    if (productoEliminado) {
        if (productoEliminado.cantidad === 1) { 
            const indiceProducto = productoCarrito.indexOf(productoEliminado); 
            productoCarrito.splice(indiceProducto, 1);
            localStorage.setItem("miCarrito", JSON.stringify(productoCarrito)); 
            purchasesSection.innerHTML = ""; 
            renderizarProductos();
            Swal.fire({
                icon: "error",
                title: "Eliminado por completo"
            });
        } else {
            productoEliminado.cantidad--;
            localStorage.setItem("miCarrito", JSON.stringify(productoCarrito)); // Actualizar localStorage aquí también
            purchasesSection.innerHTML = ""; 
            renderizarProductos();
            Swal.fire({
                icon: "error",
                title: `Se ha eliminado 1 de ${productoEliminado.nombre}`
            });
        }    
    }
}


function subtotal(){
    let total = 0
    productoCarrito.forEach((prod) => {
        total += prod.precio
    })
    const totalFormateado = total.toLocaleString('es-ES');
    precios.textContent = `$${totalFormateado}`;
};

subtotal();

const activarBotonFinalizarCompra = () => {
    botonFinalizarCompra.addEventListener("click", () => {
        if(productoCarrito.length > 0 ) {
            purchasesSection.innerHTML += "";
            precios.innerHTML += "";
            destogglePurchaseDetails()
            mostrarMensaje("!Su compra ha sido realizada con exito¡")
            localStorage.clear();
            console.log(localStorage)
        } else {
            mostrarMensaje("Su carrito se encuentra vacio. Agregue producto para realizar una compra")
        }
    })
}

activarBotonFinalizarCompra();

const mostrarMensaje = (msg) => {
    purchasesSection.textContent = msg;
};

function togglePurchaseDetails() {
    document.getElementById("togglePurchase").style.display = "flex";
}

function destogglePurchaseDetails() {
    document.getElementById("togglePurchase").style.display = "none";
}

document.querySelector(".finish").addEventListener("click", togglePurchaseDetails);

document.querySelector("#togglePurchase button").addEventListener("click", destogglePurchaseDetails);

function total(){
    let total = 0;
    
    const aDolar = 'USD';
    const aEuro = 'EUR';
    const finalPrice = document.getElementById("final-price"); 
    const subtotalElement = document.getElementById("subtotal-price");
    const buttonPrice = document.getElementById("button-price") 
    
    const subtotal = parseFloat(subtotalElement.textContent.replace("$", "").replace(",", "")); 
    
    const interesesElement = document.getElementById("intereses");
    const porcentajeInteres = parseFloat(interesesElement.textContent.replace("%", "")) || 0;
    
    const intereses = (subtotal * porcentajeInteres) / 100;
    total = subtotal + intereses;
    
    const totalFormateado = total.toLocaleString('es-ES');
    finalPrice.textContent = `$${totalFormateado}`;
    buttonPrice.textContent = `$${totalFormateado}`;
    
    convertirMoneda(total, aDolar);
    convertirMoneda(total, aEuro);
}

function intereses(valor) {
    const cardIntereses = document.getElementById("intereses");
    cardIntereses.textContent = `${valor}%`; 
    total(); 
}

const interElements = document.querySelectorAll(".inter");

interElements.forEach(element => {
    element.addEventListener("click", function() {
        const valor = element.textContent.replace("%", ""); 
        intereses(valor); 
    });
});

total();

// Función para convertir el total de la compra a la moneda de destino
function convertirMoneda(totalEnMonedaLocal, aMoneda) {
    const apiKey = "ea02fc68828c14fd396cb726";
    const divUSD = document.getElementById("valueUSD");
    const divEUR = document.getElementById("valueEUR");
    
    const monedaActual = 'ARS'; // Cambia esto por la moneda local que estás usando (ARS o lo que corresponda)
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${monedaActual}/${aMoneda}`;
    
    return fetch(url)
        .then((response) => response.json())
        .then(data => {
            if (data.result === 'success') {
                const conversionRate = data.conversion_rate; // Tasa de conversión
                const convertedValue = (totalEnMonedaLocal * conversionRate).toFixed(2);

                // Crear elemento y agregar el valor convertido al DOM
                const span = document.createElement("span");
                span.textContent = `$${convertedValue}`;
                
                // Verificar a qué div agregar el valor convertido
                if (aMoneda === 'USD') {
                    divUSD.innerHTML = ''; // Limpiar cualquier valor previo
                    divUSD.appendChild(span);
                } else if (aMoneda === 'EUR') {
                    divEUR.innerHTML = ''; // Limpiar cualquier valor previo
                    divEUR.appendChild(span);
                }
            } else {
                console.error('Error en la conversión de moneda');
            }
        })
        .catch(error => {
            console.error('Error en la conversión de moneda:', error);
        });
}
