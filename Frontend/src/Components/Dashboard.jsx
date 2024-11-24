import React, { useState, useEffect } from 'react';
import './dashboard.css';
import IndiaPost from "../assets/IndiaPost.png";

export default function Dashboard({ isLoggedIn, user }) {
  const [message, setMessage] = useState('Login to see Inventory dashboard');

  useEffect(() => {
    if (isLoggedIn && user?.name) {
      setMessage(`Welcome ${user.name}! Here is your inventory.`);
    } else if (isLoggedIn) {
      setMessage('Welcome! Here is your inventory.');
    } else {
      setMessage('Nothing to show in Inventory');
    }
  }, [isLoggedIn, user]);

  return (
    <>
    <div className="box">
      <div className="msg">{message}</div>
    </div>

<div className="status_container">
<div className="status_heading">
  <h2>Check and Track status of your Products and Services</h2>
</div>
<div className="status_buttons">
  <button>Analyse Buyers</button>
  <button>Offer Discount</button>
  <button>Messages</button>
</div>
</div>

<div className="info_section">
<div className="info_image">
  <img src={IndiaPost} alt="Image" />
</div>
<div className="info_text">
  <p>
  Inventory shows what merchants or service providers have listed. Use "Promotion" to boost visibility, and "Charges" for the current subscription plans of portal
  </p>
</div>
<div className="info_buttons">
  <button className="vertical_button">Inventory</button>
  <button className="vertical_button">Promotion Help</button>
  <button className="vertical_button">Charges</button>
</div>
</div>
  </>
  );
}
