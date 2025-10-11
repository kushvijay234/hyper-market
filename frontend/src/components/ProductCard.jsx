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
    <div
      className="border rounded-xl p-3 sm:p-4 shadow-md hover:shadow-xl transition-all duration-300 bg-white hover:scale-105"
      aria-label={`Product card for ${product.title}`}
    >
      {/* Product Image + Link */}
      <Link
        to={`/product/${product._id}`}
        aria-label={`View details for ${product.title}`}
      >
        <img
          src={product.thumbnail || "https://via.placeholder.com/150"}
          alt={product.title}
          className="w-full h-32 sm:h-40 object-contain rounded-md mb-3 sm:mb-4 bg-gray-100"
        />
        <p className="text-xs sm:text-sm text-gray-500">
          {categoryNames.length > 0 ? categoryNames.join(", ") : "N/A"}
        </p>
        <h3 className="font-semibold text-sm sm:text-base lg:text-lg text-gray-800 mb-2 line-clamp-2">
          {product.title}
        </h3>

        {/* Rating + Price in one line */}
        <div
          className="flex items-center justify-between my-2"
          aria-label={`Rating and price for ${product.title}`}
        >
          <div
            className="flex items-center space-x-1"
            aria-label={`Rating: ${product.rating || "No rating"} stars`}
          >
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
            <span className="text-xs sm:text-sm text-gray-700 font-medium">
              {product.rating || "No rating"}
            </span>
          </div>
          <p
            className="text-sm sm:text-base text-gray-600 font-medium"
            aria-label={`Price: $${product.price}`}
          >
            ${product.price}
          </p>
        </div>
      </Link>

      {/* Add to Cart Section */}
      {productInCart ? (
        <div className="mt-3 sm:mt-4 flex items-center justify-between">
          <button
            onClick={() => dispatch(decreaseQuantity(product))}
            aria-label={`Decrease quantity of ${product.title}`}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-100 text-teal-700 rounded-lg border border-teal-300 hover:bg-teal-200 transition text-sm"
          >
            -
          </button>
          <span
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-teal-800 font-medium rounded-lg border text-sm"
            aria-label={`Quantity of ${product.title} in cart: ${quantity}`}
          >
            {quantity}
          </span>
          <button
            onClick={() => dispatch(increaseQuantity(product))}
            aria-label={`Increase quantity of ${product.title}`}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-100 text-teal-700 rounded-lg border border-teal-300 hover:bg-teal-200 transition text-sm"
          >
            +
          </button>
        </div>
      ) : (
        <div className="mt-3 sm:mt-4">
          <button
            onClick={() => dispatch(addToCart(product))}
            aria-label={`Add ${product.title} to cart`}
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