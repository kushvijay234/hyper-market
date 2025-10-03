import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";
import { getAddresses, updateAddress } from "../../api/addressApi";

const Addresses = () => {
  const { user, loading, token } = useContext(AuthContext);
  const [addresses, setAddresses] = useState({
    billing: { name: "", street: "", city: "", state: "", zip: "", type: "billing" },
    shipping: { name: "", street: "", city: "", state: "", zip: "", type: "shipping" },
  });

  useEffect(() => {
    if (user && token) fetchAddresses();
  }, [user, token]);

  const fetchAddresses = async () => {
    try {
      const data = await getAddresses(token);
      const mapped = { billing: {}, shipping: {} };
      data.forEach((addr) => {
        mapped[addr.type] = addr;
      });
      setAddresses((prev) => ({ ...prev, ...mapped }));
    } catch (err) {
      console.error("Fetch addresses error:", err);
    }
  };

  const handleChange = (type, field, value) => {
    setAddresses((prev) => ({
      ...prev,
      [type]: { ...prev[type], [field]: value, type },
    }));
  };

  const handleSave = async () => {
    try {
      const billingRes = await updateAddress(addresses.billing, token);
      const shippingRes = await updateAddress(addresses.shipping, token);

      setAddresses({
        billing: billingRes.address,
        shipping: shippingRes.address,
      });

      alert("Addresses updated successfully!");
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Failed to update addresses. See console.");
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (!user) return <p className="text-red-500">Please login to manage addresses.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white  rounded-lg">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">My Addresses</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {["billing", "shipping"].map((type) => (
          <div
            key={type}
            className="border border-gray-200 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h4 className="text-lg font-medium mb-4 text-gray-700">
              {type === "billing" ? "Billing" : "Shipping"} Address
            </h4>
            {["name", "street", "city", "state", "zip"].map((field) => (
              <input
                key={field}
                className="border border-gray-300 p-2 mb-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={addresses[type][field] || ""}
                onChange={(e) => handleChange(type, field, e.target.value)}
              />
            ))}
          </div>
        ))}
      </div>
      <button
        onClick={handleSave}
        className="mt-6 px-6 py-3 bg-teal-800 text-white font-semibold rounded-lg shadow hover:bg-teal-600 transition"
      >
        Save Addresses
      </button>
    </div>
  );
};

export default Addresses;
