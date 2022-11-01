const API = 'https://pokeapi.co/api/v2/pokemon'
let pokemonData;
const input = document.querySelector('.input');
const btnSearch = document.querySelector('.btn-search');
const btnRandom = document.querySelector('.btn-random');
const cardBodyImg = document.querySelector('.card-body-img');
const cardBodyTitle = document.querySelector('.card-body-title');
const type = document.querySelector('.card-body-type')
const life = document.querySelector('#life')
const attack = document.querySelector('#attack')
const defense = document.querySelector('#defense')
const specialAttack = document.querySelector('#specialAttack')
const specialDefense = document.querySelector('#specialDefense')
const speed = document.querySelector('#speed')
window.addEventListener('load', getRandomPkn);

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const options = {
	method: 'GET',
	headers: {
        'X-RapidAPI-Key': 'ed41bd4e65msha325344539cd83dp1edcbejsn62a49f4a6fdf',
		'X-RapidAPI-Host': 'pokedex2.p.rapidapi.com'
	}
};

async function fetchData(urlApi) {
    const response = await fetch(urlApi);
	const data = await response.json();
	return data;
}

const pokeSearch = async (urlApi) => {      
    try {        
        const pokemon = await fetchData(urlApi);
        pokemonData = pokemon        
        renderPokemon(pokemonData)        
    } catch {
        console.error(error);
    }
};

function renderPokemon(pokemonData) {
    cardBodyImg.setAttribute('src', pokemonData.sprites.front_default);
    cardBodyTitle.innerHTML = `${pokemonData.name} <span>${pokemonData.id}</span>`;
    life.innerHTML = `${pokemonData.stats[0].base_stat}`;
    attack.innerHTML = `${pokemonData.stats[1].base_stat}`;
    defense.innerHTML = `${pokemonData.stats[2].base_stat}`;
    specialAttack.innerHTML = `${pokemonData.stats[3].base_stat}`;
    specialDefense.innerHTML = `${pokemonData.stats[4].base_stat}`;
    speed.innerHTML = `${pokemonData.stats[5].base_stat}`;
    getType();
    return
};

function getType() {
    if (pokemonData.types.length === 1) {        
        type.innerHTML = `${pokemonData.types[0].type.name[0].toUpperCase()}${pokemonData.types[0].type.name.substring(1)}`;        
    } else {
        type.innerHTML = `${pokemonData.types[0].type.name[0].toUpperCase()}${pokemonData.types[0].type.name.substring(1)} / ${pokemonData.types[1].type.name[0].toUpperCase()}${pokemonData.types[1].type.name.substring(1)}`;
    }   
    return
}


btnSearch.addEventListener('click', getSearchPkm);
input.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        getSearchPkm();
        return
    }
});

btnRandom.addEventListener('click', getRandomPkn);

function getSearchPkm () {
    urlApi = `${API}/${input.value}`
    pokeSearch(urlApi)
    input.value = ""
}

function getRandomPkn () {
    const randomNum = getRandomInt(1, 906);
    urlApi = `${API}/${randomNum}`;
    pokeSearch(urlApi);
}