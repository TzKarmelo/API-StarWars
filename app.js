const characterList = document.getElementById('lista-personajes');
const planetList = document.getElementById('lista-planetas');
const starshipList = document.getElementById('lista-naves');
const speciesList = document.getElementById('lista-especies');

async function getData() {
  try {
    const characterResponse = await fetch('https://swapi.dev/api/people/');
    const characterData = await characterResponse.json();
    const planetResponse = await fetch('https://swapi.dev/api/planets/');
    const planetData = await planetResponse.json();
    const speciesResponse = await fetch('https://swapi.dev/api/species/');
    const speciesData = await speciesResponse.json();
    const starshipResponse = await fetch('https://swapi.dev/api/starships/');
    const starshipData = await starshipResponse.json();
    return { characterData, planetData, starshipData, speciesData };
  } catch (error) {
    console.error(error);
  }
}

function showSpecies(species) {
  let output = '';
  species.forEach(specie => {
    const imageUrl = `https://starwars-visualguide.com/assets/img/species/${specie.url.match(/\d+/)}.jpg`;
    output += `
      <div class="item">
        <img src="${imageUrl}" alt="${specie.name}" onerror="this.src='error-image.jpg'; this.classList.add('error')">
        <h3>${specie.name}</h3>
        <p>Clasificación: ${specie.classification}</p>
        <p>Designación: ${specie.designation}</p>
        <p>Altura Promedio: ${specie.average_height}</p>
      </div>
    `;
  });
  speciesList.innerHTML = output;
}

function showCharacters(characters) {
  let output = '';
  characters.forEach(character => {
    const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${character.url.match(/\d+/)}.jpg`;
    output += `
      <div class="item">
        <img src="${imageUrl}" alt="${character.name}" onerror="this.src='error-image.jpg'; this.classList.add('error')">
        <h3>${character.name}</h3>
        <p>Género: ${character.gender}</p>
        <p>Fecha de Nacimiento: ${character.birth_year}</p>
      </div>
    `;
  });
  characterList.innerHTML = output;
}

function showPlanets(planets) {
  let output = '';
  planets.forEach(planet => {
    const imageUrl = `https://starwars-visualguide.com/assets/img/planets/${planet.url.match(/\d+/)}.jpg`;
    output += `
      <div class="item">
        <img src="${imageUrl}" alt="${planet.name}" onerror="this.src='error-image.jpg'; this.classList.add('error')">
        <h3>${planet.name}</h3>
        <p>Clima: ${planet.climate}</p>
        <p>Terreno: ${planet.terrain}</p>
        <p>Habitantes: ${planet.population}</p>
      </div>
    `;
  });
  planetList.innerHTML = output;
}

function showStarships(starships) {
  let output = '';
  starships.forEach(starship => {
    const imageUrl = `https://starwars-visualguide.com/assets/img/starships/${starship.url.match(/\d+/)}.jpg`;
    output += `
      <div class="item">
        <img src="${imageUrl}" alt="${starship.name}" onerror="this.src='error-image.jpg'; this.classList.add('error')">
        <h3>${starship.name}</h3>
        <p>Modelo: ${starship.model}</p>
        <p>Tripulación: ${starship.crew}</p>
        <p>Pasajeros: ${starship.passengers}</p>
      </div>
    `;
  });
  starshipList.innerHTML = output;
}

getData().then(data => {
  showCharacters(data.characterData.results);
  showPlanets(data.planetData.results);
  showStarships(data.starshipData.results);
  showSpecies(data.speciesData.results);
});
