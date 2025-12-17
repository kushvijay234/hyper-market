import React, { useState } from "react";
import { signup, googleSignin } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import SigninForm from "../components/SigninForm";
import { Eye, EyeOff } from "lucide-react";

function SignupForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSignin, setShowSignin] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);

    try {
      const res = await signup(formData);
      localStorage.setItem("token", res.data.token);

      if (res.data.emailSent) {
        setSuccess("Signup successful! Email sent. Redirecting... 🎉");
      } else {
        setSuccess("Signup successful! Email failed to send. Redirecting...");
      }

      // Small delay to let user see the message
      setTimeout(() => {
        navigate("/account");
        window.location.reload(); // Ensure state is fresh if needed, though navigate is usually enough. keeping reload as originally requested/implied context might need it for auth state context updates if any.
        // Actually best to just navigate if we rely on global state updates, but since I don't see context provider usage here, maybe reload is safer for now or just navigate. 
        // Let's stick to navigate but if the app relies on reload to fetch user profile in App.js or similar, we might need to trigger that.
        // The user originally had window.location.reload(). 
        // Let's replace with navigate(0) or just navigate("/account") and reload. 
        // Better:
        // window.location.href = "/account"; // This does both navigate and reload
      }, 1500);

    } catch (err) {
      console.error("Signup error:", err);
      const errorData = err?.response?.data;
      const errorMsg =
        typeof errorData === "string"
          ? errorData
          : errorData?.error || err.message || "Signup failed";
      setError(errorMsg);
    } finally {
      setLoading(false);
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

        {loading && (
          <div
            role="status"
            aria-live="polite"
            className="text-center text-teal-600 font-medium"
          >
            Creating account...
          </div>
        )}
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
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={handleChange}
                  autoComplete="new-password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          aria-label="Sign up button"
          className={`w-full py-3 rounded-lg font-semibold shadow-md transition duration-200 ${loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-teal-600 hover:bg-teal-700 text-white"
            }`}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const res = await googleSignin(credentialResponse.credential);
                localStorage.setItem("token", res.data.token);
                setSuccess("Google Signup successful! Redirecting... 🎉");
                setTimeout(() => {
                  navigate("/account");
                  window.location.reload();
                }, 1500);
              } catch (err) {
                console.error(err);
                setError("Google Signup Failed");
              }
            }}
            onError={() => {
              setError("Google Signup Failed");
            }}
          />
        </div>

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