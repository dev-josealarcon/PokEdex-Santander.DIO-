const pokeApi={};

function convertPokeApiDetailToPokemon(pokeDetail){
  const pokemon = new Pokemon();

  pokemon.number = pokeDetail.id;

  pokemon.name = pokeDetail.name.toUpperCase();

  const types = pokeDetail.types.map(typeSlot => typeSlot.type.name);
  const [type] = types;
 
  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;




  pokemon.abilities = pokeDetail.abilities.map((ability) => ability.ability.name).join(', ');
  pokemon.species = pokeDetail.species.name;
  pokemon.height = pokeDetail.height;
  pokemon.weight = pokeDetail.weight;






  return pokemon;
  
}

pokeApi.getPokemonDetail = (pokemon)=>{
  return  fetch(pokemon.url)//ubicamos a url de cada pokemon para fazer outr fecth á url e trazer detalhes de cada pokemon
    .then(responsePokemon => responsePokemon.json())//Transformamos essa nova reponsta em json
    .then(convertPokeApiDetailToPokemon );
}


pokeApi.getPokemons =  (offset=0, limit=8) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

    return fetch(url)
    .then(response => response.json()) //o Response vem em outro formato por tanto devemos transformar em JSON para manipularlo.
    //Ao transoformar em json nós damos  conta que é outra Promise então devemos tratarla como tal por isso fazemos um outro then
    .then(jsonBody => jsonBody.results) //Ubicamos onde fica o arreglo de dados "results" e enviamos para o método
    .then(pokemons => pokemons.map(pokeApi.getPokemonDetail)) //transforma numa lista e chama o método acima  para fazer fetch a cada elemento da lista
    .then(detailRequest =>Promise.all(detailRequest))//Promise.all receve um array de fetch e faz aguardar a todo mundo terminar
    .then(pokemonDetails => pokemonDetails)
    .catch(error => console.log(error))
    .finally(() => console.log("Requisição concluída!"));
}


