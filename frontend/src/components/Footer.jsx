import React from "react";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-teal-900 text-white py-8 sm:py-10" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* About */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">About HyperMarket</h3>
            <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
              HyperMarket is your one-stop shop for everything from fashion to electronics. We deliver quality and convenience at your fingertips.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Categories</h3>
            <ul className="space-y-2 text-teal-100 text-xs sm:text-sm">
              <li><Link to="#" className="hover:text-white transition" aria-label="Browse Fashion category">Fashion</Link></li>
              <li><Link to="#" className="hover:text-white transition" aria-label="Browse Electronics category">Electronics</Link></li>
              <li><Link to="#" className="hover:text-white transition" aria-label="Browse Home and Living category">Home & Living</Link></li>
              <li><Link to="#" className="hover:text-white transition" aria-label="Browse Grocery category">Grocery</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Support</h3>
            <ul className="space-y-2 text-teal-100 text-xs sm:text-sm">
              <li><Link to="#" className="hover:text-white transition" aria-label="Visit Help Center">Help Center</Link></li>
              <li><Link to="#" className="hover:text-white transition" aria-label="View Returns policy">Returns</Link></li>
              <li><Link to="#" className="hover:text-white transition" aria-label="View Shipping Information">Shipping Info</Link></li>
              <li><Link to="#" className="hover:text-white transition" aria-label="Contact HyperMarket support">Contact Us</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Follow Us</h3>
            <div className="flex space-x-3 sm:space-x-4 text-teal-100">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook page" className="hover:text-white transition">
                <Facebook size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram profile" className="hover:text-white transition">
                <Instagram size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Twitter profile" className="hover:text-white transition">
                <Twitter size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our YouTube channel" className="hover:text-white transition">
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-10 border-t border-teal-700 pt-4 text-center text-xs sm:text-sm text-teal-300" aria-label="Copyright notice">
          © {new Date().getFullYear()} HyperMarket. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;