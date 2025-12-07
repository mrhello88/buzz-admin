"use client"

import { useState } from "react"
import { Edit2, Trash2, Plus } from "lucide-react"
import Modal from "./modal"

export default function OrdersTable({ darkMode }) {
  const [orders, setOrders] = useState([
    {
      id: 1001,
      user: "John Doe",
      email: "john@example.com",
      service: "Instagram Followers",
      quantity: 1000,
      price: "$50",
      status: "Completed",
      date: "2024-03-15",
      socialLink: "https://instagram.com/johndoe",
    },
    {
      id: 1002,
      user: "Jane Smith",
      email: "jane@example.com",
      service: "TikTok Likes",
      quantity: 5000,
      price: "$75",
      status: "Processing",
      date: "2024-03-16",
      socialLink: "https://tiktok.com/@janesmith",
    },
    {
      id: 1003,
      user: "Mike Johnson",
      email: "mike@example.com",
      service: "YouTube Views",
      quantity: 10000,
      price: "$120",
      status: "Pending",
      date: "2024-03-17",
      socialLink: "https://youtube.com/@mikejohnson",
    },
    {
      id: 1004,
      user: "Sarah Williams",
      email: "sarah@example.com",
      service: "Instagram Likes",
      quantity: 2000,
      price: "$40",
      status: "Completed",
      date: "2024-03-18",
      socialLink: "https://instagram.com/sarahwilliams",
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingOrder, setEditingOrder] = useState(null)
  const [formData, setFormData] = useState({
    user: "",
    email: "",
    service: "",
    quantity: "",
    price: "",
    status: "Pending",
    socialLink: "",
  })

  const handleAdd = () => {
    setEditingOrder(null)
    setFormData({ user: "", email: "", service: "", quantity: "", price: "", status: "Pending", socialLink: "" })
    setShowModal(true)
  }

  const handleEdit = (order) => {
    setEditingOrder(order)
    setFormData(order)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    setOrders(orders.filter((o) => o.id !== id))
  }

  const handleSave = () => {
    if (editingOrder) {
      setOrders(orders.map((o) => (o.id === editingOrder.id ? { ...formData, id: o.id, date: o.date } : o)))
    } else {
      setOrders([
        ...orders,
        { ...formData, id: Math.max(...orders.map((o) => o.id), 0) + 1, date: new Date().toISOString().split("T")[0] },
      ])
    }
    setShowModal(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/20 text-green-400"
      case "Processing":
        return "bg-blue-500/20 text-blue-400"
      case "Pending":
        return "bg-yellow-500/20 text-yellow-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className={`text-xl sm:text-2xl font-bold ${darkMode ? "text-white" : "text-black"}`}>Orders Management</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors w-full sm:w-auto"
        >
          <Plus size={18} /> Add Order
        </button>
      </div>

      <div
        className={`${darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-gray-200"} border rounded-lg overflow-hidden overflow-x-auto`}
      >
        <table className="w-full min-w-[800px]">
          <thead
            className={`${darkMode ? "bg-slate-800" : "bg-gray-50"} border-b ${darkMode ? "border-slate-700" : "border-gray-200"}`}
          >
            <tr>
              <th
                className={`px-6 py-3 text-left text-sm font-semibold ${darkMode ? "text-slate-300" : "text-gray-700"}`}
              >
                Order ID
              </th>
              <th
                className={`px-6 py-3 text-left text-sm font-semibold ${darkMode ? "text-slate-300" : "text-gray-700"}`}
              >
                User
              </th>
              <th
                className={`px-6 py-3 text-left text-sm font-semibold ${darkMode ? "text-slate-300" : "text-gray-700"}`}
              >
                Email
              </th>
              <th
                className={`px-6 py-3 text-left text-sm font-semibold ${darkMode ? "text-slate-300" : "text-gray-700"}`}
              >
                Service
              </th>
              <th
                className={`px-6 py-3 text-left text-sm font-semibold ${darkMode ? "text-slate-300" : "text-gray-700"}`}
              >
                Social Link
              </th>
              <th
                className={`px-6 py-3 text-left text-sm font-semibold ${darkMode ? "text-slate-300" : "text-gray-700"}`}
              >
                Quantity
              </th>
              <th
                className={`px-6 py-3 text-left text-sm font-semibold ${darkMode ? "text-slate-300" : "text-gray-700"}`}
              >
                Price
              </th>
              <th
                className={`px-6 py-3 text-left text-sm font-semibold ${darkMode ? "text-slate-300" : "text-gray-700"}`}
              >
                Status
              </th>
              <th
                className={`px-6 py-3 text-left text-sm font-semibold ${darkMode ? "text-slate-300" : "text-gray-700"}`}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className={`border-b ${darkMode ? "border-slate-700 hover:bg-slate-800" : "border-gray-200 hover:bg-gray-50"} transition-colors`}
              >
                <td className={`px-6 py-4 font-medium ${darkMode ? "text-white" : "text-black"}`}>#{order.id}</td>
                <td className={`px-6 py-4 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>{order.user}</td>
                <td className={`px-6 py-4 ${darkMode ? "text-slate-400" : "text-gray-600"}`}>{order.email}</td>
                <td className={`px-6 py-4 ${darkMode ? "text-slate-400" : "text-gray-600"}`}>{order.service}</td>
                <td className={`px-6 py-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                  <a href={order.socialLink} target="_blank" rel="noopener noreferrer" className="hover:underline truncate block max-w-xs">
                    {order.socialLink}
                  </a>
                </td>
                <td className={`px-6 py-4 ${darkMode ? "text-white" : "text-black"}`}>{order.quantity}</td>
                <td className={`px-6 py-4 font-medium ${darkMode ? "text-white" : "text-black"}`}>{order.price}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(order)}
                    className={`p-2 rounded-lg transition-colors ${darkMode ? "bg-slate-800 text-blue-400 hover:bg-slate-700" : "bg-gray-100 text-blue-600 hover:bg-gray-200"}`}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className={`p-2 rounded-lg transition-colors ${darkMode ? "bg-slate-800 text-red-400 hover:bg-slate-700" : "bg-gray-100 text-red-600 hover:bg-gray-200"}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingOrder ? "Edit Order" : "Add Order"}
        darkMode={darkMode}
      >
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
              User Name
            </label>
            <input
              type="text"
              value={formData.user}
              onChange={(e) => setFormData({ ...formData, user: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter user name"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="user@example.com"
              required
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
              Social Media Link <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              value={formData.socialLink}
              onChange={(e) => setFormData({ ...formData, socialLink: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="https://instagram.com/username"
              required
            />
            <p className={`text-xs mt-1 ${darkMode ? "text-slate-500" : "text-gray-500"}`}>
              Enter the social media profile URL where service will be applied
            </p>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
              Service
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option>Instagram Followers</option>
              <option>TikTok Likes</option>
              <option>YouTube Views</option>
              <option>Instagram Likes</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                Quantity
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                Price
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option>Pending</option>
              <option>Processing</option>
              <option>Completed</option>
            </select>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-700/50">
            <button
              onClick={handleSave}
              className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors font-medium text-sm sm:text-base"
            >
              Save
            </button>
            <button
              onClick={() => setShowModal(false)}
              className={`w-full sm:flex-1 px-4 py-2.5 rounded-lg transition-colors font-medium text-sm sm:text-base ${darkMode ? "bg-slate-800 text-white hover:bg-slate-700" : "bg-gray-200 text-black hover:bg-gray-300"}`}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
