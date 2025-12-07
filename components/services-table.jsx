"use client"

import { useState } from "react"
import { Edit2, Trash2, Plus } from "lucide-react"
import Modal from "./modal"

export default function ServicesTable({ darkMode }) {
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Instagram Followers",
      description: "Real Instagram followers",
      price: 9.99,
      category: "Instagram",
      status: "Active",
    },
    {
      id: 2,
      name: "Instagram Likes",
      description: "Instant likes on posts",
      price: 4.99,
      category: "Instagram",
      status: "Active",
    },
    {
      id: 3,
      name: "TikTok Views",
      description: "High-quality TikTok views",
      price: 7.99,
      category: "TikTok",
      status: "Active",
    },
    {
      id: 4,
      name: "YouTube Subscribers",
      description: "Real YouTube subscribers",
      price: 19.99,
      category: "YouTube",
      status: "Inactive",
    },
    {
      id: 5,
      name: "Twitter Followers",
      description: "Active Twitter followers",
      price: 5.99,
      category: "Twitter",
      status: "Active",
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [formData, setFormData] = useState({ name: "", description: "", price: "", category: "", status: "Active" })

  const handleAdd = () => {
    setEditingService(null)
    setFormData({ name: "", description: "", price: "", category: "", status: "Active" })
    setShowModal(true)
  }

  const handleEdit = (service) => {
    setEditingService(service)
    setFormData(service)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    setServices(services.filter((s) => s.id !== id))
  }

  const handleSave = () => {
    if (editingService) {
      setServices(services.map((s) => (s.id === editingService.id ? { ...formData, id: s.id } : s)))
    } else {
      setServices([
        ...services,
        {
          ...formData,
          id: Math.max(...services.map((s) => s.id), 0) + 1,
        },
      ])
    }
    setShowModal(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-black"}`}>Services Management</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} /> Add Service
        </button>
      </div>

      <div
        className={`${darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-gray-200"} border rounded-lg overflow-hidden`}
      >
        <table className="w-full">
          <thead
            className={`${darkMode ? "bg-slate-800" : "bg-gray-50"} border-b ${darkMode ? "border-slate-700" : "border-gray-200"}`}
          >
            <tr>
              <th
                className={`px-6 py-3 text-left text-sm font-semibold ${darkMode ? "text-slate-300" : "text-gray-700"}`}
              >
                Service Name
              </th>
              <th
                className={`px-6 py-3 text-left text-sm font-semibold ${darkMode ? "text-slate-300" : "text-gray-700"}`}
              >
                Description
              </th>
              <th
                className={`px-6 py-3 text-left text-sm font-semibold ${darkMode ? "text-slate-300" : "text-gray-700"}`}
              >
                Category
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
            {services.map((service) => (
              <tr
                key={service.id}
                className={`border-b ${darkMode ? "border-slate-700 hover:bg-slate-800" : "border-gray-200 hover:bg-gray-50"} transition-colors`}
              >
                <td className={`px-6 py-4 font-medium ${darkMode ? "text-white" : "text-black"}`}>{service.name}</td>
                <td className={`px-6 py-4 ${darkMode ? "text-slate-400" : "text-gray-600"}`}>{service.description}</td>
                <td className={`px-6 py-4 ${darkMode ? "text-slate-400" : "text-gray-600"}`}>{service.category}</td>
                <td className={`px-6 py-4 font-semibold ${darkMode ? "text-green-400" : "text-green-600"}`}>
                  ${service.price}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${service.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                  >
                    {service.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className={`p-2 rounded-lg transition-colors ${darkMode ? "bg-slate-800 text-blue-400 hover:bg-slate-700" : "bg-gray-100 text-blue-600 hover:bg-gray-200"}`}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
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
        title={editingService ? "Edit Service" : "Add Service"}
        darkMode={darkMode}
      >
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
              Service Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="e.g., Instagram Followers"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Service description"
              rows="3"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Select Category</option>
                <option>Instagram</option>
                <option>TikTok</option>
                <option>YouTube</option>
                <option>Twitter</option>
                <option>Facebook</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                Price ($)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="0.00"
                step="0.01"
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
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Save
            </button>
            <button
              onClick={() => setShowModal(false)}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors font-medium ${darkMode ? "bg-slate-800 text-white hover:bg-slate-700" : "bg-gray-200 text-black hover:bg-gray-300"}`}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
