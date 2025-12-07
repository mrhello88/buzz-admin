"use client"

import { useState } from "react"
import { Menu, Users, ShoppingCart, CreditCard, Settings, FileText, TrendingUp, TrendingDown, Activity, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import StatCard from "./stat-card"
import UsersTable from "./users-table"
import OrdersTable from "./orders-table"
import PaymentsTable from "./payments-table"
import ApiIntegrations from "./api-integrations"
import ServicesTable from "./services-table"
import BlogsTable from "./blogs-table"
import Sidebar from "./sidebar"
import Header from "./header"

export default function AdminDashboard({ user, onLogout, darkMode: propDarkMode, setDarkMode: setPropDarkMode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [darkMode, setDarkMode] = useState(propDarkMode !== undefined ? propDarkMode : true)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchQuery, setSearchQuery] = useState("")

  // Sync dark mode with parent
  const handleDarkModeChange = (newMode) => {
    setDarkMode(newMode)
    if (setPropDarkMode) setPropDarkMode(newMode)
  }

  const stats = [
    { title: "Total Users", value: "2,543", change: "+12%", changeType: "up", icon: Users, color: "from-blue-500 to-blue-600", description: "Active users this month" },
    {
      title: "Total Orders",
      value: "1,284",
      change: "+8%",
      changeType: "up",
      icon: ShoppingCart,
      color: "from-purple-500 to-purple-600",
      description: "Orders processed",
    },
    { title: "Revenue", value: "$45,230", change: "+23%", changeType: "up", icon: CreditCard, color: "from-green-500 to-green-600", description: "Total revenue" },
    { title: "API Calls", value: "89,234", change: "+5%", changeType: "up", icon: Settings, color: "from-orange-500 to-orange-600", description: "API requests today" },
  ]

  // Chart data
  const revenueData = [
    { name: "Jan", revenue: 12000, orders: 240 },
    { name: "Feb", revenue: 19000, orders: 320 },
    { name: "Mar", revenue: 15000, orders: 280 },
    { name: "Apr", revenue: 22000, orders: 380 },
    { name: "May", revenue: 28000, orders: 420 },
    { name: "Jun", revenue: 35000, orders: 480 },
  ]

  const orderStatusData = [
    { name: "Completed", value: 1240, color: "#10b981" },
    { name: "Pending", value: 32, color: "#f59e0b" },
    { name: "Failed", value: 12, color: "#ef4444" },
  ]

  const recentOrders = [
    { id: 1001, service: "Instagram Followers", user: "John Doe", amount: "$25.00", status: "Completed", time: "2 mins ago" },
    { id: 1002, service: "YouTube Views", user: "Jane Smith", amount: "$45.00", status: "Completed", time: "15 mins ago" },
    { id: 1003, service: "Twitter Followers", user: "Mike Johnson", amount: "$18.00", status: "Pending", time: "32 mins ago" },
    { id: 1004, service: "Facebook Likes", user: "Sarah Williams", amount: "$32.00", status: "Completed", time: "1 hour ago" },
    { id: 1005, service: "TikTok Views", user: "Tom Brown", amount: "$28.00", status: "Completed", time: "2 hours ago" },
  ]

  const recentActivities = [
    { type: "user", message: "New user registered", user: "Alice Cooper", time: "5 mins ago" },
    { type: "order", message: "Order completed", order: "#1001", time: "12 mins ago" },
    { type: "payment", message: "Payment received", amount: "$125.00", time: "25 mins ago" },
    { type: "service", message: "New service added", service: "LinkedIn Connections", time: "1 hour ago" },
  ]

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Menu },
    { id: "users", label: "Users", icon: Users },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "services", label: "Services", icon: Settings },
    { id: "blogs", label: "Blogs", icon: FileText },
    { id: "api", label: "API Integration", icon: Settings },
  ]

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        navItems={navItems}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${darkMode ? "bg-slate-950" : "bg-gray-50"}`}>
        <Header
          darkMode={darkMode}
          setDarkMode={handleDarkModeChange}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-8">
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Welcome Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className={`text-4xl font-bold mb-2 ${darkMode ? "text-white" : "text-black"}`}>
                    Welcome Back! 👋
                  </h1>
                  <p className={`text-lg ${darkMode ? "text-slate-400" : "text-gray-600"}`}>
                    Here's what's happening with your SMM panel today.
                  </p>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${darkMode ? "bg-slate-800" : "bg-white border border-gray-200"}`}>
                  <Clock size={18} className={darkMode ? "text-slate-400" : "text-gray-500"} />
                  <span className={`text-sm ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                    {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                  </span>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <StatCard key={index} {...stat} darkMode={darkMode} />
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div
                  className={`${darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-gray-200"} border rounded-lg p-6`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-black"}`}>Revenue Overview</h3>
                      <p className={`text-sm ${darkMode ? "text-slate-400" : "text-gray-500"}`}>Last 6 months</p>
                    </div>
                    <TrendingUp className={darkMode ? "text-green-400" : "text-green-600"} size={24} />
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#334155" : "#e5e7eb"} />
                      <XAxis dataKey="name" stroke={darkMode ? "#94a3b8" : "#6b7280"} />
                      <YAxis stroke={darkMode ? "#94a3b8" : "#6b7280"} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: darkMode ? "#1e293b" : "#ffffff",
                          border: darkMode ? "1px solid #334155" : "1px solid #e5e7eb",
                          borderRadius: "8px",
                        }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Orders Chart */}
                <div
                  className={`${darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-gray-200"} border rounded-lg p-6`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-black"}`}>Order Status</h3>
                      <p className={`text-sm ${darkMode ? "text-slate-400" : "text-gray-500"}`}>Current status breakdown</p>
                    </div>
                    <Activity className={darkMode ? "text-blue-400" : "text-blue-600"} size={24} />
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={orderStatusData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#334155" : "#e5e7eb"} />
                      <XAxis dataKey="name" stroke={darkMode ? "#94a3b8" : "#6b7280"} />
                      <YAxis stroke={darkMode ? "#94a3b8" : "#6b7280"} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: darkMode ? "#1e293b" : "#ffffff",
                          border: darkMode ? "1px solid #334155" : "1px solid #e5e7eb",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {orderStatusData.map((entry, index) => (
                          <Bar key={index} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="mt-4 flex gap-4 justify-center">
                    {orderStatusData.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className={`text-sm ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                          {item.name}: {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Orders and Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div
                  className={`${darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-gray-200"} border rounded-lg p-6`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-black"}`}>Recent Orders</h3>
                    <button
                      className={`text-sm ${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"} flex items-center gap-1`}
                    >
                      View All
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className={`flex items-center justify-between p-4 rounded-lg border ${darkMode ? "bg-slate-800 border-slate-700" : "bg-gray-50 border-gray-200"} hover:shadow-md transition-shadow`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <p className={`font-semibold ${darkMode ? "text-white" : "text-black"}`}>
                              #{order.id}
                            </p>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                order.status === "Completed"
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <p className={`text-sm font-medium ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                            {order.service}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <p className={`text-xs ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                              {order.user}
                            </p>
                            <p className={`text-xs ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                              {order.time}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${darkMode ? "text-white" : "text-black"}`}>{order.amount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div
                  className={`${darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-gray-200"} border rounded-lg p-6`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-black"}`}>Recent Activity</h3>
                    <Activity className={darkMode ? "text-purple-400" : "text-purple-600"} size={24} />
                  </div>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            activity.type === "user"
                              ? "bg-blue-500/20 text-blue-400"
                              : activity.type === "order"
                              ? "bg-green-500/20 text-green-400"
                              : activity.type === "payment"
                              ? "bg-purple-500/20 text-purple-400"
                              : "bg-orange-500/20 text-orange-400"
                          }`}
                        >
                          {activity.type === "user" && <Users size={18} />}
                          {activity.type === "order" && <ShoppingCart size={18} />}
                          {activity.type === "payment" && <CreditCard size={18} />}
                          {activity.type === "service" && <Settings size={18} />}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${darkMode ? "text-white" : "text-black"}`}>
                            {activity.message}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {activity.user && (
                              <span className={`text-sm ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                                {activity.user}
                              </span>
                            )}
                            {activity.order && (
                              <span className={`text-sm ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                                {activity.order}
                              </span>
                            )}
                            {activity.amount && (
                              <span className={`text-sm font-semibold ${darkMode ? "text-green-400" : "text-green-600"}`}>
                                {activity.amount}
                              </span>
                            )}
                            {activity.service && (
                              <span className={`text-sm ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                                {activity.service}
                              </span>
                            )}
                            <span className={`text-xs ${darkMode ? "text-slate-500" : "text-gray-400"}`}>
                              • {activity.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && <UsersTable darkMode={darkMode} />}
          {activeTab === "orders" && <OrdersTable darkMode={darkMode} />}
          {activeTab === "payments" && <PaymentsTable darkMode={darkMode} />}
          {activeTab === "services" && <ServicesTable darkMode={darkMode} />}
          {activeTab === "blogs" && <BlogsTable darkMode={darkMode} />}
          {activeTab === "api" && <ApiIntegrations darkMode={darkMode} />}
        </main>
      </div>
    </div>
  )
}
