import { Router } from "express";
const GameHisotryRouter = Router()
import AuthGuard from "../token.js";
import GameHistory from "../models/GameHistory";

// @route GET api/gamehistory
// @description Get all gamehistory
// @access Public
GameHisotryRouter.get("/", AuthGuard, (req, res) => {
    GameHistory.find()
    .then((gamehistory) => res.json(gamehistory))
    .catch((err) => res.status(404).json({ nogamehistoryfound: "No gamehistory found" }));
});

// @route PUT api/gamehistory/:id
// @description Modify an gamehistory
// @access Public
GameHisotryRouter.put("/:id", AuthGuard, (req, res) => {
    GameHistory.findByIdAndUpdate(req.params.id, req.body)
    .then((gamehistory) => res.json({ msg: "gamehistory modified successfully" }))
    .catch((err) => res.status(404).json({ nogamehistoryfound: "No gamehistory found" }));
});



// @route GET api/gamehistory/:id
// @description Get single gamehistory by id
// @access Public
GameHisotryRouter.get("/:id", AuthGuard, (req, res) => {
    GameHistory.findById(req.params.id)
    .then((gamehistory) => res.json(gamehistory))
    .catch((err) => res.status(404).json({ nougamehistoryfound: "No gamehistory found" }));
});


// @route DELETE api/gamehistory/:id
// @description Delete gamehistory by id
// @access Public
GameHisotryRouter.delete("/:id", AuthGuard, (req, res) => {
    GameHistory.findByIdAndRemove(req.params.id, req.body)
    .then((user) => res.json({ mgs: "gamehistory entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a gamehistory" }));
});

export default GameHisotryRouter
