import React from "react";
import { Link } from "react-router-dom";
import bannerImage from "../assets/bannerWomen.png";

const HeroSection = () => {
  return (
    <section className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12">
          {/* Left Text Block */}
          <div className="flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 sm:mb-6 text-teal-800">
              HyperMarket: Style Meets Simplicity
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-teal-700 mb-6 sm:mb-8 leading-relaxed">
              Shop curated collections of fashion, tech, and lifestyle essentials.
              Designed for you.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Link
                to="/product"
                className="bg-teal-800 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-teal-900 transition text-sm sm:text-base"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Right Image Block */}
          <div className="w-full flex items-center justify-center order-1 lg:order-2">
            <img
              src={bannerImage}
              alt="Banner"
              className="w-full max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
