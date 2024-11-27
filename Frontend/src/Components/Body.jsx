import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Group36 from "../assets/Group36.png";
import './Body.css';
import Login from './Login.jsx'

export default function Body() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const navigate = useNavigate(); // Hook to navigate

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSellProducts = () => {
    closeModal(); // Close the modal
    navigate('/sell-products'); // Navigate to SellProducts page
  };

  const handleOfferService = () => {
    closeModal(); // Close the modal
    navigate('/offer-service'); // Navigate to OfferService page
  };

  return (
    <div>
      <div className="img_container">
        <div className="img_left">
          <img src={Group36} alt="Image" />
        </div>
        <div className="right">
          <h2 className="text-right">Manage your Inventory/Warehouse for your Business efficiently and get frequent Analysis of Merchandise</h2>
          <div className="button_container">
            <button className="right_button" onClick={handleLoginClick}>Login</button>
            {isModalOpen && (
               <div className="modal-overlay">
                <div className="modal">
               <button className="close-modal" onClick={closeModal}>×</button>
                  <Login />
                </div>
              </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
