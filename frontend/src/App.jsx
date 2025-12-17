import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Checkout from "./pages/Checkout";
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminProtectedRoute from "./utils/AdminProtectedRoute";
import OrderSuccess from "./pages/OrderSuccess";
import Admin from "./pages/Admin";
import Footer from "./components/Footer";
import SingleProduct from "./pages/SingleProduct.jsx";


const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <AdminProtectedRoute>
              <Admin />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <div className="pt-14 sm:pt-16">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/product" element={<Product />} />
                  <Route path="/product/:id" element={<SingleProduct />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route
                    path="/order-success"
                    element={
                      <ProtectedRoute>
                        <OrderSuccess />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
                <Footer />
              </div>
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
