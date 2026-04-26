const btnCargar = document.getElementById('btn-cargar');
const estado = document.getElementById('estado');
const contenedor = document.getElementById('contenedor-pokemon');
const buscador = document.getElementById('buscador');

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

const obtenerPokemon = async () => {
    estado.textContent = 'Cargando Pokémon...';
    estado.className = '';
    btnCargar.disabled = true;
    
    try {
        const ids = Array.from({length: 12}, () => Math.floor(Math.random() * 151) + 1);
        const promesas = ids.map(id => 
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
        );
        const datos = await Promise.all(promesas);
        
        renderizarPokemon(datos);
        
    } catch (error) {
        estado.textContent = 'Error al cargar Pokémon. Revisá tu conexión.';
        estado.className = 'error';
        console.error(error);
    } finally {
        btnCargar.disabled = false;
    }
};

// ESTA LÍNEA TE FALTABA - conecta el botón
btnCargar.addEventListener('click', obtenerPokemon);

console.log("JS cargado correctamente");