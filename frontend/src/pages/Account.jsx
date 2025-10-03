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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">My Account</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="md:col-span-1">
          <DashboardNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 bg-white p-4 sm:p-6 rounded-lg shadow">
          {activeTab === "dashboard" && (
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4">
                Hello {user.username} 👋
              </h3>
              <p className="text-sm sm:text-base">
                From your account dashboard you can view your{" "}
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-teal-600 underline"
                >
                  recent orders
                </button>
                , manage your{" "}
                <button
                  onClick={() => setActiveTab("addresses")}
                  className="text-teal-600 underline"
                >
                  shipping & billing addresses
                </button>
                , and{" "}
                <button
                  onClick={() => setActiveTab("profile")}
                  className="text-teal-600 underline"
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
  );
}

export default Account;