import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import { clearCart } from "../redux/CartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="h-full max-w-6xl mx-auto p-8 mt-26">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Right Column - Total + Checkout */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-md h-fit">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Items:</span>
              <span className="font-semibold">{cart.length}</span>
            </div>

            <div className="flex justify-between mb-6">
              <span className="text-gray-600">Total:</span>
              <span className="text-xl font-bold text-gray-800">
                ${totalAmount.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-teal-800 hover:bg-teal-600 text-white px-6 py-3 rounded-xl shadow-md transition font-semibold mb-3"
            >
              PROCEED TO CHECKOUT →
            </button>

            {/* 🧹 Clear Cart Button */}
          </div>
        </div>
      )}
      <hr className="mt-4" />
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => dispatch(clearCart())}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 
               rounded-lg shadow-md transition font-semibold text-sm 
               border border-red-600 hover:shadow-lg active:scale-95"
        >
           Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
