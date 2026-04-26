const btnCargar = document.getElementById('btn-cargar');
const estado = document.getElementById('estado');
const contenedor = document.getElementById('contenedor-pokemon');

const renderizarPokemon = (listaPokemon) => {
    if (listaPokemon.length === 0) {
        contenedor.innerHTML = '';
        estado.textContent = 'No se encontraron resultados';
        estado.className = 'vacio'; 
        return;
    }
    
    contenedor.innerHTML = listaPokemon.map(pokemon => `
        <div class="tarjeta-pokemon">
            <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
            <h3>${pokemon.name} #${pokemon.id}</h3>
            <div class="tipos">
                ${pokemon.types.map(t => `<span class="tipo">${t.type.name}</span>`).join('')}
            </div>
        </div>
    `).join('');
    
    estado.textContent = `Se cargaron ${listaPokemon.length} Pokémon`;
    estado.className = '';
};

// (a) Función async que hace fetch a la API
const obtenerPokemon = async () => {
    // (d) Mostrar "Cargando..." mientras espera
    estado.textContent = 'Cargando Pokémon...';
    estado.className = ''}