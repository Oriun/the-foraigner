import mongoose from "mongoose";

const ExerciceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  type: {
    type: String,
    required: true,
    unique: false,
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

