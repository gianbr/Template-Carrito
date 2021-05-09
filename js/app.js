// Variables
const carrito = document.querySelector('#carrito');
const listaRopa = document.querySelector('#lista-prendas');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = [];

// Listeners
cargarEventListeners();

function cargarEventListeners() {
    // Dispara cuando se presiona "Agregar Carrito"
    listaRopa.addEventListener('click', agregarPrenda);

    // Cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarPrenda);

    // Muestra los cursos de Local Storage
    document.addEventListener('DOMContentLoaded', () =>{
        articulosCarrito = JSON.parse( localStorage.getItem('carrito')) || [];

        carritoHTML();
    })

    // Al Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];

        vaciarCarrito();
    });

}

// Funciones
// Función que añade el curso al carrito
function agregarPrenda(e) {
     e.preventDefault();
     // Delegation para agregar-carrito
     if(e.target.classList.contains('agregar-carrito')) {
          const prenda = e.target.parentElement.parentElement;
          // Enviamos el curso seleccionado para tomar sus datos
          leerDatosPrenda(prenda);
     }
}

// Lee los datos del curso
function leerDatosPrenda(prenda) {
     const infoPrenda = {
          imagen: prenda.querySelector('img').src,
          titulo: prenda.querySelector('h4').textContent,
          precio: prenda.querySelector('.precio span').textContent,
          id: prenda.querySelector('a').getAttribute('data-id'), 
          cantidad: 1,
     }
     console.log(infoPrenda);


     if( articulosCarrito.some( prenda => prenda.id === infoPrenda.id ) ) { 
          const prendas = articulosCarrito.map( prenda => {
               if( prenda.id === infoPrenda.id ) {
                    prenda.cantidad++;
                     return prenda;
                } else {
                     return prenda;
             }
          })
          articulosCarrito = [...prendas];
     }  else {
          articulosCarrito = [...articulosCarrito, infoPrenda];
     }

     console.log(articulosCarrito)

     

     // console.log(articulosCarrito)
     carritoHTML();
}

// Elimina el curso del carrito en el DOM
function eliminarPrenda(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-curso') ) {
          // e.target.parentElement.parentElement.remove();
          const prendaId = e.target.getAttribute('data-id')
          
          // Eliminar del arreglo del carrito
          articulosCarrito = articulosCarrito.filter(prenda => {
              if(prenda.id === prendaId){
                  if(prenda.cantidad > 1){
                      prenda.cantidad--;
                      return prenda;
                  }else{
                      delete prenda;
                  }
              }else{
                  return prenda;
              }
          });

          carritoHTML();
     }
}

// Muestra el curso seleccionado en el Carrito
function carritoHTML() {

     vaciarCarrito();

     articulosCarrito.forEach(prenda => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${prenda.imagen}" width=50>
               </td>
               <td>${prenda.titulo}</td>
               <td>${prenda.precio}</td>
               <td><div class="precio-carrito">${prenda.cantidad}</div> </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${prenda.id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });

     // Agregar el carrito de compras al storage
     sincronizarStorage();

}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
     // forma lenta
     // contenedorCarrito.innerHTML = '';


     // forma rapida (recomendada)
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
      }
      localStorage.setItem('carrito', []);
}