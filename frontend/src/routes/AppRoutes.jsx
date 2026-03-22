import React from 'react';
import { Routes, Route } from 'react-router-dom';

/* Layouts */
import MainLayout from '../layouts/MainLayout';
// AdminLayout will go here if needed later

/* Pages */
import Home from '../pages/Home/Home';
import Products from '../pages/Products/Products';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import Cart from '../pages/Cart/Cart';
import Checkout from '../pages/Checkout/Checkout';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import Profile from '../pages/Profile/Profile';
import CompleteProfile from '../pages/CompleteProfile/CompleteProfile';
import Dashboard from '../pages/AdminDashboard/Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
      </Route>
      
      {/* Admin layout can be added later by wrapping Dashboard in AdminLayout */}
      <Route path="/admin" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;
