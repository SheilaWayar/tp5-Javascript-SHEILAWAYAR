const btnCargar = document.getElementById('btn-cargar');
const estado = document.getElementById('estado');
const contenedor = document.getElementById('contenedor-pokemon');

// (a) Función async que hace fetch a la API
const obtenerPokemon = async () => {
    // (d) Mostrar "Cargando..." mientras espera
    estado.textContent = 'Cargando Pokémon...';
    estado.className = 'cargando';
    contenedor.innerHTML = '';
    btnCargar.disabled = true;

    // (c) try/catch para manejar errores
    try {
        // Traemos 12 pokemon aleatorios del 1 al 151
        const idsAleatorios = Array.from({length: 12}, () => 
            Math.floor(Math.random() * 151) + 1
        );

        const promesas = idsAleatorios.map(id => 
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        );

        const respuestas = await Promise.all(promesas);

        // (b) Verificar response.ok antes de procesar
        for (const response of respuestas) {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
        }

        const datosPokemon = await Promise.all(
            respuestas.map(response => response.json())
        );

        // (e) Renderizar datos como tarjetas en el DOM usando .map()
        contenedor.innerHTML = datosPokemon.map(pokemon => `
            <div class="tarjeta-pokemon">
                <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
                <h3>${pokemon.name} #${pokemon.id}</h3>
                <div class="tipos">
                    ${pokemon.types.map(t => `<span class="tipo">${t.type.name}</span>`).join('')}
                </div>
            </div>
        `).join('');

        estado.textContent = `Se cargaron ${datosPokemon.length} Pokémon`;
        estado.className = '';

    } catch (error) {
        // (f) Si hay error, mostrar mensaje visible
        console.error('Error:', error);
        estado.textContent = `Error al cargar datos: ${error.message}. Revisá tu conexión.`;
        estado.className = 'error';
        contenedor.innerHTML = '';
    } finally {
        btnCargar.disabled = false;
    }
};

btnCargar.addEventListener('click', obtenerPokemon);

// Carga inicial al abrir la página
obtenerPokemon();