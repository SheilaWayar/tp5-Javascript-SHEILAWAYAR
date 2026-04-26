window.pokemons = [];

document.getElementById('btn-cargar').onclick = async () => {
  const estado = document.getElementById('estado');
  const grid = document.getElementById('contenedor-pokemon');
  
  estado.textContent = 'Cargando...';
  estado.className = 'cargando';
  grid.innerHTML = '';
  
  const ids = [];
  while(ids.length < 12){
    const n = Math.floor(Math.random() * 898) + 1;
    if(!ids.includes(n)) ids.push(n);
  }
  
  try {
    const data = await Promise.all(
      ids.map(id => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(r => r.json()))
    );
    
    window.pokemons = data;
    render(window.pokemons);
    estado.textContent = `Se cargaron ${data.length} Pokémon`;
    estado.className = '';
  } catch(err) {
    estado.textContent = 'Error al cargar';
    estado.className = 'error';
  }
};

document.getElementById('buscador').oninput = (e) => {
  const texto = e.target.value.toLowerCase();
  const filtrados = window.pokemons.filter(p => 
    p.name.toLowerCase().includes(texto)
  );
  
  render(filtrados);
  
  if(filtrados.length === 0 && texto) {
    document.getElementById('contenedor-pokemon').innerHTML = 
      '<div class="vacio">No se encontraron resultados</div>';
  }
};
function render(lista) {
  document.getElementById('contenedor-pokemon').innerHTML = 
    lista.map(p => `
      <div style="
        background: #3d2840; 
        padding: 20px; 
        border-radius: 12px; 
        border: 2px solid #B05994; 
        text-align: center;
        box-shadow: 0 4px 12px rgba(176, 89, 148, 0.2);
        margin: 10px;
      ">
        <img src="${p.sprites.front_default}" alt="${p.name}" style="width:100px; height:100px;">
        <h3 style="color: #B05994; text-transform: capitalize; margin: 10px 0; font-family: Arial;">${p.name}</h3>
        <p style="color: #fce4f0; margin: 5px 0;">#${p.id}</p>
      </div>
    `).join('');
    
  // Esto fuerza el grid en el contenedor
  document.getElementById('contenedor-pokemon').style.cssText = `
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); 
    gap: 20px;
    margin-top: 30px;
  `;
}