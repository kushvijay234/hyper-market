import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">🛒 Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">Your cart is empty.</p>
            <Link
              to="/product"
              className="inline-block bg-teal-800 text-white px-6 py-3 rounded-lg hover:bg-teal-900 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Column - Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Right Column - Total + Checkout */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md h-fit">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                Order Summary
              </h2>

              <div className="flex justify-between mb-3">
                <span className="text-gray-600">Items:</span>
                <span className="font-semibold">{cart.length}</span>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-gray-600">Total:</span>
                <span className="text-lg sm:text-xl font-bold text-gray-800">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-teal-800 hover:bg-teal-600 text-white px-4 sm:px-6 py-3 rounded-xl shadow-md transition font-semibold mb-4 text-sm sm:text-base"
              >
                PROCEED TO CHECKOUT →
              </button>

              <button
                onClick={() => dispatch(clearCart())}
                className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 
                     rounded-lg shadow-md transition font-semibold text-sm 
                     border border-red-600 hover:shadow-lg active:scale-95"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
