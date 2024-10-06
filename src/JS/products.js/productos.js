const productosCompra = [
    {id: 1 , cantidad: 1, numProducto: "Product-1", imagen: "./src/images/products/Barcelona-Foto4.jpg", pais: "España", nombre: "Paquete a Barcelona", desde: "Mié 26 Jun", hasta: "Lun 01 Jul", origen: "BUE", destino: "BAR", precio: 880.912},
    {id: 2 , cantidad: 1, numPorducto: "Product-2", imagen: "src/images/products/LaCumbrecita-Foto2.jpg", pais: "Argentina", nombre: "Paquete a Córdoba", desde: "Mié 25 Sep", hasta: "Mar 01 Oct", origen: "BUE", destino: "COR", precio: 181.536},
    {id: 3 , cantidad: 1, numPorducto: "Product-3", imagen: "src/images/products/Salta.jpeg", pais: "Argentina", nombre: "Paquete a Salta", desde: "Mié 22 Ene", hasta: "Lun 27 Ene", origen: "BUE", destino: "SAL", precio: 246.865},
    {id: 4 , cantidad: 1, numPorducto: "Product-4", imagen: "src/images/products/LosAngeles-Foto3.jpg", pais: "Estados Unidos", nombre: "Paquete a los Angeles", desde: "Dom 23 Jun", origen: "BUE", destino: "LA", hasta: "Vie 28 Jun", precio: 538.321},
    // {id: 5 , cantidad: 1, numPorducto: "Product-5", imagen: "src/images/products/Berlin-Foto5.jpg", pais: "República Federal de Alemania", nombre: "Paquete a Berlin", desde: "Sab 26 Ago", origen: "BUE", destino: "BER", hasta: "Vie 05 Sep", precio: 738.321},
    // {id: 6 , cantidad: 1, numPorducto: "Product-6", imagen: "src/images/products/Francia-Foto6.jpg", pais: "Francia", nombre: "Paquete a Paris", desde: "Lun 02 Dic", origen: "BUE", destino: "PAR", hasta: "Vie 15 Dic", precio: 938.321}
]

// 👇 console.log de Alias

const{
    id: id,
    numProducto: numProducto,
    imagen: imagen,
    nombre: nombre,
    desde: desde,
    hasta: hasta,
    precio: precio
} = productosCompra[0]

console.log("Los console de 👇 se realizan con 'Alias'");
console.log(id)
console.log(numProducto);
console.log(imagen);
console.log(nombre);
console.log(desde);
console.log(hasta);
console.log(precio)

// 👇 console.log para hacer espacio y que no queden pegadas.

console.log("");

// 👇 console.log del spread

console.log("Los de 👇 son del Spread")
console.log(...productosCompra)
console.log("");


let preciosVuelos = []

function spreadArray(){
    productosCompra.forEach((producto) => {
        preciosVuelos.push(producto.precio)
    });

    console.log("👇 este console, realiza un spread de numeros");
    console.log(Math.min(...preciosVuelos))
    console.log("");
};

spreadArray();

// 👇 funcion que realiza una suma con un spread de numero (Rest parameters)


function sumarSpread(numeros){
    return numeros.reduce((acc, n) => acc + n, )
};

console.log("👇 este console.log, realiza una suma, a traves de parametros, de un spread de numeros")
console.log(sumarSpread(preciosVuelos))
console.log("");