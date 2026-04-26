const btnCargar = document.getElementById('btn-cargar');
const contenedor = document.getElementById('contenedor-pokemon');
const estado = document.getElementById('estado');
const buscador = document.getElementById('buscador');

let todosLosPokemons = []; // Acá guardamos los 12 para filtrar

btnCargar.addEventListener('click', async () => {
  estado.textContent = 'Cargando...';
  contenedor.innerHTML = '';
  buscador.value = ''; // Limpia el buscador
  
  try {
    const ids = [];
    while (ids.length < 12) {
      const id = Math.floor(Math.random() * 898) + 1;
      if (!ids.includes(id)) ids.push(id);
    }

    const promesas = ids.map(id => 
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
    );
    
    const resultados = await Promise.all(promesas);
    todosLosPokemons = resultados; // Guardamos para el filtro
    
    renderizarPokemons(todosLosPokemons);
    estado.textContent = `Se cargaron ${todosLosPokemons.length} Pokémon`;
    
  } catch (error) {
    estado.textContent = 'Error al cargar. Intentá de nuevo.';
    console.error(error);
  }
});

// ESTA ES LA PARTE DEL BUSCADOR QUE TE FALTA
buscador.addEventListener('input', () => {
  const texto = buscador.value.toLowerCase();
  
  if (todosLosPokemons.length === 0) return; // Si no hay pokémon, no hace nada
  
  const filtrados = todosLosPokemons.filter(pokemon => 
    pokemon.name.toLowerCase().includes(texto)
  );
  
  renderizarPokemons(filtrados);
  
  if (filtrados.length === 0 && texto.length > 0) {
    contenedor.innerHTML = '<p>No se encontraron resultados</p>';
  }
});

function renderizarPokemons(lista) {
  contenedor.innerHTML = lista.map(pokemon => `
    <div class="pokemon-card">
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      <h3>${pokemon.name}</h3>
      <p>#${pokemon.id}</p>
    </div>
  `).join('');
}