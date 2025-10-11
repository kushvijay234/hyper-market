import React from "react";
import { useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../redux/CartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border rounded-xl shadow-sm bg-white hover:shadow-md transition relative gap-3 sm:gap-4">
      {/* Product image with cancel button */}
      <div className="relative flex-shrink-0">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border"
        />
        {/* ❌ Cancel / Remove button */}
        <button
          onClick={() => dispatch(removeFromCart(item.id))}
          className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 px-1 sm:px-1.5 py-0.5 bg-red-100 text-red-600 rounded-full border border-red-300 hover:bg-red-200 transition text-xs"
        >
          ✕
        </button>
      </div>

      {/* Product details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 line-clamp-2">{item.title}</h3>
        <p className="text-gray-500 text-xs sm:text-sm">${item.price}</p>

        {/* Quantity controls */}
        <div className="mt-2 sm:mt-3 flex items-center space-x-2">
          <button
            onClick={() => dispatch(decreaseQuantity(item))}
            className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center bg-teal-100 text-teal-700 rounded-md border border-teal-300 hover:bg-teal-200 transition text-sm"
          >
            -
          </button>
          <span className="px-2 sm:px-3 py-1 bg-gray-100 text-teal-800 font-medium rounded-md border text-xs sm:text-sm">
            {item.quantity}
          </span>
          <button
            onClick={() => dispatch(increaseQuantity(item))}
            className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center bg-teal-100 text-teal-700 rounded-md border border-teal-300 hover:bg-teal-200 transition text-sm"
          >
            +
          </button>
        </div>
      </div>

      {/* Item total */}
      <div className="flex-shrink-0 text-right">
        <p className="text-base sm:text-lg font-bold text-gray-700">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
