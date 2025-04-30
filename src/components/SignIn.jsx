import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import AuthFormWrapper from "./AuthFormWrapper";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthFormWrapper title="Welcome Back">
      <form className="space-y-5">
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 transition"
        >
          Sign In
        </button>
        <p className="text-sm text-center mt-2 text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-yellow-600 font-medium">
            Sign Up
          </a>
        </p>
      </form>
    </AuthFormWrapper>
  );
};

export default SignIn;
