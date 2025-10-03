import React from "react";
import { Truck, Lock, Tag } from "lucide-react";

const FeatureSection = () => {
  return (
    <section className="bg-white px-6 md:px-24 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6 shadow-md rounded-lg">
          <Truck className="text-teal-800 w-10 h-10 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-teal-800">Fast Delivery</h3>
          <p className="text-gray-600">Get your orders delivered within 24–48 hours across major cities.</p>
        </div>
        <div className="p-6 shadow-md rounded-lg">
          <Lock className="text-teal-800 w-10 h-10 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-teal-800">Secure Payments</h3>
          <p className="text-gray-600">Your transactions are protected with end-to-end encryption.</p>
        </div>
        <div className="p-6 shadow-md rounded-lg">
          <Tag className="text-teal-800 w-10 h-10 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-teal-800">Best Deals</h3>
          <p className="text-gray-600">Enjoy exclusive discounts and seasonal offers every week.</p>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;