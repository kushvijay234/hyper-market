import React from "react";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-teal-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About HyperMarket</h3>
          <p className="text-sm text-teal-100">
            HyperMarket is your one-stop shop for everything from fashion to electronics. We deliver quality and convenience at your fingertips.
          </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-teal-100 text-sm">
            <li><Link to="#" className="hover:text-white">Fashion</Link></li>
            <li><Link to="#" className="hover:text-white">Electronics</Link></li>
            <li><Link to="#" className="hover:text-white">Home & Living</Link></li>
            <li><Link to="#" className="hover:text-white">Grocery</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-teal-100 text-sm">
            <li><Link to="#" className="hover:text-white">Help Center</Link></li>
            <li><Link to="#" className="hover:text-white">Returns</Link></li>
            <li><Link to="#" className="hover:text-white">Shipping Info</Link></li>
            <li><Link to="#" className="hover:text-white">Contact Us</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-teal-100">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><Twitter size={20} /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><Youtube size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-teal-700 pt-4 text-center text-sm text-teal-300">
        © {new Date().getFullYear()} HyperMarket. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;