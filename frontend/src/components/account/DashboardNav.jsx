import React from "react";

const DashboardNav = ({ activeTab, setActiveTab }) => {
  const menu = [
    { key: "dashboard", label: "Dashboard" },
    { key: "orders", label: "Orders" },
    { key: "addresses", label: "Addresses" },
    { key: "profile", label: "Account Details" },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow h-fit">
      <ul className="space-y-2">
        {menu.map((item) => (
          <li key={item.key}>
            <button
              onClick={() => setActiveTab(item.key)}
              className={`w-full text-left px-3 py-2 rounded-md ${
                activeTab === item.key
                  ? "bg-teal-600 text-white"
                  : "text-gray-700 hover:bg-teal-50"
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardNav;
