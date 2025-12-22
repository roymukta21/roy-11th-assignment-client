import React from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <section className="min-h-screen flex flex-col">
      {/* Navbar / Header */}
      <header className="bg-white sticky top-0 z-50">
        <Navbar />
      </header>

      {/* Main content */}
      <main className="flex-1 pt-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>

      {/* Toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover={false}
        draggable
        theme="light"
      />
    </section>
  );
};

export default RootLayout;
