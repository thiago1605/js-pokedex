const select = (e) => document.querySelector(e),
  selectAll = (e) => document.querySelectorAll(e);

const loadMoreBtn = select("#loadMoreBtn");

let limit = 10,
  offset = 0,
  modalKey = 0,
  classe = [],
  isTrue = false;

const maxRecords = 151;

let pokemonItem = select(".pokemons .pokemon");

const inputValue1 = "pikachu";
const inputValue = select("#searchInput");

select(".pokemons .pokemon").style.display = "none";

pokeApi.getPokemons(0, 300).then((pokemons = []) => {
  inputValue.addEventListener("change", (e) => {
    e.preventDefault();
    let [{ name, number, types, type, photo, statLevels }] = pokemons.filter(
      ({ name }) => name.includes(e.target.value.toLowerCase())
    );

    loadMoreBtn.remove();

    classe.push(type);

    if (e.target.value != "" && e.target.value === name) {
      select("#pokemonList").innerHTML = `  
      <li class="pokemon ${type}">
          <a href="">
            <span class="name">${name}</span>
            <span class="number">#${number}</span>
            <div class="detail">
                <ol class="types">  
                    ${types.map(
                      (item) => `<li class="type ${item}">${item}</li>`
                    )}
                </ol>
                <img
                    src="${photo}"
                    alt="${name}"
                />
            </div>
          </a>
       </li>`;

      insertModalToScreen(name, type, photo, statLevels);
    } else if (e.target.value == "") {
      select("#pokemonList").innerHTML = ` 
      <li class="pokemon" style="box-shadow: none;">
        <a href="">
          <span class="name"></span>
          <span class="number"></span>
          <div class="detail">
              <ol class="types">
                  <li class="type "></li>
              </ol>
              <img
                  src=""
                  alt=""
              />
          </div>
        </a>
      </li>`;
      teste();
      location.reload();
    }
  });
});

const teste = () => {
  let loadMoreItems = (offset, limit) => {
    if (isTrue) return;

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
      pokemons.map(
        ({ name, number, types, type, photo, statLevels }, index) => {
          pokemonItem = select(".pokemons .pokemon").cloneNode(true);
          pokemonItem.style.display = "flex";

          pokemonItem.setAttribute("data-key", index);
          pokemonItem.classList.add(`${type}`);
          pokemonItem.querySelector(".number").textContent = "#" + number;
          pokemonItem.querySelector(".name").textContent = name;
          pokemonItem.querySelector(".types").innerHTML = `${types
            .map((type) => `<li class="type ${type}">${type}</li>`)
            .join("")}`;

          pokemonItem.querySelector(".detail > img").src = photo;
          pokemonItem.querySelector(".detail > img").alt = name;

          classe.push(type);

          insertModalToSearchScreen(name, type, photo, statLevels);
        }
      );
    });

    select('.content').scrollIntoView({behavior: "smooth", block: "end",})
  };

  loadMoreItems(offset, limit);
};

teste();

const insertModalToSearchScreen = (name, type, photo, statLevels) => {
  //MODAL
  pokemonItem.querySelector("a").addEventListener("click", (e) => {
    e.preventDefault();

    select(".pokemonMoreInfoWindowArea").style.display = "flex";

    const key = e.target.closest(".pokemon").getAttribute("data-key");
    modalKey = key;

    fillModalContent(photo, name);

    removeColorFromModal();

    addColorToModal(type);

    removeColorFromTableRows();

    addColorToTableRows(type);

    addDataToTableRowsLevel();
  });

  select("#pokemonList").append(pokemonItem);

  const addDataToTableRowsLevel = () => {
    const hp = statLevels[0],
      attack = statLevels[1],
      defense = statLevels[2],
      specialAttack = statLevels[3],
      specialDefense = statLevels[4],
      speed = statLevels[5];

    select("#td--number-01").textContent = hp;
    select("#td--number-02").textContent = attack;
    select("#td--number-03").textContent = defense;
    select("#td--number-04").textContent = specialAttack;
    select("#td--number-05").textContent = specialDefense;
    select("#td--number-06").textContent = speed;
  };
};

const insertModalToScreen = (name, type, photo, statLevels) => {
  select("#pokemonList")
    .querySelector("a")
    .addEventListener("click", (e) => {
      e.preventDefault();

      select(".pokemonMoreInfoWindowArea").style.display = "flex";

      fillModalContent(photo, name);

      removeColorFromModal();

      addColorToModal(type);

      removeColorFromTableRows();

      addColorToTableRows(type);

      addDataToTableRowsLevel();
    });

  const addDataToTableRowsLevel = () => {
    const hp = statLevels[0],
      attack = statLevels[1],
      defense = statLevels[2],
      specialAttack = statLevels[3],
      specialDefense = statLevels[4],
      speed = statLevels[5];

    select("#td--number-01").textContent = hp;
    select("#td--number-02").textContent = attack;
    select("#td--number-03").textContent = defense;
    select("#td--number-04").textContent = specialAttack;
    select("#td--number-05").textContent = specialDefense;
    select("#td--number-06").textContent = speed;
  };
};

const fillModalContent = (pokemonMapPhoto, pokemonMapName) => {
  select(".pokemonBig > img").src = pokemonMapPhoto;
  select(".pokemonBig > img").alt = pokemonMapName;
  select(".containerMore h1").textContent = pokemonMapName;
};

const removeColorFromModal = () => {
  classe.map((color) =>
    select(".pokemonWindowBody").classList.remove(`${color}`)
  );
};

const addColorToModal = (pokemonMapType) => {
  select(".pokemonWindowBody").classList.add(`${pokemonMapType}`);
};

const removeColorFromTableRows = () => {
  classe.map((color) => {
    select("#td--attack").classList.remove(`td--n--${color}`);
    select("#td--number-02").classList.remove(`td--n--${color}`);
    select("#td--specialAttack").classList.remove(`td--n--${color}`);
    select("#td--number-04").classList.remove(`td--n--${color}`);
    select("#td--speed").classList.remove(`td--n--${color}`);
    select("#td--number-06").classList.remove(`td--n--${color}`);
  });
};

const addColorToTableRows = (pokemonMapType) => {
  select("#td--attack").classList.add(`td--n--${pokemonMapType}`);
  select("#td--number-02").classList.add(`td--n--${pokemonMapType}`);
  select("#td--specialAttack").classList.add(`td--n--${pokemonMapType}`);
  select("#td--number-04").classList.add(`td--n--${pokemonMapType}`);
  select("#td--speed").classList.add(`td--n--${pokemonMapType}`);
  select("#td--number-06").classList.add(`td--n--${pokemonMapType}`);
};

select(".backBtn").addEventListener("click", () => {
  select(".pokemonMoreInfoWindowArea").style.display = "none";
});

loadMoreBtn.addEventListener("click", () => {
  offset += limit;

  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadMoreItems(offset, newLimit);

    loadMoreBtn.parentElement.removeChild(loadMoreBtn);
  } else {
    teste();
  }
});
