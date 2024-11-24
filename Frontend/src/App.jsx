import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Body from './Components/Body';
import SellProducts from './Components/SellProducts';
import OfferService from './Components/OfferService';
import Footer from './Components/Footer';
import './index.css';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for token in localStorage to see if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Navbar />
      
      {/* Conditional Rendering */}
      {isLoggedIn ? (
        <>
          <Dashboard />
          {/* Footer is always shown */}
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      )}
      <Footer/>
    </Router>
  );
}

export default App;
