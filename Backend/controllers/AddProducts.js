const productModel = require('../models/merchandise.js');
const sellerModel = require('../models/sellers.js'); 
const jwt = require('jsonwebtoken');

const add = async (req, res) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Token missing', success: false });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key
      const userId = decoded.id; // Extracted user ID from the token
      console.log('User ID from token:', userId);
  
      // Find the seller by userId
      const seller = await sellerModel.findOne({ userId });
      if (!seller) {
        return res.status(404).json({ message: 'Seller not found', success: false });
      }
  
      // Add product and associate it with the seller
      const {
        key, name, category, subcategory,
        description, image, marketprice,
        wholesaleprice, minQuantity,
        minQuantityEcomm, totalQuantity
      } = req.body;
  
      const newProduct = new productModel({
        key,
        name,
        category,
        subcategory,
        description,
        image,
        marketprice,
        wholesaleprice,
        minQuantity,
        minQuantityEcomm,
        totalQuantity,
      });
  
      await newProduct.save();
  
      // Associate the product with the seller
      seller.Merchandise.push(newProduct._id);
      await seller.save();
  
      res.status(201).json({
        message: 'Product added successfully',
        success: true,
        product: newProduct,
      });
    } catch (err) {
      console.error('Error adding product:', err);
      res.status(500).json({
        message: `Unable to add product: ${err.message}`,
        success: false,
      });
    }
  };
  
  module.exports = {
    add,
  };