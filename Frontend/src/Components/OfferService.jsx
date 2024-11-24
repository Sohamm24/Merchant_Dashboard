import React, { useState } from 'react';
import './OfferService.css';

function OfferService() {
  const [service, setService] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    duration: '',
    images: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({
      ...service,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setService({
      ...service,
      images: Array.from(e.target.files)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Service details submitted:', service);
  };

  return (
    <div>
      <div className="offer-service__upper-box">
        <h2>Offer Service</h2>
      </div>
      <div className="offer-service__form-container">
        <h2>Service Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="offer-service__form-group">
            <label htmlFor="name">Service Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={service.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="offer-service__form-group">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={service.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="offer-service__form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={service.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="offer-service__form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={service.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="offer-service__form-group">
            <label htmlFor="duration">Duration (in hours):</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={service.duration}
              onChange={handleChange}
              required
            />
          </div>

          <div className="offer-service__form-group">
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

          <button type="submit" className="offer-service__button">Next</button>
        </form>
      </div>
    </div>
  );
}

export default OfferService;
