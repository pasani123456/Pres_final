import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext"; // Import the AuthProvider
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import History from "./components/History";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import LiveMonitoring from "./components/LiveMonitoring";
import NewOrders from "./components/NewOrders";
import CompletedOrders from "./components/CompletedOrders";
import Reports from "./components/Reports";
import Products from "./components/Products";
import Services from "./components/Services";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";

const App = () => {
  return (
    <AuthProvider>
      {" "}
      {/* Wrap the Router with AuthProvider */}
      <Router>
        <div className="flex flex-col min-h-screen">
          {" "}
          {/* Flexbox container */}
          <ScrollToTop />
          <Navbar />
          <main className="flex-grow">
            {" "}
            {/* Grow to fill space between navbar and footer */}
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/settings" element={<Settings />} /> */}
              <Route path="/history" element={<History />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/status" element={<LiveMonitoring />} />
              <Route path="/neworders" element={<NewOrders />} />
              <Route path="/completed" element={<CompletedOrders />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/products" element={<Products />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
            </Routes>
          </main>
          <Footer /> {/* Footer will be below the main content */}
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
