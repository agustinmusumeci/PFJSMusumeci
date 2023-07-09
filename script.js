// GLOBALES
carrito = [];

const contenedorProductos = document.getElementById("main-productos");
const contenedorCarrito = document.getElementById("main-carrito-cuerpo");
const total = document.getElementById("total");
const botonFinalizar = document.getElementById("boton-finalizar");
const contadorCarrito = document.getElementById("contador-carrito");
actualizarCarrito();
console.log(contenedorProductos);

let resp;
let data;

// CARGA DE LOS PRODUCTOS MEDIANTE ARCHIVO "productos.json"
async function cargarProdutos() {
    try {
        resp = await fetch("./productos.json");
        data = await resp.json();

        data.forEach((producto) => {
            tarjeta = `<div class='col-4 card' style='width: 15rem;'><img src='./assets/img/${producto.imagen}'class='card-img-top' alt='pesas_de_4kg'><div class='card-body'><h5 class='card-title'>${producto.nombre}</h5><h6 class='card-title card-precio'>$ ${producto.precio}</h6><p class='card-text'>${producto.descripcion}<p><a href='#' class='btn btn-dark card-boton' onclick='agregarCarrito(${producto.id})'>Añadir al carrito</a></div></div>`;
            contenedorProductos.innerHTML += tarjeta;
        });
    } catch {
        console.log("error");
    } finally {
        console.log("terminado");
    }
}
cargarProdutos();

function mostrarMensaje(texto, color) {
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
}

// AGREGAR PRODUCTOS AL CARRITO
async function agregarCarrito(id) {
    var isInCarrito = false;

    carrito.forEach((elemento) => {
        if (elemento.id == id) {         
            elemento.cantidad = parseInt(elemento.cantidad) + 1;
            grabarCarritoLocal();
            isInCarrito = true;         
        }
    });

    if (!isInCarrito) {
        data.forEach((producto) => {
            if (producto.id == id) {
                carrito.push(producto);
                grabarCarritoLocal();                
            }
        });
    }
}

function grabarCarritoLocal() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
    mostrarMensaje("Producto agregado al carrito.","linear-gradient(to right, #7fbb22, #96c909)");
    
}

function actualizarCarrito() {
    var contador = 0;

    if (localStorage.getItem("carrito")) {
        contenedorCarrito.innerHTML = "";
        carrito_local = JSON.parse(localStorage.getItem("carrito"));
        carrito_local.forEach((producto) => {
            pedido = `<ul class="list-group list-group-numbered">
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                                <div class="fw-bold">${producto.nombre}.</div>
                                <p>$${producto.precio}</p>
                                <a class="btn" onclick="eliminarDelCarrito(${producto.id})"><i class="fa-solid fa-trash-can"></i></a>
                            </div>
                            <span class="badge rounded-pill">${producto.cantidad}</span>
                        </li>
                    </ul>`;
            contenedorCarrito.innerHTML += pedido;
            carrito = carrito_local;
            contador += parseInt(producto.cantidad);
        });
        total.innerText =
            "$" +
            carrito_local.reduce(
                (acumulador, producto) => acumulador + (parseInt(producto.precio)* parseInt(producto.cantidad)),
                0
            );
    } else {
        total.innerText = "No hay productos aun...";
        contenedorCarrito.innerHTML = "";
    }
    contadorCarrito.innerText = contador;
}

function eliminarDelCarrito(id) {
    bandera = true;
    console.log(id);
    carrito_local.forEach((element) => {
        if (id == element.id && bandera) {
            const indice = carrito_local.indexOf(element);
            carrito.splice(indice, 1);
            localStorage.clear("carrito");
            localStorage.setItem("carrito", JSON.stringify(carrito));
            bandera = false;
            actualizarCarrito();
            mostrarMensaje(
                "Producto Eliminado del carrito",
                "linear-gradient(to right, #FF6666, #FF6666)"
            );
        }
    });
    console.log(carrito);
}

function limpiarCarrito() {
    Swal.fire({
        template: "#confirmarBorrado",
    }).then((resultado) => {
        if (resultado.value) {
            localStorage.clear("carrito");
            carrito = [];
            console.log(carrito);
            actualizarCarrito();
        } else {
            console.log("error");
        }
    });
}

function finalizarCompra() {
    if (localStorage.getItem("carrito") && carrito.length) {
        botonFinalizar.innerHTML = `<div class="spinner-border" role="status">
            <span class="visually-hidden">Cargando...</span>
            </div>`;
        setTimeout(() => {
            botonFinalizar.innerText = "Finalizar compra";
        }, 2000);
        window.location.href = "./pages/finalizarcompra.html";
    } else {
        mostrarMensaje(
            "No hay productos aún en el carrito... Agrege alguno.",
            "linear-gradient(to right, #FF6666, #FF6666)"
        );
    }
}
