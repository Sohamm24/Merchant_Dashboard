const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  role: {
     type: String, 
     required: true,
     default: 'customer'
  }
},{timestamps:true});

module.exports = mongoose.model("users", UserSchema);