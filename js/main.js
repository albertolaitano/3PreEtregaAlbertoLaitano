import productos from "./productos.js";

document.addEventListener("DOMContentLoaded", function () {
    const cardsContainer = document.getElementById("cardsContainer");

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
let btnCarrito = document.getElementById('btnCarrito');

document.addEventListener('DOMContentLoaded', function() {
    btnCarrito.addEventListener('click', function() {

        abrirCerrarModalCarrito();
        actualizarCarrito();
    });

    window.onclick = function(event) {
        if (event.target === modalCarrito) {
            modalCarrito.style.display = 'none';
        }
    };
});

function abrirCerrarModalCarrito() {
    const modal = document.getElementById('modalCarrito');

    if (modal) {
        if (modal.style.display === 'block') {
            modal.style.display = 'none';
        } else {
            modal.style.display = 'block';
        }
    }
}

function abrirModalCarrito() {
    const modal = document.getElementById('modalCarrito');

    if (modal) {
        modal.style.display = 'block';
    }
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
    abrirModalCarrito();
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
        btnEliminar.innerHTML = '<i class="fas fa-trash-alt"></i>';

        btnEliminar.addEventListener('click', function() {
            eliminarProducto(producto.id); 
        });
     
        nuevoElemento.appendChild(imagenProducto);
        
        let nombreProducto = document.createElement('h2');
        nombreProducto.textContent = producto.nombre;

        let cantidadProducto = document.createElement('input');
        cantidadProducto.type = 'number';
        cantidadProducto.value = producto.cantidad;
        cantidadProducto.textContent = producto.cantidad;
        cantidadProducto.classList.add("inputCantidad");
        
        let precioProducto = document.createElement('p');
        precioProducto.textContent = ' $ ' + producto.precio;

        let subTotalProducto = document.createElement('p');
        subTotalProducto.textContent = ' $ ' + producto.precio * producto.cantidad;
        
        nuevoElemento.appendChild(nombreProducto);
        nuevoElemento.appendChild(cantidadProducto);
        nuevoElemento.appendChild(precioProducto);
        nuevoElemento.appendChild(subTotalProducto);
        nuevoElemento.appendChild(btnEliminar);
        listaCarrito.appendChild(nuevoElemento);
        
        valorTotal += producto.precio * producto.cantidad;
    });

    totalElemento.textContent = valorTotal.toFixed(2); 
}

function eliminarProducto(id) {
    const productoExistente = carrito.find(producto => producto.id === id);
    if (productoExistente) {
        if (productoExistente.cantidad > 1) {
            productoExistente.cantidad -= 1;
        } else {
            carrito = carrito.filter(producto => producto.id !== id);
        }
    }
    actualizarCarrito();
    guardarCarritoLocalStorage();
}

function limpiarCarrito(){
    carrito = [];
    actualizarCarrito();
    localStorage.clear();
}

botonLimpiar.addEventListener("click", function(){
    return limpiarCarrito();  
})
