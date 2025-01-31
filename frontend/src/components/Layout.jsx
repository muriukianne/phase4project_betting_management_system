// Layout Component
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export default function Layout() {
  return (
    <div className="flex flex-col bg-transparent min-h-screen">
      <Navbar />

      <div className="flex-grow w-3/4 mx-auto p-8 bg-transparent">
        <Outlet />
        <ToastContainer/>
      </div>

      <Footer />
    </div>
  );
}
