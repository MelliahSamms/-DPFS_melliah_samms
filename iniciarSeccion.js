// login.js

function validar() {
    const correo = document.getElementById('correo').value;
    const contraseña = document.getElementById('contraseña').value;

    // Validación básica
    if (!correo || !contraseña) {
        alert("Por favor, complete todos los campos.");
        return false;
    }

    window.location.href = '/html/pagina.html'; // Redirige a la página de inicio
    return false; // Prevenir el envío real del formulario
}

