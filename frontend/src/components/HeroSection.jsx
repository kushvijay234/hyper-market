import React from "react";
import { Link } from "react-router-dom";
import bannerImage from "../assets/bannerWomen.png";

const HeroSection = () => {
  return (
    <section className="bg-gray-50 px-6 md:px-24 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center min-h-[600px] gap-12">
        {/* Left Text Block */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-teal-800">
            HyperMarket: Style Meets Simplicity
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-teal-700 mb-8">
            Shop curated collections of fashion, tech, and lifestyle essentials.
            Designed for you.
          </p>
          <div className="flex justify-center md:justify-start">
            <Link
              to="/product"
              className="bg-teal-800 text-white font-semibold px-6 py-3 rounded-md hover:bg-teal-900 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Right Image Block */}
        <div className="w-full flex items-center justify-center">
          <img
            src={bannerImage}
            alt="Banner"
            className="w-full max-h-[400px] object-contain rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
