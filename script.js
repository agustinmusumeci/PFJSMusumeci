let protorta = 1050
let budin = 1300
let dulce = 1950
let hamburguesa = 500
let total = 0
console.log("Precios inicializados...")

alert("Bienvenido a la tienda vegana!!!")
alert("Cada producto tiene una ID asociada...\n1)Protorta\n2)Budin\n3)Dulce\n4)Hamburguesa")

let opcion = prompt("¿Desea empezar a comprar? S/N")

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
    let menu_opcion = parseInt(prompt("¿Que producto desea comprar?"))

    while (menu_opcion < 1 || menu_opcion >4) {
        menu_opcion = parseInt(prompt("¿Que producto desea comprar?"))
    }
    let cantidad = parseInt(prompt("¿Cuantos desea comprar?"))

    if (menu_opcion == 1) {
        total = protorta * cantidad
    } else if(menu_opcion == 2) {
        total = budin * cantidad
    } else if (menu_opcion == 2) {
        total = dulce * cantidad
    } else {
        total = hamburguesa * cantidad
    }
    ;
}

console.log("Total: " + total)

document.getElementById("total").textContent += total



