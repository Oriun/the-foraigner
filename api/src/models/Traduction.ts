import mongoose from "mongoose";

const TraductionSchema = new mongoose.Schema({
  fr: {
    type: String,
    required: true
  },
  jp: {
    type: String,
    required: true
  },
  en: {
    type: String,
    required: true
  }
});

var Exercice = mongoose.model("Traduction", TraductionSchema);
export default Exercice;
