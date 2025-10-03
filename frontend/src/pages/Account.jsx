
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

  if (loading) return <p>Loading...</p>;
  if (!user) return <SigninForm />;

  return (
    <div className="h-full max-w-6xl mx-auto p-26">
      <h2 className="text-2xl font-bold mb-6">My Account</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <DashboardNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        <div className="col-span-3 bg-white p-6 rounded-lg shadow">
          {activeTab === "dashboard" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Hello {user.username} 👋
              </h3>
              <p>
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
