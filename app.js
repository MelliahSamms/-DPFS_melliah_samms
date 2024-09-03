document.addEventListener('DOMContentLoaded', function () {
    const carrito = document.getElementById('lista-carrito').querySelector('tbody');
    const agregarCarritoBtns = document.querySelectorAll('.agregar-carrito');

    // Cargar productos del localStorage al cargar la página
    cargarCarrito();

    // Asignar evento click a los botones de agregar al carrito
    agregarCarritoBtns.forEach(function (btn) {
        btn.addEventListener('click', agregarProducto);
    });

    // Función para agregar el producto al carrito
    function agregarProducto(event) {
        event.preventDefault();
        const producto = event.target.parentElement.parentElement;
        leerDatosProducto(producto);
    }

    // Leer datos del producto seleccionado
    function leerDatosProducto(producto) {
        const infoProducto = {
            imagen: producto.querySelector('img').src,
            nombre: producto.querySelector('h3').textContent,
            precio: producto.querySelector('.precio').textContent,
            id: producto.querySelector('a').getAttribute('data-id')
        };

        // Insertar el producto en el carrito y en localStorage
        insertarCarrito(infoProducto);
        guardarProductoEnLocalStorage(infoProducto);
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

    // Guardar productos en localStorage
    function guardarProductoEnLocalStorage(producto) {
        let productos = obtenerProductosDeLocalStorage();
        productos.push(producto);
        localStorage.setItem('carrito', JSON.stringify(productos));
    }

    // Obtener productos desde localStorage
    function obtenerProductosDeLocalStorage() {
        return JSON.parse(localStorage.getItem('carrito')) || [];
    }

    // Cargar productos del localStorage y mostrarlos en el carrito
    function cargarCarrito() {
        const productos = obtenerProductosDeLocalStorage();
        productos.forEach(producto => insertarCarrito(producto));
        actualizarTotal();
    }

    // Vaciar el carrito tanto en el DOM como en localStorage
    document.getElementById('vaciar-carrito').addEventListener('click', () => {
        localStorage.removeItem('carrito');
        while (carrito.firstChild) {
            carrito.removeChild(carrito.firstChild);
        }
        actualizarTotal();
    });

    function actualizarTotal() {
        const productosCarrito = obtenerProductosDeLocalStorage();
        const total = productosCarrito.reduce((total, producto) => {
            // Remover cualquier carácter no numérico excepto el punto decimal
            const precioNumerico = parseFloat(producto.precio.replace(/[^0-9.-]+/g, ''));
            return total + (isNaN(precioNumerico) ? 0 : precioNumerico);
        }, 0);
    
        document.getElementById('total-carrito').textContent = `Total: $${total.toFixed(2)}`;
    }
    

    // Eliminar productos del carrito
    carrito.addEventListener('click', function(e) {
        if (e.target.classList.contains('borrar-producto')) {
            const productoId = e.target.getAttribute('data-id');
            e.target.parentElement.parentElement.remove();
            eliminarProductoDeLocalStorage(productoId);
            actualizarTotal();
        }
    });

    // Eliminar producto del localStorage
    function eliminarProductoDeLocalStorage(productoId) {
        let productos = obtenerProductosDeLocalStorage();
        productos = productos.filter(producto => producto.id !== productoId);
        localStorage.setItem('carrito', JSON.stringify(productos));
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const agregarCarritoBtns = document.querySelectorAll('.agregar-carrito');
    const irAlCarritoBtn = document.getElementById('pagarCarrito');

    agregarCarritoBtns.forEach(function (btn) {
        btn.addEventListener('click', agregarProducto);
    });

    function agregarProducto(event) {
        event.preventDefault();
        const producto = event.target.parentElement.parentElement;
        leerDatosProducto(producto);
    }

    function leerDatosProducto(producto) {
        const infoProducto = {
            imagen: producto.querySelector('img').src,
            nombre: producto.querySelector('h3').textContent,
            precio: producto.querySelector('.precio').textContent,
            id: producto.querySelector('a').getAttribute('data-id')
        };
        guardarProductoEnLocalStorage(infoProducto);
    }

    function guardarProductoEnLocalStorage(producto) {
        let productos = obtenerProductosDeLocalStorage();
        productos.push(producto);
        localStorage.setItem('carrito', JSON.stringify(productos));
    }

    function obtenerProductosDeLocalStorage() {
        return JSON.parse(localStorage.getItem('carrito')) || [];
    }

    irAlCarritoBtn.addEventListener('click', function() {
        // Redirige al carrito después de guardar los productos
        window.location.href = 'carrito.html';
    });
});

