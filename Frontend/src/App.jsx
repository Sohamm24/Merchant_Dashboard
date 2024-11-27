import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import Body from './Components/Body';
import Footer from './Components/Footer';
import './index.css';
import Login from './Components/Login';
import SellProducts from './Components/SellProducts';

import Home from './pages/homepage';
import Dashboardpage from './pages/Dashboardpage';

import { 
  createBrowserRouter,
  RouterProvider,
  Route,
  Link
 } from 'react-router-dom';


 const router=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/dashboard',
    element:<Dashboardpage/>
  },
  {
    path:'/addproduct',
    element:<SellProducts/>
  }
 ])

export default function App() {
  return (
    <div className="App">
            <RouterProvider router={router} />
    </div>
  );
}

