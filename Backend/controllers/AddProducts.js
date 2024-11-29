const productModel=require('../models/merchandise.js');

const add=async(req,res)=>{
    try{
      const{key,name,category,subcategory,description,image,marketprice,wholesaleprice,minQuantity,minQuantityEcomm,totalQuantity}=req.body;
      const newProduct=new productModel({key,name,category,subcategory,description,image,marketprice,wholesaleprice,minQuantity,minQuantityEcomm,totalQuantity});
      await newProduct.save()
      res.status(201).json({
        message:'Added product successfully',
        success:true,
        })
    }
    catch(err){
        res.status(500).json({
            message:`Unable to add product ${err}`,
            success:false
         })
    }
}

module.exports={
    add
}