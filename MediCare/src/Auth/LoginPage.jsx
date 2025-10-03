import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const roles = ["Doctor", "Hospital", "Department", "Pharmacist"];

export default function LoginPage() {
  const [activeRole, setActiveRole] = useState("Doctor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { Auth, login } = useAuth();
  console.log(Auth);
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // --- Dummy Auth (replace with API later) ---
    setTimeout(() => {
      if (!email || !password) {
        setError("Please enter both ID and password.");
      } else if (password === "password123") {
        login(activeRole, { email });
      } else {
        setError("Invalid credentials. Please try again.");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-4">MediCare Login</h1>

        {/* Role Tabs */}
        <div className="flex border rounded-lg mb-4">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setActiveRole(role)}
              className={`w-1/4 py-2 text-sm font-medium rounded-md ${
                activeRole === role
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder={`${activeRole} ID`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="w-full px-4 py-2 border rounded-lg"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
