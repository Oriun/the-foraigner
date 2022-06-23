import mongoose from "mongoose";

const GameResultsSchema = new mongoose.Schema({
  points: {
    number: {
        type: Number,
        required: true,
        unique: false,      
    },
  },
  save: {
      at: {
          date: {

          }
      },
      for: {
          checkpoint: {

          }
      },
      with: {
          result: {

          }
      },
  },
  content: {
    type: String,
    required: true,
    unique: false,
  },
  description: {
    type: String,
    required: true,
  },
  game: {
    type: String,
    require: true,
  },
  created_at: {
    type: Date,
    require: true,
  },
  updated_at: {
    type: Date,
    require: true,
  },
});

var GameResults = mongoose.model("GameResults", GameResultsSchema);
export default GameResults; 

