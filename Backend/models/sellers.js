const mongoose = require("mongoose");
const Merchandise = require("./merchandise");
const Schema= mongoose.Schema;

const sellerSchema = new mongoose.Schema({
    userId:{ 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
          required: true 
        },
    businessName: { 
        type: String, 
        required:false
        },
    gstNumber: {
         type: String,
         required: false
         },
    bankAccountDetails: { 
        type: String,
        required: false
        },
    Merchandise: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Merchandise'
    }]    
  });
  
  const Seller = mongoose.model('Seller', sellerSchema);
  module.exports = Seller;
  