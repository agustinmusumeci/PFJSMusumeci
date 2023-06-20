productos = [];
carrito = [];

const contenedor_productos = document.getElementById("main-productos");
const contenedor_carrito = document.getElementById("main-carrito-cuerpo");
const productos_parse = JSON.parse(sessionStorage.getItem("catalogo"));
const total = document.getElementById("total")    

console.log(contenedor_productos);
if (localStorage.getItem("carrito")) {
    actualizarCarrito()
}

class Producto {
    constructor(id, nombre, precio, cantidad, descripcion, imagen) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.cantidad = cantidad
        this.descripcion = descripcion   
        this.imagen = imagen
    }
}

productos.push(new Producto("001","Pesas 4kg",4500,1,"Par de pesas de 4kg con recubrimiento gomoso, diseñada para mejor agarre.","pesas4.webp")); 

productos.push (new Producto("002","Mancuernas 7,5kg",6750,1,"Par mancuernas de 7,5kg, diseño convencional de goma y rellena de arena y plomo.","pesas7,5.webp"));

productos.push (new Producto("003","Mancuernas 10kg",9875,1,"Par mancuernas de 10kg, diseño convencional de goma y rellena de arena y plomo.", "pesas10.webp"));

productos.push (new Producto("004","Barra W",13100,1,"Barra de acero inoxidable, uso horientado a bíceps.","barraw.webp"));

productos.push (new Producto("005","Barra Olímpica",25000,1,"Barra de acero inoxidable de 2,2mts de largo y un peso de 20kg, ideal para todo tipo de ejercicios.","barraolimpica.webp"));

productos.push (new Producto("006","Whey Protein",8000, 1, "Sumplemento de  proteína de 930g de Ena Sport True Made sabor vainilla.","proteina.webp"))

productos.push (new Producto("007","Creatina Monohidratada",23450, 1,"Suplemento de creatina monohidratada en polvo de 500g de Ultratech Nutrition Classic.","creatina.webp"));

sessionStorage.setItem("catalogo",JSON.stringify(productos));

if (sessionStorage.getItem("catalogo")) {
    productos_parse.forEach(producto => {
        console.log(producto)
        tarjeta = `<div class='col-4 card' style='width: 15rem;'><img src='./assets/img/${producto.imagen}'      class='card-img-top' alt='pesas_de_4kg'><div class='card-body'><h5 class='card-title'>${producto.nombre}</h5><h6 class='card-title card-precio'>$ ${producto.precio}</h6><p class='card-text'>${producto.descripcion}<p><a href='#' class='btn btn-dark card-boton' onclick='agregarCarrito(${producto.id})'>Añadir al carrito</a></div></div>`;
        contenedor_productos.innerHTML += tarjeta;
    });
}

function mostrarMensaje(texto,color){
    Toastify({
        text: texto,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", 
        position: "left",
        stopOnFocus: true, 
        style: {
        background: color,
    },
    }).showToast();
    // avatar:"./assets/img/tick.png"
}

function agregarCarrito(id) {
    productos_parse.forEach(producto => {
        if (producto.id == id) {
            carrito.push(producto);
            localStorage.setItem("carrito",JSON.stringify(carrito));
            console.log(carrito)
            actualizarCarrito()
            mostrarMensaje("Producto agregado al carrito.","linear-gradient(to right, #00b09b, #96c93d)")
        }
    });
}

function actualizarCarrito() {
    
    contenedor_carrito.innerHTML = "";
    carrito_parse = JSON.parse(localStorage.getItem("carrito"));

    if (localStorage.getItem("carrito")) {
        carrito_parse.forEach(producto => {
        pedido = `<ul class="list-group list-group-numbered">
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                                <div class="fw-bold">${producto.nombre}.</div>
                                <p>$${producto.precio}</p>
                                <a class="btn" onclick="eliminarDelCarrito(${producto.id})">Eliminar</a>
                            </div>
                            <span class="badge bg-primary rounded-pill">1</span>
                        </li>
                    </ul>`
        contenedor_carrito.innerHTML += pedido;
    }); 
    total.innerText = "$" + carrito_parse.reduce((acumulador, producto) => acumulador + producto.precio, 0)
    } else {
        total.innerText = 0
    }
}

function eliminarDelCarrito(id) {
    bandera = true;
    
    carrito_parse.forEach(element => {
        if (id == element.id && bandera) {
            
            const indice = carrito_parse.indexOf(element);
            
            if (carrito.length == 0) {
                carrito.push(carrito_parse);
            }
            carrito.splice(indice, 1);
            localStorage.clear("carrito");
            localStorage.setItem("carrito",JSON.stringify(carrito));
            bandera = false
            actualizarCarrito();
            mostrarMensaje("Producto Eliminado del carrito","linear-gradient(to right, #FF6666, #FFCC66)")
        }
    });
    console.log(carrito)
}

function limpiarCarrito() {
    Swal.fire({
        template: '#confirmarBorrado',
    }).then((resultado) => {
        if (resultado.value) {
            localStorage.clear("carrito");
            carrito = [];
            console.log(carrito);
            actualizarCarrito();
        } else {
            console.log("error")
        }
    })
}




