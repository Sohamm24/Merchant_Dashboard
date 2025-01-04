const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustSchema = new Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
      required: true
     },
  contact:{
    type: String,
    required:false,
    minlength: 10,
    maxlength: 10,
    match: /^[0-9]+$/
  },
  address: {
    type: String,
    required:false
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Order",
    },
  ],
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Product",
    },
  ],
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Product",
    },
  ],
},

{timestamps:true});

module.exports = mongoose.model("customer", CustSchema); 