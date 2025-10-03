import React from "react";
import { Link } from "react-router-dom";
import bannerImage from "../assets/bannerWomen.png";

const HeroSection = () => {
  return (
    <section className="bg-gray-50 px-6 md:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-stretch min-h-[600px] gap-12">
        {/* Left Text Block */}
        <div className="p-10 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-teal-800">
            HyperMarket: Style Meets Simplicity
          </h1>
          <p className="text-lg md:text-xl text-teal-700 mb-8">
            Shop curated collections of fashion, tech, and lifestyle essentials.
            Designed for you.
          </p>
          <Link
            to="/product"
            className="bg-teal-800 text-white font-semibold px-6 py-3 rounded-md hover:bg-teal-900 transition w-fit"
          >
            Shop Now
          </Link>
        </div>

        {/* Right Image Block */}
        <div
          style={{ backgroundImage: `url(${bannerImage})` }}
          className="w-full bg-cover"
        ></div>
      </div>
    </section>
  );
};

export default HeroSection;
