import React, { useState, useContext } from "react";
import { signin as signinApi } from "../api/auth";
import { AuthContext } from "../utils/AuthContext";
import SignupForm from "./SignupForm";

function SigninForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { signin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signinApi(formData);
      signin(res.data.token);
    } catch (error) {
      const errorData = error?.response?.data;
      const errorMsg =
        typeof errorData === "string"
          ? errorData
          : errorData?.error || error.message || "Signin failed";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (showSignup) return <SignupForm onBack={() => setShowSignup(false)} />;

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Signin Form"
      className="flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-teal-100 px-4 min-h-[calc(100vh-56px)] sm:min-h-[calc(100vh-64px)]"
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Sign In</h2>

        {loading && (
          <div
            role="status"
            aria-live="polite"
            className="text-center text-teal-600 font-medium"
          >
            Signing in...
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
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
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
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          aria-label="Sign in button"
          className={`w-full py-3 rounded-lg font-semibold shadow-md transition duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700 text-white"
          }`}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-center text-gray-600 text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => setShowSignup(true)}
            aria-label="Switch to Sign Up form"
            className="text-teal-600 hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </form>
  );
}

export default SigninForm;