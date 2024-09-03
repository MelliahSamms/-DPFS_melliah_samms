document.addEventListener("DOMContentLoaded", () => {
    const carrito = [];
    const carritoContainer = document.querySelector(".tabla-carrito tbody");
    const totalCarrito = document.getElementById("total-carrito");

    // Función para actualizar la tabla del carrito
    function actualizarCarrito() {
        carritoContainer.innerHTML = "";
        let total = 0;

        carrito.forEach((producto, index) => {
            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td><img src="${producto.imagen}" alt="${producto.nombre}" width="50"></td>
                <td>${producto.nombre}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td><button class="btn-eliminar" data-index="${index}">X</button></td>
                
            `;
            carritoContainer.appendChild(fila);

            total += producto.precio;
        });

        totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Función para agregar un producto al carrito
    function agregarAlCarrito(producto) {
        carrito.push(producto);
        actualizarCarrito();
    }

    // Capturamos los botones de "Agregar al carrito"
    const botonesAgregar = document.querySelectorAll(".btn-agregar");

    botonesAgregar.forEach((boton) => {
        boton.addEventListener("click", () => {
            const productoCard = boton.closest(".promotion-card");

            const producto = {
                imagen: productoCard.querySelector("img").src,
                nombre: productoCard.querySelector("h2").textContent,
                precio: parseFloat(productoCard.querySelector(".discounted-price").textContent.replace('$', ''))
            };

            agregarAlCarrito(producto);
        });
    });

    // Evento para eliminar productos del carrito
    carritoContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-eliminar")) {
            const index = e.target.dataset.index;
            carrito.splice(index, 1);
            actualizarCarrito();
        }
    });

    // Evento para vaciar el carrito
    document.getElementById("vaciar-carrito").addEventListener("click", (e) => {
        e.preventDefault();
        carrito.length = 0;
        actualizarCarrito();
    });

    // Evento para redirigir a la página de destacados desde el botón de inicio
    document.getElementById("btn-inicio").addEventListener("click", (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del enlace
        window.location.href = 'productDetail.html'; 
    });
});





