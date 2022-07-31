import { Router } from "express";
const ExerciceRouter = Router();
import Exercice from "../models/Exercice";
import { forbidAuth, forceAuth, needAdmin } from "../middlewares/Auth";
import { BadRequest, NotFound, Unexpected } from "../views/Errors";
import List from "../views/List";
import Log from "../logger";
import { Error as MongooseError } from "mongoose";
import checkSchema from "../middlewares/RequestSchema";
import {
  LookByIdExerciseSchema,
  PostExerciseSchema
} from "../schemas/ExerciseSchema";
import { MongoServerError } from "mongodb";

// @route GET api/exercises
// @description Get all exercises
// @access Public
ExerciceRouter.get("/", async (req, res) => {
  const filter = {};
  let page = 0;
  let perPage = 20;
  const sort = {};
  /**
   * Not Implemented
   * Use req.query to filter exercises by filling filter object
   * Also get pagination from query + sorting optiond
   */
  const exercises = await Exercice.find(filter)
    .sort(sort)
    .skip(page)
    .limit(perPage);

  if (!exercises) {
    return NotFound(res, "No exercices found");
  }
  const exerciseCount = await Exercice.count(filter);

  /**
   * Not Implemented
   * Filter informations to send to client based on
   * auth status and exercise category
   * i.e if he's not logged in, send only words
   * and not descriptions inside of exercises
   * Will be implemented as we have more exercises
   */

  return List(res, exercises, page, perPage, exerciseCount);
});

// @route POST api/exercise
// @description Create an exercise
// @access Admin
ExerciceRouter.post(
  "/",
  needAdmin,
  checkSchema(PostExerciseSchema),
  async (req, res) => {
    try {
      /**
       * Not Implemented
       * Check content filed in body based on type
       * i.e cross-words content will be different
       * from flashcards content
       */
      const exercise = new Exercice(req.body);
      await exercise.save();
      return res.status(201).json(exercise);
    } catch (err) {
      if (
        err instanceof MongooseError.ValidationError ||
        err instanceof MongoServerError
      ) {
        return BadRequest(res, err.message);
      }
      return Unexpected(res, err);
    }
  }
);

// @route PUT api/exercise/:id
// @description Modify an exercice
// @access Public
ExerciceRouter.put("/:id", needAdmin, (req, res) => {
  /**
   * Not Implemented
   * Perform deep update on content field
   */
  Exercice.findByIdAndUpdate(req.params.id, req.body)
    .then((exercice) => res.json({ msg: "Exercice modified successfully" }))
    .catch((err) =>
      res.status(404).json({ noexercicefound: "No exercice found" })
    );
});

// @route GET api/exercise/:id
// @description Get single exercise by id
// @access Public
ExerciceRouter.get(
  "/:id",
  forceAuth,
  checkSchema(LookByIdExerciseSchema),
  async (req, res) => {
    const exercise = await Exercice.findById(req.params.id)
    if(!exercise) {
      return NotFound(res, "No exercice found");
    }
    return res.json(exercise);
  }
);

// @route DELETE api/exercise/:id
// @description Delete exercise by id
// @access Public
ExerciceRouter.delete(
  "/:id",
  needAdmin,
  checkSchema(LookByIdExerciseSchema),
  async (req, res) => {
    try {
      const exercise = await Exercice.findByIdAndRemove(
        req.params.id,
        req.body
      );
      if (!exercise) {
        return NotFound(res, "No exercice found");
      }
      return res.status(204).send();
    } catch (err) {
      return Unexpected(res, err);
    }
  }
);

export default ExerciceRouter;
