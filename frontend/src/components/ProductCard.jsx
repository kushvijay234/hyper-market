import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/CartSlice";
import { Star } from "lucide-react";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const productInCart = useSelector((state) =>
    state.cart.find((item) => item.id === product.id)
  );

  const quantity = useSelector(
    (state) => state.cart.find((item) => item.id === product.id)?.quantity || 0
  );

  const categoryNames = Array.isArray(product.category)
    ? product.category.map((cat) => cat.name).filter(Boolean)
    : [];

  return (
    <div className="border rounded-xl p-3 sm:p-4 shadow-md hover:shadow-xl transition-all duration-300 bg-white hover:scale-105">
      {/* Product Image + Link */}
      <Link to={`/product/${product._id}`}>
        <img
          src={product.thumbnail || "https://via.placeholder.com/150"}
          alt={product.title}
          className="w-full h-32 sm:h-40 object-contain rounded-md mb-3 sm:mb-4 bg-gray-100"
        />
        <p className="text-xs sm:text-sm text-gray-500 mb-2">
          Category:{" "}
          {categoryNames.length > 0 ? categoryNames.join(", ") : "N/A"}
        </p>
        <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-gray-800 mb-2 line-clamp-2">{product.title}</h3>
        <p className="text-sm sm:text-base text-gray-600 font-medium">${product.price}</p>
        <div className="flex items-center space-x-1 my-2">
          <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
          <span className="text-xs sm:text-sm text-gray-700 font-medium">
            {product.rating || "No rating"}
          </span>
        </div>
      </Link>

      {/* Add to Cart Section */}
      {productInCart ? (
        <div className="mt-3 sm:mt-4 flex items-center justify-between">
          <button
            onClick={() => dispatch(decreaseQuantity(product))}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-100 text-teal-700 rounded-lg border border-teal-300 hover:bg-teal-200 transition text-sm"
          >
            -
          </button>
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-teal-800 font-medium rounded-lg border text-sm">
            {quantity}
          </span>
          <button
            onClick={() => dispatch(increaseQuantity(product))}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-100 text-teal-700 rounded-lg border border-teal-300 hover:bg-teal-200 transition text-sm"
          >
            +
          </button>
        </div>
      ) : (
        <div className="mt-3 sm:mt-4">
          <button
            onClick={() => dispatch(addToCart(product))}
            className="w-full bg-teal-600 text-white py-2 px-3 sm:px-4 rounded-lg font-medium shadow hover:bg-teal-700 transition duration-200 text-sm sm:text-base"
          >
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
