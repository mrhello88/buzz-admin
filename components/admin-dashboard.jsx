"use client"

import { useState } from "react"
import { Menu, X, Moon, Sun, Users, ShoppingCart, CreditCard, Settings, LogOut, Bell, Search } from "lucide-react"
import StatCard from "./stat-card"
import UsersTable from "./users-table"
import OrdersTable from "./orders-table"
import PaymentsTable from "./payments-table"
import ApiIntegrations from "./api-integrations"
import ServicesTable from "./services-table"

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchQuery, setSearchQuery] = useState("")

  const stats = [
    { title: "Total Users", value: "2,543", change: "+12%", icon: Users, color: "from-blue-500 to-blue-600" },
    {
      title: "Total Orders",
      value: "1,284",
      change: "+8%",
      icon: ShoppingCart,
      color: "from-purple-500 to-purple-600",
    },
    { title: "Revenue", value: "$45,230", change: "+23%", icon: CreditCard, color: "from-green-500 to-green-600" },
    { title: "API Calls", value: "89,234", change: "+5%", icon: Settings, color: "from-orange-500 to-orange-600" },
  ]

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Menu },
    { id: "users", label: "Users", icon: Users },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "services", label: "Services", icon: Settings },
    { id: "api", label: "API Integration", icon: Settings },
  ]

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-slate-900 text-white transition-all duration-300 flex flex-col border-r border-slate-700`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold">SMM Panel</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-slate-800 rounded">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-700">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${darkMode ? "bg-slate-950" : "bg-gray-50"}`}>
        {/* Header */}
        <header
          className={`${darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-gray-200"} border-b px-8 py-4 flex items-center justify-between`}
        >
          <div className="flex items-center gap-4 flex-1">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${darkMode ? "bg-slate-800" : "bg-gray-100"}`}
            >
              <Search size={18} className={darkMode ? "text-slate-400" : "text-gray-500"} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`bg-transparent outline-none w-64 ${darkMode ? "text-white placeholder-slate-500" : "text-black placeholder-gray-400"}`}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              className={`p-2 rounded-lg ${darkMode ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              <Bell size={20} />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${darkMode ? "bg-slate-800 text-yellow-400 hover:bg-slate-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-8">
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div>
                <h2 className={`text-3xl font-bold mb-6 ${darkMode ? "text-white" : "text-black"}`}>Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} darkMode={darkMode} />
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div
                className={`${darkMode ? "bg-slate-900" : "bg-white"} rounded-lg p-6 border ${darkMode ? "border-slate-700" : "border-gray-200"}`}
              >
                <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-black"}`}>Recent Orders</h3>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? "bg-slate-800" : "bg-gray-50"}`}
                    >
                      <div>
                        <p className={`font-medium ${darkMode ? "text-white" : "text-black"}`}>Order #{1000 + i}</p>
                        <p className={`text-sm ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                          Instagram Followers
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                        Completed
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && <UsersTable darkMode={darkMode} />}
          {activeTab === "orders" && <OrdersTable darkMode={darkMode} />}
          {activeTab === "payments" && <PaymentsTable darkMode={darkMode} />}
          {activeTab === "services" && <ServicesTable darkMode={darkMode} />}
          {activeTab === "api" && <ApiIntegrations darkMode={darkMode} />}
        </main>
      </div>
    </div>
  )
}
