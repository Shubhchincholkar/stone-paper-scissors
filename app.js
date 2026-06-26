const choices = {
  rock: "🪨",
  paper: "📄",
  scissors: "✂️",
};

// ---------- LOCAL STORAGE KEYS ----------
const STORAGE_KEY = "rps_scores";

function loadScores() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    return JSON.parse(saved);
  }

  return {
    userScore: 0,
    cpuScore: 0,
    tieScore: 0,
    round: 0,
    streak: 0,
  };
}

function saveScores() {
  localStorage.setItem(
    STORAGE_KEY,

    JSON.stringify({
      userScore,
      cpuScore,
      tieScore,
      round,
      streak,
    }),
  );
}

let { userScore, cpuScore, tieScore, round, streak } = loadScores();

const useremoji = document.querySelector(".you-what-choose");

const cpuemoji = document.querySelector(".cpu-what-choose");

const userCircle = document.querySelector(".you-choose");

const cpuCircle = document.querySelector(".cpu-choose");

const resultBox = document.createElement("div");

resultBox.className = "result";
resultBox.style.color = "#eedcdc";
resultBox.style.fontFamily = "Inter,sans-serif";
resultBox.style.fontWeight = "700";

document.querySelector(".vs").appendChild(resultBox);

function play(userchoice) {
  userCircle.classList.remove("win", "lose", "draw");
  cpuCircle.classList.remove("win", "lose", "draw");

  useremoji.textContent = choices[userchoice];

  cpuemoji.classList.add("shuffle");

  let keys = Object.keys(choices);

  let cpuTimer = setInterval(() => {
    let random = keys[Math.floor(Math.random() * keys.length)];

    cpuemoji.textContent = choices[random];
  }, 150);

  setTimeout(() => {
    clearInterval(cpuTimer);

    let cpu = keys[Math.floor(Math.random() * keys.length)];

    cpuemoji.textContent = choices[cpu];

    cpuemoji.classList.remove("shuffle");

    checkWinner(userchoice, cpu);
  }, 1500);
}

function checkWinner(user, cpu) {
  round++;

  document.querySelector("#round").textContent = round;

  if (user === cpu) {
    tieScore++;

    document.querySelector("#tie-count").textContent = tieScore;
    document.querySelector("#streak").textContent = streak;
    userCircle.classList.add("draw");
    cpuCircle.classList.add("draw");
    resultBox.textContent = "STALEMATE";

    streak = 0;
  } else if (
    (user === "rock" && cpu === "scissors") ||
    (user === "paper" && cpu === "rock") ||
    (user === "scissors" && cpu === "paper")
  ) {
    userScore++;

    streak++;
    document.querySelector("#you-count").textContent = userScore;
    document.querySelector("#streak").textContent = streak;

    resultBox.textContent = "YOU WIN";

    userCircle.classList.add("win");

    cpuCircle.classList.add("lose");
  } else {
    cpuScore++;

    document.querySelector("#cpu-count").textContent = cpuScore;

    streak = 0;
    document.querySelector("#streak").textContent = streak;

    resultBox.textContent = "CPU WINS";

    cpuCircle.classList.add("win");

    userCircle.classList.add("lose");
  }
}

document.querySelector(".reset-match").addEventListener("click", () => {
  userScore = 0;
  cpuScore = 0;
  tieScore = 0;
  streak = 0;
  round = 0;

  document.querySelector("#you-count").textContent = 0;

  document.querySelector("#cpu-count").textContent = 0;

  document.querySelector("#tie-count").textContent = 0;

  document.querySelector("#round").textContent = 0;

  document.querySelector("#streak").textContent = 0;

  useremoji.textContent = "❔";

  cpuemoji.textContent = "❔";

  resultBox.textContent = "";

  userCircle.classList.remove("win", "lose", "draw");
  cpuCircle.classList.remove("win", "lose", "draw");
});
