import React, { useState } from "react";
import { signup } from "../api/auth";
import SigninForm from "../components/SigninForm";

function SignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    role: "customer", // default role
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showSignin, setShowSignin] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      const res = await signup(formData);
      localStorage.setItem("token", res.data.token);
      setSuccess("Signup successful! 🎉");
      window.location.reload();
    } catch (err) {
      console.error("Signup error:", err);
      const errorMsg = err?.response?.data?.error || err?.message || "Signup failed";
      setError(errorMsg);
    }
  };

  if (showSignin) return <SigninForm onBack={() => setShowSignin(false)} />;

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Signup Form"
      className="flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-teal-100 px-4 min-h-[calc(100vh-56px)] sm:min-h-[calc(100vh-64px)]"
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Sign Up</h2>

        {success && (
          <div
            role="alert"
            aria-live="polite"
            className="text-center text-green-600 font-medium"
          >
            {success}
          </div>
        )}
        {error && (
          <div
            role="alert"
            aria-live="assertive"
            className="text-center text-red-600 font-medium"
          >
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              id="username"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="name" className="sr-only">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              placeholder="Email"
              type="email"
              onChange={handleChange}
              autoComplete="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              autoComplete="new-password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          aria-label="Sign up button"
          className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-teal-700 transition duration-200"
        >
          Sign Up
        </button>

        <p className="text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => setShowSignin(true)}
            aria-label="Switch to Sign In form"
            className="text-teal-600 hover:underline cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </div>
    </form>
  );
}

export default SignupForm;
