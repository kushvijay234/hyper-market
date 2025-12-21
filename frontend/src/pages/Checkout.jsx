import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PaymentMethod from "../components/PaymentMethod";
import { AuthContext } from "../utils/AuthContext";
import { getAddresses } from "../api/addressApi";
import { placeOrder, createPaymentIntent } from "../api/orderApi";
import { clearCart } from "../redux/CartSlice";
import { Mail, User } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import SigninForm from "../components/SigninForm";

// Initialize Stripe (Replace with your actual publishable key)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "pk_test_sample");

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);

  const [address, setAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  // Fetch shipping address
  useEffect(() => {
    const fetchData = async () => {
      if (user && token) {
        try {
          const res = await getAddresses(token);
          const shippingAddr =
            res?.shipping ||
            (Array.isArray(res)
              ? res.find((a) => a.type === "shipping")
              : null);
          setAddress(shippingAddr || null);
        } catch (err) {
          console.error("Error fetching address:", err);
        }
      }
    };
    fetchData();
  }, [user, token]);

  // Fetch Payment Intent when Stripe is selected
  useEffect(() => {
    if (paymentMethod === "Stripe" && cart.length > 0) {
      const fetchIntent = async () => {
        try {
          // Prepare products array (needs productId/id)
          const products = cart.map(item => ({ productId: item._id, quantity: item.quantity }));
          const res = await createPaymentIntent(cart, token);
          setClientSecret(res.clientSecret);
        } catch (err) {
          console.error("Failed to create payment intent:", err);
          alert("Failed to initialize payment: " + (err.error || err.message));
        }
      };
      fetchIntent();
    }
  }, [paymentMethod, cart, token]);

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const handlePlaceOrder = async () => {
    if (paymentMethod === "Stripe") return; // Handled by CheckoutForm

    if (!cart.length) return alert("Your cart is empty");
    if (!address) return alert("No shipping address found");
    if (!paymentMethod) return alert("Please select a payment method");

    const orderData = {
      products: cart.map((item) => ({
        productId: item._id,
        name: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount,
      paymentMethod,
      address,
    };

    setLoading(true);
    try {
      const res = await placeOrder(orderData, token);

      const orderForSuccess = {
        orderNumber: res.order._id.slice(-6),
        date: new Date(res.order.createdAt).toLocaleString(),
        customerEmail: user.email,
        totalAmount: res.order.totalAmount,
        paymentMethod: res.order.paymentMethod,
        items: res.order.products,
        shippingAddress: res.order.address,
      };

      dispatch(clearCart());
      navigate("/order-success", { state: orderForSuccess });
    } catch (err) {
      console.error("Failed to place order:", err);
      alert(err.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Please Login to Checkout</h1>
        <div className="w-full max-w-md">
          <SigninForm />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">💳 Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left: User Info, Address, Payment */}
          <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
              Customer Information
            </h2>
            {user && address ? (
              <>
                <div className="p-4 border rounded-xl shadow-sm bg-gray-50 mb-4">
                  <h3 className="text-lg font-semibold mb-3">👤 User Info</h3>
                  <p className="flex items-center gap-2">
                    <User size={18} className="text-teal-600" /> {user.name}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail size={18} className="text-teal-600" /> {user.email}
                  </p>
                </div>
                <div className="p-4 border rounded-xl shadow-sm bg-gray-50 mb-4">
                  <h3 className="text-lg font-semibold mb-3">
                    📦 Shipping Address
                  </h3>
                  <div className="grid grid-cols-3 gap-y-2 text-gray-700 text-sm">
                    <p className="font-medium">Name:</p>
                    <p className="col-span-2">{address.name}</p>

                    <p className="font-medium">Street:</p>
                    <p className="col-span-2">{address.street}</p>

                    <p className="font-medium">City:</p>
                    <p className="col-span-2">{address.city}</p>

                    <p className="font-medium">State:</p>
                    <p className="col-span-2">{address.state}</p>

                    <p className="font-medium">ZIP:</p>
                    <p className="col-span-2">{address.zip}</p>
                  </div>
                  <button
                    onClick={() => navigate("/dashboard/address")}
                    className="mt-3 text-sm text-teal-700 font-medium hover:underline"
                  >
                    ✏️ Change Address
                  </button>
                </div>
              </>
            ) : (
              <p className="text-gray-500">
                ⚠️ No shipping address found, please add one.
              </p>
            )}
            <PaymentMethod
              selectedMethod={paymentMethod}
              setSelectedMethod={setPaymentMethod}
            />
          </div>

          {/* Right: Order Summary */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md h-fit">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
              Order Summary
            </h2>
            <div className="space-y-2 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="truncate flex-1 mr-2">
                    {item.title} × {item.quantity}
                  </span>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-lg font-bold text-gray-800">
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>

            {/* Conditionally render Stripe Form or Place Order Button */}
            {paymentMethod === "Stripe" && clientSecret ? (
              <div className="mt-6">
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm
                    orderData={{
                      products: cart.map((item) => ({
                        productId: item._id,
                        name: item.title,
                        price: item.price,
                        quantity: item.quantity,
                      })),
                      totalAmount,
                      address,
                    }}
                    token={token}
                    user={user}
                  />
                </Elements>
              </div>
            ) : (
              <button
                onClick={handlePlaceOrder}
                disabled={(!paymentMethod) || loading || (paymentMethod === "Stripe" && !clientSecret)}
                className={`w-full mt-6 px-4 sm:px-6 py-3 rounded-xl shadow-md font-semibold text-sm sm:text-base ${paymentMethod && paymentMethod !== "Stripe"
                  ? "bg-teal-800 hover:bg-teal-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                {loading ? "Placing Order..." : "PLACE ORDER →"}
              </button>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
