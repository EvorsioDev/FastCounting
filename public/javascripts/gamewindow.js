const num1 = Number.parseInt(document.getElementById("data-num1").dataset.num1);
const num2 = Number.parseInt(document.getElementById("data-num2").dataset.num2);
const answer = Number.parseInt(
  document.getElementById("data-answer").dataset.answer,
);
const time = Number.parseInt(document.getElementById("data-time").dataset.time);

const timerDisplay = document.getElementById("countdown");

const CONFIG = {
  countdown: 20,
  minValue: 0,
  maxValue: 100,
};

const GAMESTATE = {
  countdown: time,
  countdownTask: NaN,
};

function stopGame() {
  window.location.replace(`/?fail=timeout`);
}

function resetCountdown() {
  if (GAMESTATE.countdownTask !== NaN) {
    clearInterval(GAMESTATE.countdownTask);
    GAMESTATE.countdownTask = NaN;
  }
  GAMESTATE.countdown = time;

  timerDisplay.style.setProperty("--value", GAMESTATE.countdown);
  timerDisplay.style.setProperty("--time", time);
  GAMESTATE.countdownTask = setInterval(() => {
    timerDisplay.style.setProperty("--value", GAMESTATE.countdown);
    if (GAMESTATE.countdown-- === 0) {
      stopGame();
    }
  }, 1000);
}

document.getElementById("input").addEventListener("input", (event) => {
  if (input.value == answer) {
    const form = document.createElement("form");
    form.action = "/submit";
    form.method = "POST";
    form.target = "_self";
    form.enctype = "application/x-www-form-urlencoded";
    const i = document.createElement("input");
    i.name = "input";
    i.type = "hidden";
    i.value = answer;
    form.appendChild(i);
    document.body.appendChild(form);
    form.submit()
  }
});

resetCountdown();
