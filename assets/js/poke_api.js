const pokeApi = {};

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(/*(response) => */ convertPokemonApiDetailToPokemon /*(response)*/);
};

pokeApi.getPokemons = (offset = 0, limit = 10) => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

  return fetch(url)
    .then((response) => response.json())
    .then((response) => response.results)
    .then((response) => response.map(pokeApi.getPokemonDetail))
    .then((response) => Promise.all(response))
    .then((response) => response)
    .catch((error) => console.log(error));

};


