import React, { useEffect, useState } from "react";
import { getUserOrders } from "../../api/orderApi";

const Orders = () => {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found, please login again.");
        }

        const data = await getUserOrders(token);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, []);

  if (loading) return <p className="text-center py-6">Loading orders...</p>;

  if (!orders || orders.length === 0) {
    return <p className="text-center py-6 text-gray-500">No orders found.</p>;
  }

  return (
    <div>
      <h3 className="text-xl sm:text-2xl font-semibold mb-6">My Orders</h3>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full border rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-3">Order ID</th>
              <th className="border p-3">Total Amount</th>
              <th className="border p-3">Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="border p-3">{order._id}</td>
                <td className="border p-3">₹{order.totalAmount.toFixed(2)}</td>
                <td className="border p-3">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold text-gray-800">Order ID:</span>{" "}
              {order._id}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold text-gray-800">Total:</span>{" "}
              ₹{order.totalAmount.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">Date:</span>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;