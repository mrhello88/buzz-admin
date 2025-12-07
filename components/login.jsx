"use client"

import { useState } from "react"
import { Mail, Lock, User, LogIn } from "lucide-react"

export default function Login({ onLogin, darkMode }) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (isLogin) {
      // Login
      if (!formData.email || !formData.password) {
        setError("Please fill in all fields")
        return
      }
      // Simple validation - in real app, check against database
      onLogin({ email: formData.email, name: formData.email.split("@")[0] })
    } else {
      // Register
      if (!formData.name || !formData.email || !formData.password) {
        setError("Please fill in all fields")
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match")
        return
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters")
        return
      }
      // Register and login
      onLogin({ email: formData.email, name: formData.name })
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-slate-950" : "bg-gray-50"} p-4`}>
      <div className={`${darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-gray-200"} border rounded-xl shadow-2xl w-full max-w-md p-8`}>
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-black"}`}>SMM Panel</h1>
          <p className={darkMode ? "text-slate-400" : "text-gray-600"}>
            {isLogin ? "Login to access dashboard" : "Create an account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                Full Name
              </label>
              <div className="relative">
                <User
                  size={18}
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? "text-slate-400" : "text-gray-400"}`}
                />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                    darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter your name"
                />
              </div>
            </div>
          )}

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
              Email
            </label>
            <div className="relative">
              <Mail
                size={18}
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? "text-slate-400" : "text-gray-400"}`}
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
              Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? "text-slate-400" : "text-gray-400"}`}
              />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? "text-slate-400" : "text-gray-400"}`}
                />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                    darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Confirm your password"
                />
              </div>
            </div>
          )}

          {error && (
            <div className={`p-3 rounded-lg ${darkMode ? "bg-red-500/20 text-red-400" : "bg-red-50 text-red-600"} text-sm`}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <LogIn size={20} />
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setError("")
              setFormData({ name: "", email: "", password: "", confirmPassword: "" })
            }}
            className={`text-sm ${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"}`}
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-700">
          <p className={`text-center text-sm ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
            You can order without login, but registration gives you access to the dashboard
          </p>
        </div>
      </div>
    </div>
  )
}

