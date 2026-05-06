/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Menu from './pages/Menu';
import ItemDetails from './pages/ItemDetails';
import About from './pages/About';
import AddItem from './pages/AddItem';
import ManageItems from './pages/ManageItems';
import Checkout from './pages/Checkout';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen font-sans">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/items/:id" element={<ItemDetails />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<div className="py-24 text-center font-serif text-4xl text-[#4A3322]">Contact feature coming soon!</div>} />
                
                {/* Protected Management Routes */}
                <Route path="/items/add" element={
                  <ProtectedRoute>
                    <AddItem />
                  </ProtectedRoute>
                } />
                <Route path="/items/manage" element={
                  <ProtectedRoute>
                    <ManageItems />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <Footer />
            <Toaster 
              position="bottom-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#4A3322',
                  color: '#F7F4EF',
                  borderRadius: '12px',
                  fontSize: '14px',
                  padding: '12px 24px',
                },
              }}
            />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
