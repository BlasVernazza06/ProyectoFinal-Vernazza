let formulario = document.getElementById("formulario");

let peticiones = JSON.parse(localStorage.getItem("Peticiones")) || [];

function DatosFormulario() {

    let counter = 0

    let nombre = document.getElementById('nombre').value.trim();
    let apellido = document.getElementById('apellido').value.trim();
    let correoElectronico = document.getElementById('correo').value.trim();
    let contraseña = document.getElementById('contraseña').value.trim();
    let descripcion = document.getElementById('descripcion').value.trim();

    // Verifica que todos los campos tengan algún valor
    if (nombre && apellido && correoElectronico && contraseña && descripcion) {
        const arrayPeticion = {
            nombre: nombre,
            apellido: apellido,
            correoElectronico: correoElectronico,
            contraseña: contraseña,
            descripcion: descripcion
        };

        // Agrega la petición si todos los campos están completos
        
        peticiones.push(arrayPeticion);
        localStorage.setItem("Peticiones", JSON.stringify(peticiones));
        formulario.reset();
    } else {
    };
};


