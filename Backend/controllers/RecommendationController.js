const productModel = require('../models/merchandise');

const getRecommendations = async (req, res) => {
  try {
    const products = await productModel.find().limit(11);  // Adjust as needed
    console.log(products)
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching recommendations', error: err });
  }
};

const getProductDetails = async (req, res) => {
    try {
      const productId = req.params.id; // Extract product ID from the request parameters
      const product = await productModel.findById(productId); // Fetch the product by ID
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ product });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching product details', error: err });
    }
  };
  
  module.exports = { getRecommendations, getProductDetails };
  