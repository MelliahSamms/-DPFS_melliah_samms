document.addEventListener('DOMContentLoaded', function () {
    const carrito = document.getElementById('lista-carrito').querySelector('tbody');
    cargarCarrito();

    function cargarCarrito() {
        const productos = obtenerProductosDeLocalStorage();
        console.log('Productos cargados del localStorage:', productos); // Depuración
        productos.forEach(producto => insertarCarrito(producto));
        actualizarTotal();
    }
    

    // Insertar el producto en la tabla del carrito
    function insertarCarrito(producto) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${producto.imagen}" width="100"></td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td><a href="#" class="borrar-producto" data-id="${producto.id}">X</a></td>
        `;
        carrito.appendChild(row);
    }

    // Obtener productos desde localStorage
    function obtenerProductosDeLocalStorage() {
        return JSON.parse(localStorage.getItem('carrito')) || [];
    }

    // Actualizar el total del carrito
    function actualizarTotal() {
        const productosCarrito = obtenerProductosDeLocalStorage();
        const total = productosCarrito.reduce((total, producto) => {
            const precioNumerico = parseFloat(producto.precio.replace(/[^0-9.-]+/g, ''));
            return total + (isNaN(precioNumerico) ? 0 : precioNumerico);
        }, 0);

        document.getElementById('total-carrito').textContent = `Total: $${total.toFixed(2)}`;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const carrito = document.getElementById('lista-carrito').querySelector('tbody');
    cargarCarrito();

    function cargarCarrito() {
        const productos = obtenerProductosDeLocalStorage();
        productos.forEach(producto => insertarCarrito(producto));
        actualizarTotal();
    }

    function insertarCarrito(producto) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${producto.imagen}" width="100"></td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td><a href="#" class="borrar-producto" data-id="${producto.id}">X</a></td>
        `;
        carrito.appendChild(row);
    }

    function obtenerProductosDeLocalStorage() {
        return JSON.parse(localStorage.getItem('carrito')) || [];
    }

    function actualizarTotal() {
        const productosCarrito = obtenerProductosDeLocalStorage();
        let total = 0;
        productosCarrito.forEach(producto => {
            const precioNumerico = parseFloat(producto.precio.replace(/[^0-9.-]+/g, ''));
            total += isNaN(precioNumerico) ? 0 : precioNumerico;
        });

        document.getElementById('total-carrito').textContent = `Total: $${total.toFixed(2)}`;
    }
});


