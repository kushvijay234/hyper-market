import React, { useContext, useState } from "react";
import { AuthContext } from "../utils/AuthContext";
import SigninForm from "../components/SigninForm";
import DashboardNav from "../components/account/DashboardNav";
import ProfileInfo from "../components/account/ProfileInfo";
import Orders from "../components/account/Orders";
import Addresses from "../components/account/Addresses";

function Account() {
  const { user, loading } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("dashboard");

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!user) return <SigninForm />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left text-gray-800">My Account</h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <DashboardNav activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 bg-white p-4 sm:p-6 rounded-lg shadow-md">
            {activeTab === "dashboard" && (
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
                  Hello {user.username} 👋
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  From your account dashboard you can view your{" "}
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-teal-600 underline hover:text-teal-800 transition"
                  >
                    recent orders
                  </button>
                  , manage your{" "}
                  <button
                    onClick={() => setActiveTab("addresses")}
                    className="text-teal-600 underline hover:text-teal-800 transition"
                  >
                    shipping & billing addresses
                  </button>
                  , and{" "}
                  <button
                    onClick={() => setActiveTab("profile")}
                    className="text-teal-600 underline hover:text-teal-800 transition"
                  >
                    edit your password and account details
                  </button>
                  .
                </p>
              </div>
            )}
            {activeTab === "profile" && <ProfileInfo user={user} />}
            {activeTab === "orders" && <Orders />}
            {activeTab === "addresses" && <Addresses />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;