const startButton = document.getElementById("start-button");
const exerciseTypeCheckboxes = document.querySelectorAll(
  ".exercise-type-checkbox",
);
const typesDisplayList = document.getElementById("display-types");
const exercisesNumInput = document.getElementById("num-exercises");
const numberOfExercisesPlaceholders = document.querySelectorAll(
  ".number-of-exercies-placeholder",
);

const SETTINGS = {
  equations: [],
};

import { getLevelById } from '/levels.js'

startButton.addEventListener("click", (event) => {
  if (SETTINGS.equations.length == 0) {
    alert("Add at least one exercise type");
    event.preventDefault();
    return;
  }
});

exerciseTypeCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", (event) => {
    if (checkbox.checked) {
      SETTINGS.equations.push(checkbox.id);
      const element = document.createElement("li");
      element.innerText = checkbox.id;
      element.dataset.type = checkbox.id;
      typesDisplayList.appendChild(element);
    } else {
      SETTINGS.equations.splice(SETTINGS.equations.indexOf(checkbox.id), 1);
      typesDisplayList
        .querySelector("li[data-type=" + checkbox.id + "]")
        .remove();
    }
  });
});

document
  .querySelector(".number-control-up")
  .addEventListener("click", (event) => {
    exercisesNumInput.value++;
    exercisesNumInput.max = exercisesNumInput.value;
    updateNumberOfExercises(exercisesNumInput.value);
  });

document
  .querySelector(".number-control-down")
  .addEventListener("click", (event) => {
    if (exercisesNumInput.value == 1) return;
    exercisesNumInput.value--;
    exercisesNumInput.max = exercisesNumInput.value;
    updateNumberOfExercises(exercisesNumInput.value);
  });

updateNumberOfExercises(exercisesNumInput.value);

function updateNumberOfExercises(num) {
  numberOfExercisesPlaceholders.forEach((placeholder) => {
    placeholder.innerText = num;
  });
}

document.querySelectorAll('.settings-difficulty-radio').forEach(button => {
    if (button.checked)
        updateDifficulty(button.dataset.diff)
    button.addEventListener('click', event => {
        updateDifficulty(button.dataset.diff)
    })
})

function updateDifficulty(diff) {
    document.querySelectorAll('.time-placeholder').forEach(placeholder => {
        placeholder.innerText = getLevelById(diff).time
    })
}
