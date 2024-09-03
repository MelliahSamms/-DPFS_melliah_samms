// Obtener elementos del DOM
const carrito = document.getElementById('carrito');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const listaCarrito = document.getElementById('lista-carrito').getElementsByTagName('tbody')[0];
const totalCarrito = document.getElementById('total-carrito');
const agregarCarritoBtns = document.querySelectorAll('.agregar-carrito');

// Array para almacenar los productos en el carrito
let productosCarrito = [];

// Función para agregar producto al carrito
function agregarAlCarrito(e) {
    const productoId = e.target.getAttribute('data-id');
    console.log(`Producto ID: ${productoId}`); // Depuración

    // Encuentra el producto basado en el ID
    const producto = e.target.closest('.product');
    
    const nombre = producto.querySelector('h3').textContent;
    const precio = parseFloat(producto.querySelector('.price').textContent.replace('$', ''));

    console.log(`Nombre: ${nombre}, Precio: ${precio}`); // Depuración

    productosCarrito.push({ nombre, precio });

    actualizarCarrito();
}

// Función para actualizar el carrito
function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;

    productosCarrito.forEach((producto, index) => {
        const fila = listaCarrito.insertRow();
        
       fila.insertCell().textContent = producto.img;
        fila.insertCell().textContent = producto.nombre;
        fila.insertCell().textContent = `$${producto.precio.toFixed(2)}`;
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'X';
        botonEliminar.addEventListener('click', () => {
            productosCarrito.splice(index, 1);
            actualizarCarrito();
        });
        fila.insertCell().appendChild(botonEliminar);
        total += producto.precio;
    });

    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
}

// Función para vaciar el carrito
function vaciarCarrito() {
    productosCarrito = [];
    actualizarCarrito();
}

// Función para desplazar a una sección específica
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Event listeners
agregarCarritoBtns.forEach(btn => btn.addEventListener('click', agregarAlCarrito));
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

// Opcional: Si quieres que el carrito aparezca/oculte al hacer clic en el ícono del carrito
const imgCarrito = document.getElementById('img-carrito');
imgCarrito.addEventListener('click', () => {
    carrito.style.display = carrito.style.display === 'none' ? 'block' : 'none';
});

