import mongoose from "mongoose";

const ExerciceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    unique: false,
  },
  category: {
    type: String,
    required: true,
    unique: false,
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    unique: false,
  },
  description: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: false,
    default: "en"
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

var Exercice = mongoose.model("Exercice", ExerciceSchema);
export default Exercice; 

