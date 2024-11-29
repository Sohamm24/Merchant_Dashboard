const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const MerchandiseSchema= new Schema({
        key: { 
            type: String, 
            required: true 
            },
        name: { 
             type: String,
             required: true
              },
        category: {
             type: String, 
             required: true 
            },
        subcategory: {
             type: String, 
             required: true
            },
        description: {
             type: String
             },
        image: {
             type: String
             }, 
        marketprice: {
             type: Number,
             },
        wholesaleprice: { 
            type: Number 
        },
        minQuantity: {
             type: Number,
             required: true
             },
        minQuantityEcomm: { 
            type: Number 
        },
        totalQuantity: {
             type: Number, 
             required: true
             }
    }, { timestamps: true });

    module.exports=mongoose.model("merchandise",MerchandiseSchema)