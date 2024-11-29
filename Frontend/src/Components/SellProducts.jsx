import React, { useState, useEffect } from 'react';
import './SellProducts.css'

const ProductForm = () => {
  const [choice, setChoice] = useState('null'); 
  const [formData, setFormData] = useState({
    key:'',
    name: '',
    category: '',
    subcategory: '',
    description: '',
    wholesaleprice: '',
    marketprice: '',
    minQuantity: '',
    minQuantityEcomm: '',
    totalQuantity: '',
    image: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 const handleFormSubmit=async(event)=>{
   event.preventDefault()

   const updatedFormData = {
    ...formData,
    key: setFormKey(choice), 
  };

   try {
    const response = await fetch('http://localhost:5000/auth/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFormData),
    });
    const data = await response.json();
    if (data.success) {
      console.log('Added Product', data);
    } else {
      console.log('Unable to add product', data.message);
    }
  } catch (err) {
    console.error('Error adding product:', err);
  }
 }

 const setFormKey = (choice) => {
  switch (choice) {
    case 'form1':
      return 'offline'; 
    case 'form2':
      return 'ecomm'; 
    case 'form3':
      return 'ecooff';
    default:
      return '';
  }
};

  useEffect(() => {
    setFormData({
      name: '',
      category: '',
      subcategory: '',
      description: '',
      wholesaleprice: '',
      marketprice: '',
      minQuantity: '',
      minQuantityEcomm: '',
      totalQuantity: '',
      image: '',
    });
  }, [choice]);

  return (
    <div className='Sell'>

    <div className='tleft'>
    <h2 style={{alignContent:"center", justifyContent:"center", fontWeight:"50",padding:"70px"}}>Add New Products in Stock</h2>
    </div>

    <div className='tright'>
      {choice==='null' && (
        <>
      <button onClick={() => setChoice('form1')} className='status-buttons'>For Offline Markets in Wholesale</button>
      <button onClick={() => setChoice('form2')} className='status-buttons'>For Ecomm platfroms in market price</button>
      <button onClick={() => setChoice('form3')} className='status-buttons'>For both Offline and E-comm platforms</button>
      </>
      )}

      {choice === 'form1' && (
       <> 
         <button onClick={() => setChoice("null")} className="back_button">
         Back
        </button>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Product Name"
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="Category"
          />
          <input
            type="text"
            name="subcategory"
            value={formData.subcategory}
            onChange={handleInputChange}
            placeholder="Subcategory"
          />
          <input
            type="number"
            name="wholesaleprice"
            value={formData.wholesaleprice}
            onChange={handleInputChange}
            placeholder="Wholesale Price"
          />
          <input
            type="number"
            name="minQuantity"
            value={formData.minQuantity}
            onChange={handleInputChange}
            placeholder="Min Quantity"
          />
          <input
            type="number"
            name="totalQuantity"
            value={formData.totalQuantity}
            onChange={handleInputChange}
            placeholder="Total Quantity"
          />
          <button type="submit">Submit</button>
        </form>
       </> 
      )}

      {choice === 'form2' && (
        <>
         <button onClick={() => setChoice("null")} className="back_button">
         Back
        </button>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Product Name"
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="Category"
          />
          <input
            type="text"
            name="subcategory"
            value={formData.subcategory}
            onChange={handleInputChange}
            placeholder="Subcategory"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
          />
          <input
            type="number"
            name="marketprice"
            value={formData.marketprice}
            onChange={handleInputChange}
            placeholder="Market Price"
          />
          <input
            type="number"
            name="minQuantityEcomm"
            value={formData.minQuantityEcomm}
            onChange={handleInputChange}
            placeholder="Min Quantity for E-Commerce"
          />
          <input
            type="number"
            name="totalQuantity"
            value={formData.totalQuantity}
            onChange={handleInputChange}
            placeholder="Total Quantity"
          />
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="Image URL"
          />
          <button type="submit">Submit</button>
        </form>
        </>
      )}

      {choice === 'form3' && (
        <>
         <button onClick={() => setChoice("null")} className="back_button">
         Back
        </button>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Product Name"
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="Category"
          />
          <input
            type="text"
            name="subcategory"
            value={formData.subcategory}
            onChange={handleInputChange}
            placeholder="Subcategory"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
          />
          <input
            type="number"
            name="marketprice"
            value={formData.marketprice}
            onChange={handleInputChange}
            placeholder="Market Price"
          />
          <input
            type="number"
            name="wholesaleprice"
            value={formData.wholesaleprice}
            onChange={handleInputChange}
            placeholder="Wholesale Price"
          />
          <input
            type="number"
            name="minQuantity"
            value={formData.minQuantity}
            onChange={handleInputChange}
            placeholder="Min Quantity"
          />
          <input
            type="number"
            name="minQuantityEcomm"
            value={formData.minQuantityEcomm}
            onChange={handleInputChange}
            placeholder="Min Quantity for E-Commerce"
          />
          <input
            type="number"
            name="totalQuantity"
            value={formData.totalQuantity}
            onChange={handleInputChange}
            placeholder="Total Quantity"
          />
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="Image URL"
          />
          <button type="submit">Submit</button>
        </form>
        </>
      )}
     </div>

   </div> 
  );
};

export default ProductForm;
