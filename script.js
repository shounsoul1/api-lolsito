const champion = "champion"
const campeonesCont = document.getElementById("champs");
let allChampions = [];
const getAllChampions = async () => {
    const response = await fetch('https://ddragon.leagueoflegends.com/cdn/13.14.1/data/en_US/champion.json');
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
    const findChamps = allChampions.filter((champion) =>
        champion.name.toLowerCase().includes(input.toLowerCase())
    );
    printFindChamps(findChamps);
};

const printFindChamps = (findChamps) => {
    campeonesCont.innerHTML = "";
    findChamps.forEach((champion) => {
        const image = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`;
        printChampion(champion, image);
    });
};

const printChampion = (champion, image) => {
    const campeones = document.createElement("div");
    campeones.className = "column is-2 mt-2 ml-2";
    campeones.innerHTML = `
            <div class="card has-background-black ">
                <div class="card-image">
                    <figure class="image">
                        <img src="${image}">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="media-content is-family-sans-serif">
                        <p class="title is-5 is-family-monospace has-text-weight-medium has-text-centered has-text-warning">${champion.name}</p>
                        <p class="title no is-7 is-family-monospace has-text-weight-medium has-text-centered has-text-warning is-capitalized">${champion.title}</p>
                        <div class="is-flex is-justify-content-space-around ">
                            ${champion.tags.map(tag => `<p class=" pl-1 pr-1 my-text has-text-success-dark">${tag}</p>`).join("")}
                        </div>
                    </div>
                </div>
                <div class="content is-flex is-justify-content-space-around">
                    <div class="is-flex is-flex-direction-column is-align-items-center">
                        <p class="title is-5 has-text-warning-dark">${champion.stats.hp} HP</p>
                        <p class="is-flex-wrap-wrap has-text-warning is-size-7">Health Points</p>
                    </div>
                    <div class="is-flex is-flex-direction-column is-align-items-center">
                        <p class="title is-5 has-text-warning-dark">${champion.stats.attackdamage} AD-AP</p>
                        <p class="is-flex-wrap-wrap has-text-warning is-size-7">Attack Damage</p>
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

input.addEventListener("focus", () => {
    input.select();
})

input.addEventListener("input", function() {
    let inputValue = input.value;
    input.value = primeraLetra(inputValue);
});

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") { 
        buscar();
    }
});

let boton = document.getElementById("buscar");
boton.addEventListener("click", buscar)





