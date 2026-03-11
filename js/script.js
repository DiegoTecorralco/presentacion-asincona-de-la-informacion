const btnCargarUsuarios = document.getElementById('btnCargarUsuarios');
const contenedorUsuarios = document.getElementById('contenedorUsuarios');
const btnAgregarServicio = document.getElementById('btnAgregarServicio');
const servicios = document.getElementById('servicios');
const contador = document.getElementById('contador');

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

btnAgregarServicio.addEventListener("click", () => {
    const nombreServicio = prompt("agrega el nombre del servicio:", "nuevo servicio");
    if (nombreServicio !== null && nombreServicio !== "") {
        const nuevoServicio = document.createElement('li');
        nuevoServicio.textContent = nombreServicio;
        servicios.appendChild(nuevoServicio);
        // actualizar contador
        contador.textContent = servicios.children.length; // actualiza el contador con el número de servicios
    }
});
