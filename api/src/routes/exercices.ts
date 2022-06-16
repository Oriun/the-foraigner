import { Router } from "express";
const ExerciceRouter = Router()
import bcrypt from "bcrypt";
import AuthGuard from "../token.js";
import Exercice from "../models/Exercice";

// @route GET api/exercices
// @description Get all exercices
// @access Public
ExerciceRouter.get("/", AuthGuard, (req, res) => {
  Exercice.find()
    .then((exercice) => res.json(exercice))
    .catch((err) => res.status(404).json({ nocryptosfound: "No exercice  found" }));
});

// @route PUT api/exercice/:id
// @description Modify an exercice
// @access Public
ExerciceRouter.put("/:id", AuthGuard, (req, res) => {
  Exercice.findByIdAndUpdate(req.params.id, req.body)
    .then((exercice) => res.json({ msg: "Exercice modified successfully" }))
    .catch((err) => res.status(404).json({ nouserfound: "No exercice found" }));
});



// @route GET api/exercice/:id
// @description Get single exercice by id
// @access Public
ExerciceRouter.get("/:id", AuthGuard, (req, res) => {
  Exercice.findById(req.params.id)
    .then((exercice) => res.json(exercice))
    .catch((err) => res.status(404).json({ nouserfound: "No exercice found" }));
});


// @route DELETE api/exercice/:id
// @description Delete exercice by id
// @access Public
ExerciceRouter.delete("/:id", AuthGuard, (req, res) => {
  Exercice.findByIdAndRemove(req.params.id, req.body)
    .then((user) => res.json({ mgs: "exercice entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a exercice" }));
});

export default ExerciceRouter
