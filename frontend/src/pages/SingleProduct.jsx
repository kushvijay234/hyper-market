// src/pages/SingleProduct.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import getProducts from "../api/productapi";
import { ArrowLeft, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/CartSlice";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const productInCart = useSelector((state) =>
    state.cart.find((item) => item._id === id)
  );

  const quantity = useSelector(
    (state) => state.cart.find((item) => item._id === id)?.quantity || 0
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await getProducts();
        const single = products.find((p) => p._id === id);
        setProduct(single);
      } catch (err) {
        setError(err.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="p-6">Loading product...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!product) return <p className="p-6 text-gray-500">Product not found</p>;

  const categoryNames = product.category?.map((c) => c.name).join(", ");
  const tagNames = product.tags?.map((t) => t.name).join(", ");

  return (
    <div className="py-26 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Left - Images */}
      <div className="relative">
        <Link
          to="/product"
          className="absolute top-0 left-0 mt-2 ml-2 bg-white rounded-full p-2 shadow hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5 text-teal-700" />
        </Link>

        <img
          src={product.thumbnail || "https://via.placeholder.com/400"}
          alt={product.title}
          className="w-full h-96 object-contain rounded-lg shadow mt-6"
        />

        {product.images?.length > 0 && (
          <div className="mt-4 flex gap-2 overflow-x-auto">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.title}-${idx}`}
                className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:scale-105 transition"
              />
            ))}
          </div>
        )}
      </div>

      {/* Right - Product Details */}
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>

        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          <span className="text-gray-700 font-medium">{product.rating || "No rating"}</span>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-2xl font-semibold text-teal-700">${product.price}</p>
          {product.discount && (
            <p className="text-gray-500 line-through">${(product.price + product.discount).toFixed(2)}</p>
          )}
        </div>

        <p className={`font-semibold ${product.availabilityStatus === "In Stock" ? "text-green-600" : "text-red-600"}`}>
          Availability: {product.availabilityStatus}
        </p>

        <div className="flex flex-wrap gap-6 border-t border-b py-4 text-gray-700">
          <p>Stock: {product.stock}</p>
          <p>SKU: {product.sku}</p>
          <p>Weight: {product.weight || "N/A"} kg</p>
          <p>
            Dimensions:{" "}
            {product.dimensions
              ? `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm`
              : "N/A"}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-gray-600">
          {categoryNames && <p>Categories: {categoryNames}</p>}
          {tagNames && <p>Tags: {tagNames}</p>}
          {product.brand?.name && <p>Brand: {product.brand.name}</p>}
        </div>

        {product.description && (
          <div className="border-t pt-4 text-gray-700">
            <h2 className="font-semibold mb-2">Description</h2>
            <p>{product.description}</p>
          </div>
        )}

        {/* Add to Cart Section */}
        {productInCart ? (
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => dispatch(decreaseQuantity(product))}
              className="px-4 py-2 bg-teal-100 text-teal-700 rounded-lg border border-teal-300 hover:bg-teal-200 transition"
            >
              -
            </button>
            <span className="px-4 py-2 bg-gray-100 text-teal-800 font-medium rounded-lg border">
              {quantity}
            </span>
            <button
              onClick={() => dispatch(increaseQuantity(product))}
              className="px-4 py-2 bg-teal-100 text-teal-700 rounded-lg border border-teal-300 hover:bg-teal-200 transition"
            >
              +
            </button>
          </div>
        ) : (
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => dispatch(addToCart(product))}
              className="mt-4 w-full bg-teal-600 text-white py-2 px-4 rounded-lg font-medium shadow hover:bg-teal-700 transition duration-200"
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;