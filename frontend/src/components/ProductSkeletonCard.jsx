import React from "react";

const ProductSkeletonCard = () => {
  return (
    <div className="border rounded-xl p-3 sm:p-4 shadow-md bg-white animate-pulse">
      <div className="w-full h-32 sm:h-40 bg-gray-200 rounded-md mb-3 sm:mb-4" />
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
      <div className="h-5 bg-gray-200 rounded w-full mb-2" />
      <div className="flex items-center justify-between my-2">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>
      <div className="mt-3 sm:mt-4 h-10 bg-gray-200 rounded w-full" />
    </div>
  );
};

export default ProductSkeletonCard;