"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { authAPI } from "@/lib/api/exhibitors";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [debugMode, setDebugMode] = useState(false);

  /* ======================================================
     SUBMIT HANDLER (CLEAN & CORRECT)
  ====================================================== */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("🔐 Attempting login:", formData.email);

      const result = await authAPI.login(
        formData.email,
        formData.password
      );

      // Save auth data
      localStorage.setItem("exhibitor_token", result.token);
      localStorage.setItem(
        "exhibitor_data",
        JSON.stringify(result.exhibitor)
      );

      toast.success("Login successful! Welcome back 🎉");

      router.push("/dashboard");
    } catch (error: any) {
      console.error("❌ Login failed:", error);

      toast.error(
        <div className="p-2">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span className="font-medium">
              {error.message || "Login failed"}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Please check your credentials or try again.
          </p>
        </div>,
        { duration: 5000 }
      );

      setDebugMode(true);
    } finally {
      setLoading(false);
    }
  };

  /* ======================================================
     UI
  ====================================================== */

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-20 w-420 rounded-2xl mb-4">
            {/* DIEMEX Logo - You can use either an image or text logo */}
            
            {/* Option 1: If you have a logo image */}
            <div className="relative h-46 w-146">
              <Image
                src="/images/exhibitor-login.png" // Update this path to your actual logo location
                alt="DIEMEX"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Option 2: Text logo (if you don't have an image) */}
            {/* <div className="text-center">
              <h1 className="text-4xl font-bold text-blue-600">DIEMEX</h1>
              <p className="text-xs text-gray-500 mt-1">Exhibition</p>
            </div> */}
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Exhibitor Portal
          </h1>
          <p className="text-gray-600">
            Sign in to access your dashboard
          </p>

          {debugMode && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
              <strong>Debug mode enabled.</strong>
              <br />
              API URL:{" "}
              {process.env.NEXT_PUBLIC_API_URL ||
                "https://diemex-backend.onrender.com/api"}
            </div>
          )}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </div>
              </label>

              <div className="relative">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="you@company.com"
                  disabled={loading}
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </div>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 pl-11 pr-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter your password"
                  disabled={loading}
                />

                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} DIEMEX Exhibition. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}