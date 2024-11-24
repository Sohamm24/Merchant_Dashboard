import React, { useState } from 'react';
import './SellProducts.css';

function SellProducts() {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    quantity: '',
    images: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setProduct({
      ...product,
      images: Array.from(e.target.files)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product details submitted:', product);
  };

  return (
    <div>
      <div className="sell-products__upper-box">
        <h2>Sell Products</h2>
      </div>
      <div className="sell-products__form-container">
        <h2>Product Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="sell-products__form-group">
            <label htmlFor="name">Product Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="sell-products__form-group">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="sell-products__form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="sell-products__form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="sell-products__form-group">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="sell-products__form-group">
            <label htmlFor="images">Images:</label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </div>

          <button type="submit" className="sell-products__button">Next</button>
        </form>
      </div>
    </div>
  );
}

export default SellProducts;
