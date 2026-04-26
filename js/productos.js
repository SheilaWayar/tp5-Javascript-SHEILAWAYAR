// Array de mínimo 8 productos con id, nombre, precio, categoria, enStock
const productos = [
  { id: 1, nombre: "Notebook Lenovo", precio: 4500, categoria: "Tecnologia", enStock: true },
  { id: 2, nombre: "Mouse Logitech", precio: 800, categoria: "Tecnologia", enStock: true },
  { id: 3, nombre: "Silla Gamer", precio: 3200, categoria: "Muebles", enStock: false },
  { id: 4, nombre: "Teclado Mecánico", precio: 1500, categoria: "Tecnologia", enStock: true },
  { id: 5, nombre: "Escritorio Roble", precio: 4800, categoria: "Muebles", enStock: true },
  { id: 6, nombre: "Auriculares Sony", precio: 2200, categoria: "Audio", enStock: true },
  { id: 7, nombre: "Parlante JBL", precio: 3500, categoria: "Audio", enStock: false },
  { id: 8, nombre: "Monitor 24''", precio: 2900, categoria: "Tecnologia", enStock: true },
  { id: 9, nombre: "Mesa Ratona", precio: 1200, categoria: "Muebles", enStock: true }
];

// Elementos del DOM
const contenedor = document.getElementById('contenedor-productos');
const selectCategoria = document.getElementById('filtro-categoria');
const inputPrecio = document.getElementById('filtro-precio');
const valorPrecio = document.getElementById('valor-precio');
const checkStock = document.getElementById('filtro-stock');
const inputNombre = document.getElementById('filtro-nombre');

// (a) Mostrar productos con .map() + .innerHTML
const mostrarProductos = (lista) => {
    contenedor.innerHTML = lista.map(producto => `
        <div class="tarjeta ${!producto.enStock ? 'sin-stock' : ''}">
            <h3>${producto.nombre}</h3>
            <p>Categoría: ${producto.categoria}</p>
            <p class="precio">$${producto.precio}</p>
            <p>${producto.enStock ? '✅ En stock' : '❌ Sin stock'}</p>
        </div>
    `).join('');
};

// Cargar categorías únicas en el select
const cargarCategorias = () => {
    const categorias = [...new Set(productos.map(p => p.categoria))];
    selectCategoria.innerHTML += categorias.map(cat => 
        `<option value="${cat}">${cat}</option>`
    ).join('');
};

// Función que aplica TODOS los filtros combinados
const aplicarFiltros = () => {
    const categoriaElegida = selectCategoria.value;
    const precioMaximo = Number(inputPrecio.value);
    const soloStock = checkStock.checked;
    const textoBusqueda = inputNombre.value.toLowerCase();

    const productosFiltrados = productos
        .filter(p => categoriaElegida === 'todas' || p.categoria === categoriaElegida) // (b) filtro categoria
        .filter(p => p.precio <= precioMaximo) // (c) filtro precio
        .filter(p => !soloStock || p.enStock) // (d) filtro stock
        .filter(p => p.nombre.toLowerCase().includes(textoBusqueda)); // (e) filtro nombre

    mostrarProductos(productosFiltrados);
};

// Eventos para actualizar en tiempo real
selectCategoria.addEventListener('change', aplicarFiltros);
inputPrecio.addEventListener('input', () => {
    valorPrecio.textContent = inputPrecio.value;
    aplicarFiltros();
});
checkStock.addEventListener('change', aplicarFiltros);
inputNombre.addEventListener('input', aplicarFiltros);

// Inicializar
cargarCategorias();
mostrarProductos(productos);