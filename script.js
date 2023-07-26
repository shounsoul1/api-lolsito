const apiKey = "RGAPI-f243187c-b3b1-4850-880f-b62c6a523937"
const champion = "champion"
const campeonesCont = document.getElementById("champs");
let allChampions = [];
const getAllChampions = async () => {
    const response = await fetch('http://ddragon.leagueoflegends.com/cdn/13.14.1/data/en_US/champion.json');
    const data = await response.json();
    allChampions = Object.values(data.data)
    printAllChampions();
};

const printAllChampions = () => {
    campeonesCont.innerHTML = "";
    allChampions.forEach((champion) => {
        const image = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`;
        printChampion(champion, image);
    });
}

const buscar = () => {
    const input = document.getElementById("texto").value;
    const filteredChampions = allChampions.filter((champion) =>
        champion.name.toLowerCase().includes(input.toLowerCase())
    );
    printFilteredChampions(filteredChampions);
};

const printFilteredChampions = (filteredChampions) => {
    campeonesCont.innerHTML = "";
    filteredChampions.forEach((champion) => {
        const image = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`;
        printChampion(champion, image);
    });
};

const printChampion = (champion, image) => {
    const campeones = document.createElement("div");
    campeones.className = "column is-2 mt-2 ml-2";
    campeones.innerHTML = `
            <div class="card">
                <div class="card-image">
                    <figure class="image">
                        <img src="${image}">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="media-content is-family-sans-serif">
                        <p class="title is-4 is-family-monospace has-text-weight-medium has-text-centered">${champion.name}</p>
                        <div class="is-flex is-justify-content-space-around">
                            ${champion.tags.map(tag => `<p class="has-background-primary pl-1 pr-1 my-text">${tag}</p>`).join("")}
                        </div>
                    </div>
                </div>
                <div class="content is-flex is-justify-content-space-around">
                    <div class="is-flex is-flex-direction-column is-align-items-center">
                        <p class="title is-5">${champion.stats.hp} HP</p>
                        <p class="is-flex-wrap-wrap">Health Points</p>
                    </div>
                    <div class="is-flex is-flex-direction-column is-align-items-center">
                        <p class="title is-5">${champion.stats.attackdamage} AD</p>
                        <p class="is-flex-wrap-wrap">Attack Damage</p>
                    </div>
                </div>
            </div>`;
    campeonesCont.appendChild(campeones);
};


function primeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

document.addEventListener("DOMContentLoaded", getAllChampions);


const input = document.getElementById("texto");


input.addEventListener('input', function() {
    let inputValue = input.value;
    input.value = primeraLetra(inputValue);
});

let boton = document.getElementById("buscar");
boton.addEventListener("click", buscar)





