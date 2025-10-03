import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthContext } from "../utils/AuthContext";
import { Search, ShoppingCart, UserCircle, LogIn } from "lucide-react";
import { SearchContext } from "../utils/SearchContext";

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const { user, logout } = useContext(AuthContext);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [isOpen, setIsOpen] = useState(false);
  const quantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <nav className="w-full z-50 bg-teal-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0" aria-label="Home">
            <img src="/sitelogo.svg" alt="HyperMarket Logo" className="h-8 w-auto" />
          </Link>

          {/* Search */}
          <div className="flex items-center bg-white rounded-lg px-2">
            <Search className="text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-2 py-1 text-black outline-none rounded-lg"
              aria-label="Search products"
            />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-6">
            <li>
              <Link to="/product" className="hover:text-teal-200 transition">Shop</Link>
            </li>
            <li className="relative">
              <Link to="/cart" className="hover:text-teal-200 transition relative" aria-label="Cart">
                <ShoppingCart size={20} />
                {quantity > 0 && (
                  <span className="absolute -top-2 -right-3 bg-white text-black rounded-full px-2 py-0.5 text-xs">
                    {quantity}
                  </span>
                )}
              </Link>
            </li>
            <li className="relative">
              {user ? (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="hover:text-teal-200 transition flex items-center space-x-1"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                  >
                    <UserCircle size={20} />
                    <span>▾</span>
                  </button>
                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg z-50">
                      <Link to="/account" className="block px-4 py-2 hover:bg-teal-100" onClick={() => setIsOpen(false)}>
                        Profile
                      </Link>
                      {user?.role === "admin" && (
                        <Link to="/admin" className="block px-4 py-2 hover:bg-teal-100" onClick={() => setIsOpen(false)}>
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-teal-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/account" className="hover:text-teal-200 transition flex items-center space-x-1">
                  <LogIn size={20} />
                  <span>Login</span>
                </Link>
              )}
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button type="button" className="text-white focus:outline-none focus:ring-2 focus:ring-white" aria-label="Toggle menu">
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden px-2 pb-3 space-y-2">
        <Link to="/" className="block px-3 py-2 rounded hover:bg-teal-700">Home</Link>
        <Link to="/product" className="block px-3 py-2 rounded hover:bg-teal-700">Product</Link>
        <Link to="/cart" className="block px-3 py-2 rounded hover:bg-teal-700">
          Cart
          {quantity > 0 && (
            <span className="ml-2 bg-red-500 text-white rounded-full px-2 text-xs">
              {quantity}
            </span>
          )}
        </Link>
        {user ? (
          <>
            <Link to="/account" className="block px-3 py-2 rounded hover:bg-teal-700">Account</Link>
            {user?.role === "admin" && (
              <Link to="/admin" className="block px-3 py-2 rounded hover:bg-teal-700">Admin Dashboard</Link>
            )}
            <button
              onClick={logout}
              className="block w-full text-left px-3 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="block px-3 py-2 rounded hover:bg-teal-700">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;