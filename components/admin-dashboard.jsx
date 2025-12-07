"use client"

import { useState } from "react"
import { Menu, Users, ShoppingCart, CreditCard, Settings, FileText } from "lucide-react"
import StatCard from "./stat-card"
import UsersTable from "./users-table"
import OrdersTable from "./orders-table"
import PaymentsTable from "./payments-table"
import ApiIntegrations from "./api-integrations"
import ServicesTable from "./services-table"
import BlogsTable from "./blogs-table"
import Sidebar from "./sidebar"
import Header from "./header"

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
      />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${darkMode ? "bg-slate-950" : "bg-gray-50"}`}>
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

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
          {activeTab === "blogs" && <BlogsTable darkMode={darkMode} />}
          {activeTab === "api" && <ApiIntegrations darkMode={darkMode} />}
        </main>
      </div>
    </div>
  )
}
