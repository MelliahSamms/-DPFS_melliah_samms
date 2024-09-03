// Variables
const carrito = document.querySelector('#carrito tbody');
const listaProductos = document.querySelector('.product-list');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let productosCarrito = [];

// Cargar eventos
cargarEventos();

function cargarEventos() {
    // Añadir producto al carrito
    listaProductos.addEventListener('click', agregarProducto);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

// Funciones

// Agregar producto al carrito
function agregarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const productoSeleccionado = e.target.parentElement;
        leerDatosProducto(productoSeleccionado);
    }
}

// Leer los datos del producto
function leerDatosProducto(producto) {
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('h3').textContent,
        precio: producto.querySelector('.precio').textContent,
        id: producto.getAttribute('data-id'),
        cantidad: 1
    };

    // Revisar si un producto ya existe en el carrito
    const existe = productosCarrito.some(producto => producto.id === infoProducto.id);
    if (existe) {
        // Actualizamos la cantidad
        const productos = productosCarrito.map(producto => {
            if (producto.id === infoProducto.id) {
                producto.cantidad++;
                return producto;  // Retorna el producto actualizado
            } else {
                return producto;  // Retorna los productos no duplicados
            }
        });
        productosCarrito = [...productos];
    } else {
        // Agregar el producto al carrito
        productosCarrito = [...productosCarrito, infoProducto];
    }

    carritoHTML();
}

// Muestra el carrito en el HTML
function carritoHTML() {
    // Limpiar el HTML del carrito
    limpiarCarrito();

    // Recorre el carrito y genera el HTML
    productosCarrito.forEach(producto => {
        const { imagen, nombre, precio, cantidad, id } = producto;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${imagen}" width="100"></td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${id}">X</a>
            </td>
        `;

        // Agregar el HTML del carrito en el tbody
        carrito.appendChild(row);
    });

    // Agregar función para eliminar productos
    const borrarProductoBtns = document.querySelectorAll('.borrar-producto');
    borrarProductoBtns.forEach(btn => {
        btn.addEventListener('click', borrarProducto);
    });

    // Actualizar total del carrito
    actualizarTotal();
}

// Eliminar producto del carrito
function borrarProducto(e) {
    e.preventDefault();
    const productoId = e.target.getAttribute('data-id');

    // Eliminar del arreglo productosCarrito por el data-id
    productosCarrito = productosCarrito.filter(producto => producto.id !== productoId);

    carritoHTML();  // Iterar sobre el carrito y mostrar el HTML
}

// Vaciar el carrito
function vaciarCarrito() {
    productosCarrito = [];  // Reseteamos el carrito
    limpiarCarrito();  // Eliminamos todo el HTML
    actualizarTotal();  // Actualizamos el total
}

// Limpiar el HTML del carrito
function limpiarCarrito() {
    while (carrito.firstChild) {
        carrito.removeChild(carrito.firstChild);
    }
}

// Actualizar el total del carrito
function actualizarTotal() {
    let total = 0;

    productosCarrito.forEach(producto => {
        const precioNumerico = parseFloat(producto.precio.replace('$', ''));
        total += precioNumerico * producto.cantidad;
    });

    document.querySelector('#total-carrito').textContent = `Total: $${total.toFixed(2)}`;
}
