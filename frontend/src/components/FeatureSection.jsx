import React from "react";
import { Truck, Lock, Tag } from "lucide-react";

const FeatureSection = () => {
  return (
    <section className="bg-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 text-center">
          <div className="p-4 sm:p-6 shadow-md rounded-lg hover:shadow-lg transition-shadow">
            <Truck className="text-teal-800 w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-teal-800">Fast Delivery</h3>
            <p className="text-sm sm:text-base text-gray-600">Get your orders delivered within 24–48 hours across major cities.</p>
          </div>
          <div className="p-4 sm:p-6 shadow-md rounded-lg hover:shadow-lg transition-shadow">
            <Lock className="text-teal-800 w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-teal-800">Secure Payments</h3>
            <p className="text-sm sm:text-base text-gray-600">Your transactions are protected with end-to-end encryption.</p>
          </div>
          <div className="p-4 sm:p-6 shadow-md rounded-lg hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
            <Tag className="text-teal-800 w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-teal-800">Best Deals</h3>
            <p className="text-sm sm:text-base text-gray-600">Enjoy exclusive discounts and seasonal offers every week.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;