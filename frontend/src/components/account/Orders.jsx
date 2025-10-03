// components/account/Orders.jsx
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

  if (loading) return <p>Loading orders...</p>;

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">My Orders</h3>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Total Amount</th>
            <th className="border p-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border p-2">{order._id}</td>
              <td className="border p-2">₹{order.totalAmount.toFixed(2)}</td>
              <td className="border p-2">
                {new Date(order.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
