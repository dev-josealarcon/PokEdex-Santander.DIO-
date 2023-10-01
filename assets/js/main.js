const pokemonList = document.getElementById("pokemonsList");
const loadMoreButton = document.getElementById("loadMoreButon");
const maxRecords = 151;
const limit = 8;
let offset = 0;

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map((pokemon) => {
        return `
                <li class="pokemon ${pokemon.type}"   data-pokemon='${JSON.stringify(pokemon)}'">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>

                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types
                              .map(
                                (type) =>
                                  `<li class="type ${type}">${type}</li>`
                              )
                              .join("")}
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
                </li>
                `;
      })
      .join("");

    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;

  const qtdRecordNextPage = offset + limit;
  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

pokemonList.addEventListener("click", function (event) {
  const clickedPokemon = event.target.closest(".pokemon");
  if (clickedPokemon) {
    const pokemonData = JSON.parse(clickedPokemon.getAttribute("data-pokemon"));
    const modal = document.getElementById("pokemonModal");
    const modalBody = document.getElementById("pokemonModalBody");
    const buttonClose = document.querySelector("#pokemonModal button");

    modalBody.innerHTML = `
            <div class="pokemon ${pokemonData.type}">
            
                <div>
                    <h2 >${pokemonData.name} #${pokemonData.number}</h2>
                </div>
                <br>
                <div class="poke-img-modal">
                    <img src="${pokemonData.photo}" alt="${pokemonData.name}">
                </div>
                <br>
                <div class="moredetail">
                    <table>
                            <tr>
                                <td>Types </td>
                                <td>${pokemonData.types}</td>
                            </tr>
                            <tr>
                                <td>Species </td>
                                <td >${pokemonData.species}</td>
                            </tr>
                            <tr>
                                <td>Height </td>
                                <td >${pokemonData.height}</td>
                            </tr>
                            <tr>
                                <td>Weight </td>
                                <td >${pokemonData.weight}</td>
                            </tr>
                            <tr>
                                <td>Abilities </td>
                                <td >${pokemonData.abilities}</td>
                            </tr>
                    </table>
                </div>
            </div>
        `;

    modal.showModal();

    buttonClose.addEventListener("click", () => modal.close());
  }
});
