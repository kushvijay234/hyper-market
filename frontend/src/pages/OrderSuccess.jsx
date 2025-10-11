import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Safe defaults
  const orderNumber = state?.orderNumber || "N/A";
  const date = state?.date || "N/A";
  const customerEmail = state?.customerEmail || "N/A";
  const totalAmount = state?.totalAmount || 0;
  const paymentMethod = state?.paymentMethod || "N/A";
  const items = state?.items || [];
  const shippingAddress = state?.shippingAddress || {};

  if (!state) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center">
        <h2 className="text-2xl font-bold text-red-600">⚠️ No order found.</h2>
        <button onClick={() => navigate("/")} className="mt-4 px-6 py-2 bg-teal-700 text-white rounded-lg">Back to Home</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8">
      <h1 className="text-3xl font-bold text-teal-800 mb-4 text-center">🎉 Thank you. Your order has been received.</h1>

      {/* Order Details */}
      <div className="p-4 border rounded-lg mb-6 bg-gray-50">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Order Details</h2>
        <div className="grid grid-cols-2 gap-y-2 text-gray-700">
          <p className="font-medium">Order Number:</p><p>#{orderNumber}</p>
          <p className="font-medium">Date:</p><p>{date}</p>
          <p className="font-medium">Email:</p><p>{customerEmail}</p>
          <p className="font-medium">Total:</p><p>${totalAmount.toFixed(2)}</p>
          <p className="font-medium">Payment Method:</p><p>{paymentMethod}</p>
        </div>
      </div>

      {/* Order Summary */}
      <div className="p-4 border rounded-lg mb-6 bg-gray-50">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Order Summary</h2>
        {items.length ? items.map(item => (
          <div key={item.productId} className="flex justify-between text-gray-700 mb-2">
            <span>{item.name} × {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        )) : <p className="text-gray-500">No items found in this order.</p>}
        <hr className="my-3" />
        <div className="flex justify-between font-bold text-lg text-gray-800">
          <span>Total:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
      </div>

      {/* Customer Details */}
      <div className="p-4 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Customer Details</h2>
        <p><span className="font-medium">Name:</span> {shippingAddress?.name || "N/A"}</p>
        <p><span className="font-medium">Street:</span> {shippingAddress?.street || "N/A"}</p>
        <p><span className="font-medium">City:</span> {shippingAddress?.city || "N/A"}</p>
        <p><span className="font-medium">State:</span> {shippingAddress?.state || "N/A"}</p>
        <p><span className="font-medium">ZIP:</span> {shippingAddress?.zip || "N/A"}</p>
      </div>

      <div className="mt-6 text-center">
        <button onClick={() => navigate("/")} className="px-6 py-3 bg-teal-800 text-white rounded-lg shadow hover:bg-teal-600">Continue Shopping →</button>
      </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
