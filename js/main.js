import productos from "./productos.js";

document.addEventListener("DOMContentLoaded", function () {
    const cardsContainer = document.getElementById("cardsContainer");
    const cartModal = document.getElementById("cartModal");
    const cartItemsList = document.getElementById("cartItems");

    productos.map(producto => {
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

});

//------------------MODAL----------------------

let modalCarrito = document.getElementById('modalCarrito');

    document.addEventListener('DOMContentLoaded', function() {
        let btnCarrito = document.getElementById('btnCarrito');

        btnCarrito.addEventListener('click', function() {
            modalCarrito.style.display = 'block';
        });

        window.onclick = function(event) {
            if (event.target === modalCarrito) {
                cerrarModalCarrito();
            }
        };
    });

    function cerrarModalCarrito() {
        const modalCarrito = document.getElementById("modalCarrito");
         modalCarrito.style.display = "none";
}

//-----------------CARRITO DE COMPRAS----------------

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function guardarCarritoLocalStorage(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(producto) {
    const productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
        
    } else {
        let nuevoProducto = {
            id: producto.id,
            imagen: producto.imagen,
            nombre: producto.nombre,
            cantidad: 1,  
            precio: producto.precio
        };

        carrito.push(nuevoProducto);
    }

    actualizarCarrito();

    guardarCarritoLocalStorage();
}

function actualizarCarrito() {
    let listaCarrito = document.getElementById('listaCarrito');
    let totalElemento = document.getElementById('valorTotal');


    listaCarrito.innerHTML = '';

    
    let valorTotal = 0;

    carrito.forEach(function(producto) {
        let nuevoElemento = document.createElement('li');

        let imagenProducto = document.createElement('img');
        imagenProducto.src = producto.imagen;
        imagenProducto.alt = producto.nombre;
        imagenProducto.classList.add("imagen-carrito");

        let btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.addEventListener('click', function() {
            eliminarProducto(producto.id); 
        });
     
        nuevoElemento.appendChild(imagenProducto);
        
        let parrafoProducto = document.createElement('p');
        parrafoProducto.textContent = producto.nombre + ' Cant: ' + producto.cantidad + ' - $ ' + producto.precio;

        nuevoElemento.appendChild(parrafoProducto);
        nuevoElemento.appendChild(btnEliminar);
        listaCarrito.appendChild(nuevoElemento);
        
        valorTotal += producto.precio;
    });

    totalElemento.textContent = valorTotal.toFixed(2); 
}

function eliminarProducto(id) {
    carrito = carrito.filter(producto => producto.id !== id);

    actualizarCarrito();

    localStorage.clear();
}

function limpiarCarrito(){
    carrito = [];
    actualizarCarrito();
}

document.addEventListener('DOMContentLoaded', function() {
    // Asignar funciones a los botones de "Comprar"
    let botonesComprar = document.querySelectorAll('#botonComprar');
    
    botonesComprar.forEach(function(boton) {
        boton.addEventListener('click', function() {
            let contenedorProducto = this.closest('#card');
            let nombreProducto = contenedorProducto.querySelector('#nombreProducto').textContent;
            let precioProducto = parseFloat(contenedorProducto.querySelector('#precioProducto').textContent.replace('$ ', ''));
            agregarAlCarrito(nombreProducto, precioProducto);
        });
    });
});

botonLimpiar.addEventListener("click", function(){
    return limpiarCarrito();  
})
