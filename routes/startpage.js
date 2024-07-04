import express from "express";
import levels from "../game/levels.js";
import types from "../game/types.js";
import { generateExerices } from "../game/generator.js";
import { getLevelById } from "../game/levels.js";

const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("startpage", { levels: levels.levels, types: types.types });
});

router.post("/startgame", function (req, res, next) {
  const numberOfExercises = req.body["num-exercises"];
  const difficulty = req.body.difficulty;
  let exerciseTypes = req.body["ex-type"];
  if (typeof exerciseTypes == "string") {
    exerciseTypes = [exerciseTypes];
  }
  const settings = { numberOfExercises, difficulty, exerciseTypes };
  req.session.userData = settings;
  res.status(302).redirect("/game");
});

router.get("/game", function (req, res, next) {
  const state = req.session.userData;
  if (state == null || state == undefined) {
    req.session.destroy(console.error);
    res.status(403).redirect("/");
    return;
  }
  if (state.exercises === undefined) {
    state.exercises = generateExerices(
      state.numberOfExercises,
      state.exerciseTypes,
    );
    state.exercise = state.exercises.pop();
  }

  res.render("gamewindow", {
    exercise: state.exercise,
    time: getLevelById(state.difficulty).time,
  });
});

router.post("/submit", function (req, res) {
  const state = req.session.userData;
  if (state === null || state === undefined) {
    req.session.destroy(console.error);
    res.status(403).redirect("/");
    return;
  }

  const exercise = state.exercise;
  if (exercise === null || exercise === undefined) {
    req.session.destroy(console.error);
    res.status(403).redirect("/");
    return;
  }

  const input = req.body.input;
  console.log(`Got a submition ${input}`);
  if (Number.parseInt(input) === state.exercise.answer) {
    if (state.exercises.length > 0) {
      state.exercise = state.exercises.pop();
      res.status(302).redirect("/game");
    } else {
      res.status(302).redirect("/?success");
      req.session.destroy(console.error);
      //TODO save to database
    }
  } else {
    res.status(302).redirect("/?fail=wrong");
    req.session.destroy(console.error);
  }
});

export default router;
