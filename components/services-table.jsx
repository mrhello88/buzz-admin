"use client"

import { useState } from "react"
import { Edit2, Trash2, Plus, DollarSign, Package } from "lucide-react"
import Modal from "./modal"

export default function ServicesTable({ darkMode }) {
  const [categories, setCategories] = useState(["Instagram", "TikTok", "YouTube", "Twitter", "Facebook", "LinkedIn", "Pinterest", "Snapchat"])
  const [providers, setProviders] = useState(["SMMPanel", "Buzzoid", "SocialBoost", "InstaFollowers", "SocialMediaMarket", "Custom API"])

  const [services, setServices] = useState([
    {
      id: 1,
      serviceId: "IG-FOLLOWERS-001",
      name: "Instagram Followers",
      description: "Real Instagram followers",
      category: "Instagram",
      provider: "SMMPanel",
      status: "Active",
      pricingTiers: [
        { quantity: 100, price: 2.99, discount: 0 },
        { quantity: 500, price: 9.99, discount: 33 },
        { quantity: 1000, price: 15.99, discount: 47 },
        { quantity: 5000, price: 69.99, discount: 53 },
        { quantity: 10000, price: 129.99, discount: 57 },
      ],
    },
    {
      id: 2,
      serviceId: "IG-LIKES-002",
      name: "Instagram Likes",
      description: "Instant likes on posts",
      category: "Instagram",
      provider: "Buzzoid",
      status: "Active",
      pricingTiers: [
        { quantity: 100, price: 1.99, discount: 0 },
        { quantity: 500, price: 6.99, discount: 30 },
        { quantity: 1000, price: 11.99, discount: 40 },
        { quantity: 5000, price: 49.99, discount: 50 },
        { quantity: 10000, price: 89.99, discount: 55 },
      ],
    },
    {
      id: 3,
      serviceId: "TT-VIEWS-003",
      name: "TikTok Views",
      description: "High-quality TikTok views",
      category: "TikTok",
      provider: "SocialBoost",
      status: "Active",
      pricingTiers: [
        { quantity: 1000, price: 4.99, discount: 0 },
        { quantity: 5000, price: 19.99, discount: 20 },
        { quantity: 10000, price: 34.99, discount: 30 },
        { quantity: 50000, price: 149.99, discount: 40 },
        { quantity: 100000, price: 279.99, discount: 44 },
      ],
    },
    {
      id: 4,
      serviceId: "YT-SUBS-004",
      name: "YouTube Subscribers",
      description: "Real YouTube subscribers",
      category: "YouTube",
      provider: "InstaFollowers",
      status: "Active",
      pricingTiers: [
        { quantity: 100, price: 9.99, discount: 0 },
        { quantity: 500, price: 39.99, discount: 20 },
        { quantity: 1000, price: 69.99, discount: 30 },
        { quantity: 5000, price: 299.99, discount: 40 },
        { quantity: 10000, price: 549.99, discount: 45 },
      ],
    },
    {
      id: 5,
      serviceId: "TW-FOLLOWERS-005",
      name: "Twitter Followers",
      description: "Active Twitter followers",
      category: "Twitter",
      provider: "SocialMediaMarket",
      status: "Active",
      pricingTiers: [
        { quantity: 100, price: 2.99, discount: 0 },
        { quantity: 500, price: 11.99, discount: 20 },
        { quantity: 1000, price: 19.99, discount: 33 },
        { quantity: 5000, price: 79.99, discount: 47 },
        { quantity: 10000, price: 139.99, discount: 53 },
      ],
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [formData, setFormData] = useState({
    serviceId: "",
    name: "",
    description: "",
    category: "",
    provider: "",
    status: "Active",
    pricingTiers: [{ quantity: "", price: "", discount: 0 }],
  })
  const [newCategory, setNewCategory] = useState("")
  const [newProvider, setNewProvider] = useState("")
  const [showPricingModal, setShowPricingModal] = useState(false)
  const [editingPricingService, setEditingPricingService] = useState(null)

  const handleAdd = () => {
    setEditingService(null)
    setFormData({
      serviceId: "",
      name: "",
      description: "",
      category: "",
      provider: "",
      status: "Active",
      pricingTiers: [{ quantity: "", price: "", discount: 0 }],
    })
    setShowModal(true)
  }

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()])
      setNewCategory("")
    }
  }

  const handleAddProvider = () => {
    if (newProvider.trim() && !providers.includes(newProvider.trim())) {
      setProviders([...providers, newProvider.trim()])
      setNewProvider("")
    }
  }

  const handleEdit = (service) => {
    setEditingService(service)
    setFormData({
      serviceId: service.serviceId || "",
      name: service.name,
      description: service.description,
      category: service.category,
      provider: service.provider || "",
      status: service.status,
      pricingTiers: service.pricingTiers || [{ quantity: 100, price: 0, discount: 0 }],
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    setServices(services.filter((s) => s.id !== id))
  }

  const handleSave = () => {
    if (!formData.serviceId || !formData.name || !formData.category || !formData.provider) {
      alert("Please fill in Service ID, Name, Category, and Provider")
      return
    }
            if (editingService) {
      setServices(
        services.map((s) =>
          s.id === editingService.id
            ? {
                ...formData,
                id: s.id,
                pricingTiers: formData.pricingTiers || [{ quantity: 100, price: 0, discount: 0 }],
              }
            : s
        )
      )
    } else {
      setServices([
        ...services,
        {
          ...formData,
          id: Math.max(...services.map((s) => s.id), 0) + 1,
          pricingTiers: formData.pricingTiers || [{ quantity: 100, price: 0, discount: 0 }],
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
                Pricing Tiers
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
                <td className={`px-6 py-4 font-mono text-sm ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                  {service.serviceId || "N/A"}
                </td>
                <td className={`px-6 py-4 font-medium ${darkMode ? "text-white" : "text-black"}`}>{service.name}</td>
                <td className={`px-6 py-4 ${darkMode ? "text-slate-400" : "text-gray-600"}`}>{service.category}</td>
                <td className={`px-6 py-4 ${darkMode ? "text-purple-400" : "text-purple-600"}`}>
                  <span className="px-2 py-1 rounded text-xs font-medium bg-purple-500/20">{service.provider || "N/A"}</span>
                </td>
                <td className={`px-6 py-4 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                  <div className="flex flex-col gap-1">
                    {service.pricingTiers?.slice(0, 3).map((tier, idx) => (
                      <div key={idx} className="text-sm">
                        <span className="font-semibold">{tier.quantity.toLocaleString()}:</span>{" "}
                        <span className={`${darkMode ? "text-green-400" : "text-green-600"}`}>${tier.price}</span>
                        {tier.discount > 0 && (
                          <span className={`ml-2 text-xs ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                            ({tier.discount}% off)
                          </span>
                        )}
                      </div>
                    ))}
                    {service.pricingTiers?.length > 3 && (
                      <button
                        onClick={() => {
                          setEditingPricingService(service)
                          setShowPricingModal(true)
                        }}
                        className={`text-xs ${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"} mt-1`}
                      >
                        +{service.pricingTiers.length - 3} more tiers
                      </button>
                    )}
                  </div>
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
              Service ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.serviceId}
              onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border font-mono ${
                darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="e.g., IG-FOLLOWERS-001"
              required
            />
            <p className={`text-xs mt-1 ${darkMode ? "text-slate-500" : "text-gray-500"}`}>
              Unique identifier for API integration (required)
            </p>
          </div>
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
                Category <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={`flex-1 px-4 py-2 rounded-lg border ${
                    darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
                  className={`w-32 px-3 py-2 rounded-lg border text-sm ${
                    darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="New category"
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className={`px-3 py-2 rounded-lg border ${
                    darkMode ? "bg-slate-700 border-slate-600 text-white hover:bg-slate-600" : "bg-gray-100 border-gray-300 text-black hover:bg-gray-200"
                  } transition-colors`}
                  title="Add Category"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                Provider <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  value={formData.provider}
                  onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                  className={`flex-1 px-4 py-2 rounded-lg border ${
                    darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                >
                  <option value="">Select Provider</option>
                  {providers.map((prov) => (
                    <option key={prov} value={prov}>
                      {prov}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={newProvider}
                  onChange={(e) => setNewProvider(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddProvider()}
                  className={`w-32 px-3 py-2 rounded-lg border text-sm ${
                    darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="New provider"
                />
                <button
                  type="button"
                  onClick={handleAddProvider}
                  className={`px-3 py-2 rounded-lg border ${
                    darkMode ? "bg-slate-700 border-slate-600 text-white hover:bg-slate-600" : "bg-gray-100 border-gray-300 text-black hover:bg-gray-200"
                  } transition-colors`}
                  title="Add Provider"
                >
                  <Plus size={16} />
                </button>
              </div>
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
