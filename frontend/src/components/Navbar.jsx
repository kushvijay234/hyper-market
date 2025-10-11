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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const quantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-teal-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0" aria-label="Home">
            <img src="/sitelogo.svg" alt="HyperMarket Logo" className="h-6 sm:h-8 w-auto" />
          </Link>

          {/* Search - Hidden on mobile, shown on tablet+ */}
          <div className="hidden sm:flex items-center bg-white rounded-lg px-2">
            <Search className="text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-2 py-1 text-black outline-none rounded-lg text-sm"
              aria-label="Search products"
            />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <li>
              <Link to="/product" className="hover:text-teal-200 transition text-sm lg:text-base">Shop</Link>
            </li>
            <li className="relative">
              <Link to="/cart" className="hover:text-teal-200 transition relative" aria-label="Cart">
                <ShoppingCart size={18} />
                {quantity > 0 && (
                  <span className="absolute -top-2 -right-3 bg-white text-black rounded-full px-1.5 py-0.5 text-xs">
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
                    <UserCircle size={18} />
                    <span className="text-sm">▾</span>
                  </button>
                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg z-50">
                      <Link to="/account" className="block px-4 py-2 hover:bg-teal-100 text-sm" onClick={() => setIsOpen(false)}>
                        Profile
                      </Link>
                      {user?.role === "admin" && (
                        <Link to="/admin" className="block px-4 py-2 hover:bg-teal-100 text-sm" onClick={() => setIsOpen(false)}>
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-teal-100 text-sm"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/account" className="hover:text-teal-200 transition flex items-center space-x-1 text-sm">
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
              )}
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Cart Icon */}
            <Link to="/cart" className="relative" aria-label="Cart">
              <ShoppingCart size={20} />
              {quantity > 0 && (
                <span className="absolute -top-2 -right-3 bg-white text-black rounded-full px-1.5 py-0.5 text-xs">
                  {quantity}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none focus:ring-2 focus:ring-white p-1"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-teal-700 border-t border-teal-600">
          {/* Mobile Search */}
          <div className="px-4 py-3 border-b border-teal-600">
            <div className="flex items-center bg-white rounded-lg px-3 py-2">
              <Search className="text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-2 py-1 text-black outline-none rounded-lg text-sm flex-1"
                aria-label="Search products"
              />
            </div>
          </div>
          
          <div className="px-4 py-3 space-y-1">
            <Link to="/" className="block px-3 py-2 rounded hover:bg-teal-600 text-sm" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/product" className="block px-3 py-2 rounded hover:bg-teal-600 text-sm" onClick={() => setMobileMenuOpen(false)}>Products</Link>
            {user ? (
              <>
                <Link to="/account" className="block px-3 py-2 rounded hover:bg-teal-600 text-sm" onClick={() => setMobileMenuOpen(false)}>Account</Link>
                {user?.role === "admin" && (
                  <Link to="/admin" className="block px-3 py-2 rounded hover:bg-teal-600 text-sm" onClick={() => setMobileMenuOpen(false)}>Admin Dashboard</Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/account" className="block px-3 py-2 rounded hover:bg-teal-600 text-sm" onClick={() => setMobileMenuOpen(false)}>Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;