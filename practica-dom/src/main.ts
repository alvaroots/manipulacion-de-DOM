const input = document.querySelector<HTMLInputElement>("#pokemonName")!;
const searchBtn = document.querySelector<HTMLButtonElement>("#searchBtn")!;
const result = document.querySelector<HTMLDivElement>("#result")!;

searchBtn.addEventListener("click", () => {
  result.textContent = `Searching for ${input.value}...`;
});

async function searchPokemon(name: string) {
  result.innerHTML = `<p style="color:yellow;">Buscando Pokémon...</p>`;
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    );
    if (!res.ok) throw new Error("Pokémon not found");
    const data = await res.json();
    const type = data.types[0].type.name;

    let typeColor = "";
    switch (type) {
      case "fire":
        typeColor = "orangered";
        break;
      case "water":
        typeColor = "deepskyblue";
        break;
      case "grass":
        typeColor = "mediumseagreen";
        break;
      case "electric":
        typeColor = "gold";
        break;
      default:
        typeColor = "gray";
    }

    const card = document.createElement("div");
    card.classList.add("pokemon-card");
    card.style.border = `2px solid ${typeColor}`;
    card.style.marginBottom = "20px";
    card.style.padding = "10px";
    card.style.borderRadius = "10px";
    card.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
    card.style.color = "white";
    card.style.textAlign = "center";

    const title = document.createElement("h2");
    title.textContent = data.name.toUpperCase();
    card.appendChild(title);

    const img = document.createElement("img");
    img.src = data.sprites.front_default;
    img.alt = data.name;
    img.style.width = "120px";
    card.appendChild(img);

    const heightP = document.createElement("p");
    heightP.textContent = `Altura: ${data.height}`;
    card.appendChild(heightP);

    const weightP = document.createElement("p");
    weightP.textContent = `Peso: ${data.weight}`;
    card.appendChild(weightP);

    const typeP = document.createElement("p");
    typeP.textContent = `Tipo: ${type}`;
    card.appendChild(typeP);

    result.appendChild(card);
  } catch (error) {
    result.innerHTML = `<p style="color:red;">❌ No se encontró el Pokémon</p>`;
  }
}

const message = document.createElement("p");
message.textContent = "Welcome to the Pokédex DOM";
message.style.color = "purple";
message.style.fontWeight = "bold";
message.style.textAlign = "center";
document.getElementsByClassName("finder-container")[0].appendChild(message);

input.addEventListener("focus", () => {
  input.style.border = "2px solid purple";
  message.textContent = "Start searching for your Pokémon!";
});

input.addEventListener("blur", () => {
  input.style.border = "";
  message.textContent = "Welcome to the Pokédex DOM";
});

input.addEventListener("keydown", (event) => {
  if (event.key == "Enter")
    result.textContent = `Searching for ${input.value}...`;
});

searchBtn.addEventListener("click", () => {
  if (input.value.trim() !== "") searchPokemon(input.value);
});

result.addEventListener("mouseover", () => {
  result.style.backgroundColor = "rgba(10, 10, 26, 0.7)";
});

result.addEventListener("mouseout", () => {
  result.style.backgroundColor = "transparent";
});
