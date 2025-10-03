import React from "react";

const PaymentMethod = ({ selectedMethod, setSelectedMethod }) => {
  const methods = ["Cash on Delivery"];

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Payment Method</h3>
      <div className="space-y-2">
        {methods.map((method) => (
          <label
            key={method}
            className="flex items-center space-x-2 cursor-pointer text-gray-700"
          >
            <input
              type="radio"
              name="payment"
              value={method}
              checked={selectedMethod === method}
              onChange={() => setSelectedMethod(method)}
              className="form-radio text-teal-600"
            />
            <span>{method}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethod;
