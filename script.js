catalogo = [];

class Productos {
    constructor(id, nombre, precio) {
        this.id = id
        this.nombre = nombre
        this.precio = precio   
    }
}

function detectarProducto (opcion) {
    for (const producto of catalogo) {
        if (opcion == producto.id) {
            let precio = producto.precio
            return precio
        }
    }
    
}

function calcularPrecio (cant, precio) {
    return (cant * precio)
}

function mostrarCarrito() {
    if (menu_opcion == 1) {
        var titulo = "Prottorta de chocolate";
    } else if (menu_opcion == 2) {
        var titulo = "Budin de Avellanas";
    } else if (menu_opcion == 3) {
        var titulo = "Dulce de frutos";
    } else if (menu_opcion == 4) {
        var titulo = "Hamburguesa de acelga"
    } else {
        var titulo = "No se han agregado productos al carrito"
        cantidad = 0
        resultado = 0
    }
    alert("-----------------------CARRITO-----------------------\nProducto: " + titulo + " x" + cantidad + "\nTotal: $" + resultado);
}



console.log("Productos inicializados...");


let protorta = new Productos(001,"Prottorta de chocolate",1500);
let budin = new Productos(002,"Budin de avellanas",1300);
let dulce = new Productos(003,"Dulce de frutos",1950);
let hamburguesa = new Productos(004,"Hamburguesa de acelga",500);

catalogo.push(protorta, budin, dulce, hamburguesa);
console.log(catalogo);
catalogo.forEach( el => console.log(el))


alert("Bienvenido a la tienda vegana!!!");
alert("Cada producto tiene una ID asociada...\n1)Protorta\n2)Budin\n3)Dulce\n4)Hamburguesa");

let opcion = prompt("¿Desea empezar a comprar? S/N");

while (opcion != "S" && opcion != "N" && opcion != "s" && opcion != "n" ) {
    opcion = prompt("¿Desea empezar a comprar? S/N")
}

switch (opcion) {
    case "N":
        alert("Saliendo del menu...")
        console.log("Proceso finalizado")
        break
    ;
    case "n":
        alert("Saliendo del menu...")
        console.log("Proceso finalizado, el cliente no desea comprar :(")
        break
    ;
    default:
    var menu_opcion = parseInt(prompt("¿Que producto desea comprar?"))

    while (menu_opcion < 1 || menu_opcion >4) {
        menu_opcion = parseInt(prompt("¿Que producto desea comprar?"))
    }

    var precio = detectarProducto(menu_opcion);

    var cantidad = parseInt(prompt("¿Cuantos desea comprar?"));
    
    var resultado = calcularPrecio(cantidad,precio);
}

console.log("Total: " + resultado);





