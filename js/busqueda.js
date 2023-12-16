document.addEventListener("DOMContentLoaded", function () {
    const cardsContainer = document.getElementById("cardsContainer");
    const searchInput = document.getElementById('searchInput');

    renderizarTarjetas(productos);

    searchInput.addEventListener('input', function () {
        search();
    });

    function renderizarTarjetas(productos) {
        cardsContainer.innerHTML = '';

        productos.forEach(producto => {
            const card = document.createElement("div");
            card.classList.add("card");

            const imagen = document.createElement("img");
            imagen.classList.add("cardImagen");
            imagen.src = producto.imagen;
            imagen.alt = producto.alt;

            const nombre = document.createElement("h2");
            nombre.classList.add("cardNombre");
            nombre.textContent = producto.nombre;

            const precio = document.createElement("p");
            precio.classList.add("cardPrecio");
            precio.textContent = `$ ${producto.precio.toFixed(2)}`;

            const boton = document.createElement("button");
            boton.classList.add("cardBoton");
            boton.textContent = "Agregar al carrito";
            boton.addEventListener("click", () => agregarAlCarrito(producto));

            card.appendChild(imagen);
            card.appendChild(nombre);
            card.appendChild(precio);
            card.appendChild(boton);

            cardsContainer.appendChild(card);
        });
    }

    function search() {
        const searchTerm = searchInput.value.toLowerCase();

        const productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(searchTerm));

        renderizarTarjetas(productosFiltrados);
    }
});