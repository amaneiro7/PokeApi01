const API = 'https://pokeapi.co/api/v2/pokemon/'
const input = document.querySelector('.input');
const btn = document.querySelector('.btn');


const options = {
	method: 'GET',
	headers: {
        'X-RapidAPI-Key': 'ed41bd4e65msha325344539cd83dp1edcbejsn62a49f4a6fdf',
		'X-RapidAPI-Host': 'pokedex2.p.rapidapi.com'
	}
};

async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
	const data = await response.json();
	return data;
}

const pokeSearch = async (urlApi) => {    
    try {
        const pokemon = await fetchData(`${urlApi}/${input.value}`);
        console.log(pokemon);
    } catch {
        console.error(error);
    }
}

btn.addEventListener('click', pokeSearch(API));