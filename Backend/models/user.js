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
  contact:{
    type: String,
    required:false,
    minlength: 10,
    maxlength: 10 
  },
  password: {
    type: String,
    required:false
  }
},{timestamps:true});

module.exports = mongoose.model("users", UserSchema);