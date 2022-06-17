import mongoose from "mongoose";

// import ObjectId from ("mongodb").ObjectID;
// import {ObjectId} from "mongodb";
 //var ObjectID = require('mongodb').ObjectID

var validateEmail = function (email: string) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    unique: false,
  },
  lastname: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: { // to hash
    type: String,
    required: true,
  },
  language: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  zipcode: {
    type: String,
    require: true,
  },
  level_in_YOUR_language: {
    type: Number,
    require: false,
  },
  mother_language: {
    type: String,
    require: true,
  },
  credit_card: {
    type: String,
    require: false,
  },
  age: {
    type: Number,
    require: true,
  },
  birth: {
    type: Date,
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

var User = mongoose.model("User", UserSchema);
export default User; 

// Body Postman for Register
// {
//   "firstname": "Loris",
//   "lastname": "Boyer",
//   "email": "loris.boyer@gmail.com",
//   "password": "1234567AZE",
//   "language": "FR",
//   "country": "FR",
//   "city": "Saint-Jeannet",
//   "zipcode": "06640",
//   "level_in_YOUR_language": 1,
//   "mother_language": "FR",
//   "credit_card": "1234 1234 1234 1234 343",
//   "age": 21,
//   "birth": "2000-08-09",
//   "created_at": "2022-05-21",
//   "updated_at": "2022-05-21"
// }