import React from "react";
import { useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../redux/CartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between p-4 border rounded-xl shadow-sm bg-white hover:shadow-md transition relative">
      {/* Product image with cancel button */}
      <div className="relative">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-20 h-20 object-cover rounded-lg border"
        />
        {/* ❌ Cancel / Remove button */}
        <button
          onClick={() => dispatch(removeFromCart(item.id))}
          className="absolute -top-2 -left-2 px-1.5 py-0.5 bg-red-100 text-red-600 rounded-full border border-red-300 hover:bg-red-200 transition text-xs"
        >
          ✕
        </button>
      </div>

      {/* Product details */}
      <div className="flex-1 ml-4">
        <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
        <p className="text-gray-500 text-sm">${item.price}</p>

        {/* Quantity controls BELOW product info */}
        <div className="mt-3 flex items-center space-x-2">
          <button
            onClick={() => dispatch(decreaseQuantity(item))}
            className="w-6 h-6 flex items-center justify-center bg-teal-100 text-teal-700 rounded-md border border-teal-300 hover:bg-teal-200 transition text-sm"
          >
            -
          </button>
          <span className="px-3 py-1 bg-gray-100 text-teal-800 font-medium rounded-md border text-sm">
            {item.quantity}
          </span>
          <button
            onClick={() => dispatch(increaseQuantity(item))}
            className="w-6 h-6 flex items-center justify-center bg-teal-100 text-teal-700 rounded-md border border-teal-300 hover:bg-teal-200 transition text-sm"
          >
            +
          </button>
        </div>
      </div>

      {/* Item total */}
      <p className="text-lg font-bold text-gray-700">
        ${(item.price * item.quantity).toFixed(2)}
      </p>
    </div>
  );
};

export default CartItem;
