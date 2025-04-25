const images = [
  "angular.svg",
  "react.svg",
  "aurelia.svg",
  "backbone.svg",
  "ember.svg",
  "vue.svg",
];

const game = document.getElementById("game");
const cardImages = [...images, ...images];
cardImages.sort(() => Math.random() - 0.5);

let flipped = [];
let isLocked = false;
let attempts = 0;
let winGame = 0;
let tries = 0;
let playerName;
const players = [];

const scoreTable = document.createElement("table");
scoreTable.classList.add("border", "ml-15", "mt-15", "min-w-80", "h-15");
scoreTable.innerHTML = `
  <tr>
    <th class="border p-3 ">Name</th>
    <th class="border p-3">Score</th>
  </tr>
`;
document.body.appendChild(scoreTable);

const buttonContainer = document.createElement("div");
buttonContainer.classList.add("mt-25");

const clearButton = document.createElement("button");
clearButton.textContent = "Clear Scoreboard";
clearButton.classList.add(
  "bg-pink-600",
  "text-white",
  "p-2",
  "mt-25",
  "ml-5",
  "rounded"
);
buttonContainer.appendChild(clearButton);

const playAgainButton = document.createElement("button");
playAgainButton.textContent = "Play Again";
playAgainButton.classList.add(
  "bg-green-600",
  "text-white",
  "p-2",
  "ml-5",
  "rounded"
);
buttonContainer.appendChild(playAgainButton);

document.body.appendChild(buttonContainer);

function updateScoreTable() {
  scoreTable.innerHTML = `
    <tr>
      <th class="border p-3">Name</th>
      <th class="border p-3">Score</th>
    </tr>
  `;
  players.forEach((player) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="border p-3">${player.name}</td>
      <td class="border p-3">${player.score}</td>
    `;
    scoreTable.appendChild(row);
  });
}

function createCards() {
  game.innerHTML = "";
  cardImages.sort(() => Math.random());

  cardImages.forEach((image) => {
    const card = document.createElement("div");
    card.className = "card relative w-24 h-36 cursor-pointer";
    card.dataset.image = image;

    card.innerHTML = `
      <div class="card-inner w-full h-full relative">
        <div class="card-front bg-blue-500 rounded-sm flex items-center justify-center">
          <img src="image/js.svg" class="w-16 h-16"/>
        </div>
        <div class="card-back bg-blue-500 rounded-sm flex items-center justify-center">
          <img src="image/${image}" class="w-16 h-16" />
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      if (
        isLocked ||
        card.classList.contains("flipped") ||
        flipped.includes(card)
      )
        return;

      card.classList.add("flipped");
      flipped.push(card);
      attempts++;

      if (flipped.length === 2) {
        const [first, second] = flipped;
        const firstImage = first.dataset.image;
        const secondImage = second.dataset.image;

        if (firstImage === secondImage) {
          flipped = [];
          winGame++;
          tries++;
          if (winGame === 6) {
            playerName = prompt(
              `GOOD ONE. It only took you ${tries} tries to end this. Please enter your name to save your score`
            );
            if (playerName) {
              players.push({ name: playerName, score: tries });
              updateScoreTable();
            }
          }
        } else {
          isLocked = true;
          tries++;
          setTimeout(() => {
            first.classList.remove("flipped");
            second.classList.remove("flipped");
            flipped = [];
            isLocked = false;
          }, 800);
        }
      }
    });

    game.appendChild(card);
  });
}

createCards();

clearButton.addEventListener("click", () => {
  players.length = 0;
  updateScoreTable();
});

playAgainButton.addEventListener("click", () => {
  flipped = [];
  isLocked = false;
  attempts = 0;
  winGame = 0;
  createCards();
});
