import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/CartSlice";
import { placeOrder } from "../api/orderApi";


const CheckoutForm = ({ orderData, token, user }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin + "/order-success",
            },
            redirect: "if_required",
        });

        if (error) {
            setMessage(error.message);
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            // Payment successful, now save order
            try {
                const finalOrderData = {
                    ...orderData,
                    paymentMethod: "Stripe",
                    paymentId: paymentIntent.id
                };
                const res = await placeOrder(finalOrderData, token);

                // Map for success page
                const orderForSuccess = {
                    orderNumber: res.order._id.slice(-6),
                    date: new Date(res.order.createdAt).toLocaleString(),
                    customerEmail: user.email,
                    totalAmount: res.order.totalAmount,
                    paymentMethod: "Stripe",
                    items: res.order.products,
                    shippingAddress: res.order.address,
                };

                dispatch(clearCart());
                navigate("/order-success", { state: orderForSuccess });

            } catch (err) {
                setMessage("Payment successful but failed to save order: " + err.message);
                setIsProcessing(false);
            }
        } else {
            setIsProcessing(false);
        }
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement id="payment-element" />
            <button
                disabled={isProcessing || !stripe || !elements}
                id="submit"
                className={`w-full py-3 rounded-lg font-bold text-white transition ${isProcessing ? "bg-gray-400" : "bg-teal-600 hover:bg-teal-700"
                    }`}
            >
                <span id="button-text">
                    {isProcessing ? "Processing..." : "Pay Now"}
                </span>
            </button>
            {message && <div id="payment-message" className="text-red-500 text-sm text-center">{message}</div>}
        </form>
    );
};

export default CheckoutForm;
