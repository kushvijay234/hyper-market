import React from "react";

const BillingForm = ({ formData, setFormData }) => {
  return (
    <form className="space-y-4">
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Full Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
          placeholder="John Doe"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
          placeholder="example@email.com"
        />
      </div>

      {/* Street */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Street
        </label>
        <input
          type="text"
          value={formData.street || ""}
          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
          className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
          placeholder="123 Main Street"
        />
      </div>

      {/* City + State (inline) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">
            City
          </label>
          <input
            type="text"
            value={formData.city || ""}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
            placeholder="New York"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            State
          </label>
          <input
            type="text"
            value={formData.state || ""}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
            placeholder="NY"
          />
        </div>
      </div>

      {/* ZIP */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          ZIP Code
        </label>
        <input
          type="text"
          value={formData.zip || ""}
          onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
          className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
          placeholder="10001"
        />
      </div>
    </form>
  );
};

export default BillingForm;
