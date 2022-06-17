import mongoose from "mongoose";
import { emailValidator } from "../constantes";

const CredentialSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      match: [
        emailValidator,
        "Please fill a valid email address",
      ],
    },
    password: { type: String, required: true },
    // Confirmed is the date at which it has confirmed its account through email
    // 0 if it has never been confirmed
    confirmed: { type: Number, required: true, default: 0 },
    admin: { type: Boolean, required: true, default: false },
    created_at: { type: Number },
    updated_at: { type: Number },
  },
  { timestamps: true }
);

CredentialSchema.set("toObject", {
  transform: function (_, ret, __) {
    return { email: ret.email, confirmed: ret.confirmed, admin: ret.admin }
  },
});

export default mongoose.model("Credentials", CredentialSchema); 
