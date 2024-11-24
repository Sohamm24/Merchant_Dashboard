import React, { useState } from 'react';
import './Navbar.css';
import Login from './Login.jsx'

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <header>
        <div className="logo">Ethnicize</div>
        <button className="account-button" onClick={handleLoginClick}>Account</button>
           {isModalOpen && (
               <div className="modal-overlay">
                <div className="modal">
               <button className="close-modal" onClick={closeModal}>×</button>
                  <Login />
                </div>
              </div>
             )}
      </header>
    </div>
  );
}
