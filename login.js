
document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto
    console.log('Formulario enviado');

    if (!validar()) {
        console.log('Validación fallida');
        return; // Si la validación falla, no enviar el formulario
    }

    const formData = new FormData(this);

    try {
        const response = await fetch(this.action, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            console.log('Registro exitoso');
            // Redirige a la página de productos después del registro exitoso
            window.location.href = '/html/productDetail.html'; 
        } else {
            const errorData = await response.json();
            console.error('Error en el registro:', errorData);
            alert(`Error: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Función para validar el formulario
function validar() {
    const name = document.getElementById('name').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const terms = document.getElementById('terms').checked;

    // Validación de nombre y apellido
    if (name.length < 2 || apellido.length < 2) {
        alert('El nombre y apellido deben tener al menos 2 caracteres.');
        return false;
    }

    // Validación de email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Ingrese un correo electrónico válido.');
        return false;
    }

    // Validación de contraseña
    if (password.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return false;
    }

    // Validación de términos y condiciones
    if (!terms) {
        alert('Debe aceptar los términos y condiciones.');
        return false;
    }

    return true;
}

// Función para mostrar una vista previa de la imagen
function previewImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const preview = document.getElementById('profileImagePreview');
        preview.src = e.target.result;
        preview.style.display = 'block'; // Muestra la imagen
    };
    
    if (file) {
        reader.readAsDataURL(file);
    }
}

