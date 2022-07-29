import mongoose from "mongoose";

const GameHistorySchema = new mongoose.Schema({
  game: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Exercice",
    unique: false
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
    unique: false
  },
  session: {
    type: String,
    required: true,
    unique: false
  },
  event: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  good: {
    type: Boolean
  },
  created_at: {
    type: Date,
    require: true
  },
  updated_at: {
    type: Date,
    require: true
  }
});

var Exercice = mongoose.model("GameHistory", GameHistorySchema);
export default Exercice;
