//sopas, rellenenos, pollos, carnes, rollos, rellenos, 
//pizza
const productos=[
    {
        id:"compra0.1-01",
        titulo: "Pizza de peperoni",
        imagen:"assets/media/pizzaPeperoni.jpg",
        categoria:{
            nombre:"pizzas",
            id:"pizza"
        },
        precio:8000
    },
    {
        id:"compra0.2-02",
        titulo: "Pizza de carne",
        imagen:"assets/media/pizzaCarne.jpg",
        categoria:{
            nombre:"pizzas",
            id:"pizza"
        },
        precio:8500
    },
    {
        id:"compra0.3-03",
        titulo: "Pizza estra queso",
        imagen:"assets/media/pizzaQuesoMatas.jpg",
        categoria:{
            nombre:"pizzas",
            id:"pizza"
        },
        precio:10000
    },
    {
        id:"compra0.4-04",
        titulo: "Pizza de susto",
        imagen:"assets/media/pizzaSusto.jpg",
        categoria:{
            nombre:"pizzas",
            id:"pizza"
        },
        precio:12000
    },
    {
        id:"compra0.5-05",
        titulo: "Pizza vegetariana",
        imagen:"assets/media/pizzaVegetariana.jpg",
        categoria:{
            nombre:"pizzas",
            id:"pizza"
        },
        precio:7000
    },

//refrescos

    {
        id:"compra0.9-09",
        titulo: "Refresco AQUA personal",
        imagen:"assets/media/refrescoAqua.jpg",
        categoria:{
            nombre:"refrescos",
            id:"refresco"
        },
        precio:4000
    },
    {
        id:"compra0.10-10",
        titulo: "Refresco Cocacola personal",
        imagen:"assets/media/refrescoCocacola.jpg",
        categoria:{
            nombre:"refrescos",
            id:"refresco"
        },
        precio:5000
    },
    {
        id:"compra0.11-11",
        titulo: "Refresco Pepsi personal",
        imagen:"assets/media/refrescoPepsi.jpg",
        categoria:{
            nombre:"refrescos",
            id:"refresco"
        },
        precio:10000
    },
    {
        id:"compra0.12-12",
        titulo: "Refresco Poni-Malta personal",
        imagen:"assets/media/poni.jpg",
        categoria:{
            nombre:"refrescos",
            id:"refresco"
        },
        precio:2000
    },



//postres


    {
        id:"compra0.13-13",
        titulo: "Postre de chocolate",
        imagen:"assets/media/postreChocolate.jpg",
        categoria:{
            nombre:"postres",
            id:"postre"
        },
        precio:8000
    },


    {
        id:"compra0.14-14",
        titulo: "Postre de galleta",
        imagen:"assets/media/postreGalleta.jpg",
        categoria:{
            nombre:"postres",
            id:"postre"
        },
        precio:6000
    },
    {
        id:"compra0.15-15",
        titulo: "Postre de maracuya",
        imagen:"assets/media/postreMaracuya.jpg",
        categoria:{
            nombre:"postres",
            id:"postre"
        },
        precio:7500
    },
    {
        id:"compra0.16-16",
        titulo: "Postre vegetariano",
        imagen:"assets/media/postreVegano.jpg",
        categoria:{
            nombre:"postres",
            id:"postre"
        },
        precio:9000
    },
    {
        id:"compra0.17-17",
        titulo: "Postre de fresa",
        imagen:"assets/media/PostreFresa.jpg",
        categoria:{
            nombre:"postres",
            id:"postre"
        },
        precio:8300
    }
];
const contenedorProductos=document.querySelector("#contenedor-productos");
const botonesCategorias=document.querySelectorAll(".button-categoria");
const tituloPrincipal=document.querySelector("#titulo-principal");
let botonesAgregar=document.querySelectorAll(".producto-agregar");
const numerito=document.querySelector("#numerito");
function cargarProductos(productosElegidos){
    contenedorProductos.innerHTML="";
    productosElegidos.forEach(producto=>{
    const div=document.createElement("div")
    div.classList.add("producto");
    //ponemos el html
    div.innerHTML=`<img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}" srcset="">
    <div class="producto-detalles">
      <h3 class="producto-titulo">${producto.titulo}</h3>
      <p class="producto-precio">${producto.precio}</p>
      <button class="producto-agregar" id="${producto.id}">Agregar</button>
    </div>`;
    contenedorProductos.append(div);


    })
    actualizarBotonesAgregar();

}
cargarProductos(productos);

botonesCategorias.forEach(boton=>{
    boton.addEventListener("click",(e)=>{
        botonesCategorias.forEach(boton=>boton.classList.remove("active"));
e.currentTarget.classList.add("active");
if(e.currentTarget.id !="todos"){
    const productosCategoria=productos.find(producto=>producto.categoria.id===e.currentTarget.id);
    tituloPrincipal.innerText = productosCategoria.categoria.nombre;
    const productosBoton=productos.filter(productos=>productos.categoria.id===e.currentTarget.id);

    cargarProductos(productosBoton);
}else{
    tituloPrincipal.innerHTML="Todos los productos";
    cargarProductos(productos
        
        );
   
}

    })
});
function actualizarBotonesAgregar(){
    botonesAgregar=document.querySelectorAll(".producto-agregar");
 botonesAgregar.forEach(boton=>{
    boton.addEventListener("click",agregarAlCarrito);
 });
}
 let productosEnCarrito; 
let productosEnCarritoLS=localStorage.getItem("productos-en-carrito");



const productosCarrito = [];

function agregarAlCarrito(e){
const idBoton=e.currentTarget.id;
const productoAgregado= productos.find(producto=>producto.id===idBoton)
if(productosCarrito.some(producto=>producto.id==idBoton)){
const index=productosCarrito.findIndex(producto=>producto.id===idBoton)
productosCarrito[index].cantidad++;


}else{
    productoAgregado.cantidad=1;
    productosCarrito.push(productoAgregado);

}
actualizarNumerito();
localStorage.setItem("productos-en-carrito",JSON.stringify(productosCarrito));
}
function actualizarNumerito(){
    let nuevoNumerito=productosCarrito.reduce((acc,producto)=>acc+producto.cantidad,0);
numerito.innerText=nuevoNumerito;
}