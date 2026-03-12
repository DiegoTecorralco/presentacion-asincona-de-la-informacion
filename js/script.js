const btnCargarUsuarios = document.getElementById('btnCargarUsuarios');
const contenedorUsuarios = document.getElementById('contenedorUsuarios');
const btnAgregarServicio = document.getElementById('btnAgregarServicio');
const servicios = document.getElementById('servicios');
const contador = document.getElementById('contador');


// Cargar servicios guardados cuando inicia la página
document.addEventListener("DOMContentLoaded", () => { // espera a que el DOM esté completamente cargado antes de ejecutar el código
    const serviciosGuardados = JSON.parse(localStorage.getItem("servicios")); // obtiene los servicios guardados en localStorage
    if (serviciosGuardados) { //si hay servicios guardados, los muestra en la lista
        servicios.innerHTML = ""; // limpia la lista de servicios antes de agregar los guardados
        serviciosGuardados.forEach(servicio => { //recorre el array de servicios guardados y los agrega a la lista
            const li = document.createElement("li"); // crea un nuevo elemento <li> para cada servicio
            li.textContent = servicio; // asigna el nombre del servicio al texto del elemento <li>
            servicios.appendChild(li); // agrega el elemento <li> a la lista de servicios en el DOM
        });
    }
    contador.textContent = servicios.children.length; // actualiza el contador con el número de servicios cargados
});


btnCargarUsuarios.addEventListener('click', () => {
    contenedorUsuarios.innerHTML = "<p>Cargando usuarios...</p>";
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(users => {
            users.forEach((User) => {
                const userElement = document.createElement('div');
                userElement.classList.add('usuario')
                userElement.innerHTML = `
            <h3>${User.name}</h3>
            <p>${User.email}</p>
            <p>${User.company.name}</p>`;
                contenedorUsuarios.appendChild(userElement);

            });
        });
});

//contador de servicios
contador.textContent = servicios.children.length; // inicializa el contador con el número de servicios existentes


//agregar servicio
btnAgregarServicio.addEventListener("click", () => {
    const nombreServicio = prompt("agrega el nombre del servicio:", "nuevo servicio");
    if (nombreServicio !== null && nombreServicio !== "") {
        const nuevoServicio = document.createElement('li');
        nuevoServicio.textContent = nombreServicio;
        servicios.appendChild(nuevoServicio);
        // actualizar contador
        contador.textContent = servicios.children.length; // actualiza el contador con el número de servicios
        guardarServicios(); // guardar en localStorage
    }
});

// eliminar servicio al hacer doble click
servicios.addEventListener("dblclick", (event) => {
    // event.target es el elemento que fue clickeado, verificamos que sea un <li> para eliminarlo
    if (event.target.tagName === "LI") { // verificamos que el elemento clickeado sea un <li>
        servicios.removeChild(event.target); //elimina el servicioclickeado 
        // actualizar contador
        contador.textContent = servicios.children.length; // actualiza el contador con el número de servicios
        guardarServicios(); // actualizar localStorage
    }
});


// guardar servicios en localStorage
const guardarServicios = () => { // crea un array para almacenar los servicios actuales
    const lista = []; // recorre los elementos <li> dentro de la lista de servicios y agrega su texto al array
    servicios.querySelectorAll("li").forEach(li => { // para cada elemento <li> encontrado, se agrega su texto al array "lista"
        lista.push(li.textContent); // agrega el texto del elemento <li> al array "lista"
    });
    localStorage.setItem("servicios", JSON.stringify(lista)); // guarda el array "lista" en localStorage como una cadena JSON bajo la clave "servicios"
};