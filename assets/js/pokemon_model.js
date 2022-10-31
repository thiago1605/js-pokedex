class Pokemon {
  name;
  number;
  types = [];
  type;
  photo;
  statLevels = [];
}

const convertPokemonApiDetailToPokemon = (pokeDetail) => {
  const pokemon = new Pokemon();

  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;
  pokemon.types = types;
  pokemon.type = type;

  const statLevel = pokeDetail.stats.map((items) => items.base_stat);
  pokemon.statLevels = statLevel;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
};
