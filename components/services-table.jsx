"use client"

import { useState, useEffect } from "react"
import { Edit2, Trash2, Plus, DollarSign, Package, RefreshCw } from "lucide-react"
import Modal from "./modal"

export default function ServicesTable({ darkMode }) {
  // Load from localStorage or use defaults
  const loadFromStorage = (key, defaultValue) => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : defaultValue
    }
    return defaultValue
  }

  const saveToStorage = (key, value) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }

  const [categories, setCategories] = useState(() =>
    loadFromStorage("smm_categories", ["Instagram", "TikTok", "YouTube", "Twitter", "Facebook", "LinkedIn", "Pinterest", "Snapchat"])
  )
  
  // Providers - API se sync honge, manual add option remove
  const [providers, setProviders] = useState(() =>
    loadFromStorage("smm_providers", ["SMMPanel", "Buzzoid", "SocialBoost", "InstaFollowers", "SocialMediaMarket", "Custom API"])
  )

  const [services, setServices] = useState(() =>
    loadFromStorage("smm_services", [
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
  )

  // Save services to localStorage whenever they change
  useEffect(() => {
    saveToStorage("smm_services", services)
  }, [services])

  // Save categories to localStorage whenever they change
  useEffect(() => {
    saveToStorage("smm_categories", categories)
  }, [categories])

  // Save providers to localStorage whenever they change
  useEffect(() => {
    saveToStorage("smm_providers", providers)
  }, [providers])

  // API function to sync providers (ready for backend integration)
  const syncProvidersFromAPI = async () => {
    // TODO: Replace with actual API call
    // Example:
    // try {
    //   const response = await fetch('/api/providers')
    //   const data = await response.json()
    //   setProviders(data.providers)
    // } catch (error) {
    //   console.error('Failed to sync providers:', error)
    // }
    
    // For demo: Show message
    alert("Provider sync functionality ready for API integration.\n\nIn real project, this will fetch providers from your backend API.")
  }

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
      const updatedCategories = [...categories, newCategory.trim()]
      setCategories(updatedCategories)
      setNewCategory("")
      
      // TODO: In real project, save to backend API
      // Example:
      // await fetch('/api/categories', {
      //   method: 'POST',
      //   body: JSON.stringify({ name: newCategory.trim() })
      // })
    }
  }

  // Provider sync from API (manual add removed - API se sync hoga)
  const handleSyncProviders = () => {
    syncProvidersFromAPI()
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
    // Validate pricing tiers
    const validTiers = (formData.pricingTiers || []).filter((tier) => tier.quantity && tier.price)
    if (validTiers.length === 0) {
      alert("Please add at least one pricing tier. Click 'Manage Pricing' to add pricing tiers.")
      return
    }
    if (editingService) {
      setServices(
        services.map((s) =>
          s.id === editingService.id
            ? {
                ...formData,
                id: s.id,
                pricingTiers: validTiers,
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
        className={`${darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-gray-200"} border rounded-lg overflow-hidden overflow-x-auto`}
      >
        <table className="w-full min-w-[1000px]">
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
                  <div className="flex flex-col gap-2">
                    {service.pricingTiers?.length > 0 ? (
                      <>
                        {service.pricingTiers.slice(0, 2).map((tier, idx) => (
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
                        {service.pricingTiers.length > 2 && (
                          <span className={`text-xs ${darkMode ? "text-slate-500" : "text-gray-500"}`}>
                            +{service.pricingTiers.length - 2} more
                          </span>
                        )}
                      </>
                    ) : (
                      <span className={`text-xs ${darkMode ? "text-slate-500" : "text-gray-500"}`}>No pricing set</span>
                    )}
                    <button
                      onClick={() => {
                        const pricingData = {
                          ...service,
                          pricingTiers: service.pricingTiers && service.pricingTiers.length > 0 
                            ? service.pricingTiers 
                            : [{ quantity: "", price: "", discount: 0 }],
                        }
                        setEditingPricingService(pricingData)
                        setShowPricingModal(true)
                      }}
                      className={`text-xs px-2 py-1 rounded border ${
                        darkMode
                          ? "border-blue-500/50 text-blue-400 hover:bg-blue-500/20"
                          : "border-blue-300 text-blue-600 hover:bg-blue-50"
                      } transition-colors mt-1`}
                    >
                      Manage Pricing
                    </button>
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
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                Category <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${
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
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
                    className={`flex-1 px-3 py-2 rounded-lg border text-sm ${
                      darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="New category"
                  />
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className={`px-3 py-2 rounded-lg border shrink-0 ${
                      darkMode ? "bg-slate-700 border-slate-600 text-white hover:bg-slate-600" : "bg-gray-100 border-gray-300 text-black hover:bg-gray-200"
                    } transition-colors`}
                    title="Add Category"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                Provider <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
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
                  <button
                    type="button"
                    onClick={handleSyncProviders}
                    className={`px-3 py-2 rounded-lg border shrink-0 ${
                      darkMode ? "bg-blue-600 border-blue-500 text-white hover:bg-blue-700" : "bg-blue-600 border-blue-500 text-white hover:bg-blue-700"
                    } transition-colors flex items-center justify-center`}
                    title="Sync Providers from API"
                  >
                    <RefreshCw size={16} />
                  </button>
                </div>
                <p className={`text-xs ${darkMode ? "text-slate-500" : "text-gray-500"}`}>
                  Providers are synced from API. Click refresh to sync latest providers.
                </p>
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

          {/* Pricing Tiers Section in Form */}
          <div className="border-t pt-4 mt-4">
            <div className="flex items-center justify-between mb-4">
              <label className={`block text-sm font-medium ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                Pricing Tiers <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => {
                  const pricingData = {
                    ...formData,
                    id: editingService?.id || 0,
                    pricingTiers: formData.pricingTiers && formData.pricingTiers.length > 0 && formData.pricingTiers[0].quantity
                      ? formData.pricingTiers
                      : [{ quantity: "", price: "", discount: 0 }],
                  }
                  setEditingPricingService(pricingData)
                  setShowPricingModal(true)
                }}
                className={`text-sm px-3 py-1 rounded border ${
                  darkMode
                    ? "border-blue-500/50 text-blue-400 hover:bg-blue-500/20"
                    : "border-blue-300 text-blue-600 hover:bg-blue-50"
                } transition-colors flex items-center gap-1`}
              >
                <DollarSign size={14} />
                Manage Pricing
              </button>
            </div>
            {formData.pricingTiers && formData.pricingTiers.length > 0 && formData.pricingTiers[0].quantity && formData.pricingTiers[0].price ? (
              <div className={`p-3 rounded-lg ${darkMode ? "bg-slate-800" : "bg-gray-50"} space-y-2 max-h-40 overflow-y-auto`}>
                {formData.pricingTiers
                  .filter((tier) => tier.quantity && tier.price)
                  .map((tier, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <Package size={14} className={darkMode ? "text-slate-400" : "text-gray-500"} />
                      <span className={darkMode ? "text-slate-300" : "text-gray-700"}>
                        {tier.quantity.toLocaleString()} units = ${tier.price}
                        {tier.discount > 0 && ` (${tier.discount}% off)`}
                      </span>
                    </div>
                  ))}
              </div>
            ) : (
              <div className={`p-3 rounded-lg border border-dashed ${darkMode ? "border-slate-700" : "border-gray-300"}`}>
                <p className={`text-sm text-center ${darkMode ? "text-slate-500" : "text-gray-500"}`}>
                  No pricing tiers added. Click "Manage Pricing" to add pricing tiers.
                </p>
              </div>
            )}
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

      {/* Pricing Tiers Modal */}
      <Modal
        isOpen={showPricingModal}
        onClose={() => {
          setShowPricingModal(false)
          setEditingPricingService(null)
        }}
        title={editingPricingService ? `Manage Pricing - ${editingPricingService.name || "Service"}` : "Manage Pricing Tiers"}
        darkMode={darkMode}
        size="lg"
      >
        {editingPricingService && (
          <div className="space-y-4">
            <div className={`p-3 rounded-lg ${darkMode ? "bg-blue-500/10 border-blue-500/30" : "bg-blue-50 border-blue-200"} border mb-4`}>
              <p className={`text-sm font-medium mb-2 ${darkMode ? "text-blue-300" : "text-blue-700"}`}>
                📝 How to add pricing tiers:
              </p>
              <ul className={`text-xs space-y-1 ${darkMode ? "text-blue-400" : "text-blue-600"} list-disc list-inside`}>
                <li>Enter quantity (e.g., 100, 500, 1000, 5000)</li>
                <li>Enter price for that quantity (e.g., 2.99, 9.99, 15.99)</li>
                <li>Optionally add discount percentage (0-100)</li>
                <li>Click "Add New Pricing Tier" button to add more tiers</li>
              </ul>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {((editingPricingService.pricingTiers && editingPricingService.pricingTiers.length > 0) 
                ? editingPricingService.pricingTiers 
                : [{ quantity: "", price: "", discount: 0 }]).map((tier, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${darkMode ? "bg-slate-800 border-slate-700" : "bg-gray-50 border-gray-200"}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className={`font-medium ${darkMode ? "text-white" : "text-black"}`}>Tier {index + 1}</h4>
                    {(editingPricingService.pricingTiers || []).length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newTiers = [...(editingPricingService.pricingTiers || [])]
                          newTiers.splice(index, 1)
                          setEditingPricingService({ ...editingPricingService, pricingTiers: newTiers })
                        }}
                        className={`text-xs px-2 py-1 rounded ${darkMode ? "text-red-400 hover:bg-red-500/20" : "text-red-600 hover:bg-red-50"}`}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${darkMode ? "text-slate-400" : "text-gray-600"}`}>
                        Quantity
                      </label>
                      <input
                        type="number"
                        value={tier.quantity || ""}
                        onChange={(e) => {
                          const newTiers = [...(editingPricingService.pricingTiers || [])]
                          newTiers[index].quantity = parseInt(e.target.value) || 0
                          setEditingPricingService({ ...editingPricingService, pricingTiers: newTiers })
                        }}
                        className={`w-full px-3 py-2 rounded border text-sm ${
                          darkMode ? "bg-slate-900 border-slate-600 text-white" : "bg-white border-gray-300 text-black"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="100"
                        min="1"
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${darkMode ? "text-slate-400" : "text-gray-600"}`}>
                        Price ($)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={tier.price || ""}
                        onChange={(e) => {
                          const newTiers = [...(editingPricingService.pricingTiers || [])]
                          newTiers[index].price = parseFloat(e.target.value) || 0
                          setEditingPricingService({ ...editingPricingService, pricingTiers: newTiers })
                        }}
                        className={`w-full px-3 py-2 rounded border text-sm ${
                          darkMode ? "bg-slate-900 border-slate-600 text-white" : "bg-white border-gray-300 text-black"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="2.99"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${darkMode ? "text-slate-400" : "text-gray-600"}`}>
                        Discount (%)
                      </label>
                      <input
                        type="number"
                        value={tier.discount || 0}
                        onChange={(e) => {
                          const newTiers = [...(editingPricingService.pricingTiers || [])]
                          newTiers[index].discount = parseInt(e.target.value) || 0
                          setEditingPricingService({ ...editingPricingService, pricingTiers: newTiers })
                        }}
                        className={`w-full px-3 py-2 rounded border text-sm ${
                          darkMode ? "bg-slate-900 border-slate-600 text-white" : "bg-white border-gray-300 text-black"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="0"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Package size={14} className={darkMode ? "text-slate-500" : "text-gray-400"} />
                    <span className={`text-xs ${darkMode ? "text-slate-400" : "text-gray-600"}`}>
                      {tier.quantity || "?"} units = ${tier.price || "0.00"}
                      {tier.discount > 0 && ` (${tier.discount}% discount)`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                const newTiers = [...(editingPricingService.pricingTiers || []), { quantity: "", price: "", discount: 0 }]
                setEditingPricingService({ ...editingPricingService, pricingTiers: newTiers })
              }}
              className={`w-full py-2 rounded-lg border border-dashed ${
                darkMode ? "border-slate-600 text-slate-400 hover:border-slate-500" : "border-gray-300 text-gray-600 hover:border-gray-400"
              } transition-colors flex items-center justify-center gap-2`}
            >
              <Plus size={16} />
              Add New Pricing Tier
            </button>
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-700">
              <button
                onClick={() => {
                  // Validate pricing tiers
                  const validTiers = (editingPricingService.pricingTiers || []).filter(
                    (tier) => tier.quantity && tier.price
                  )
                  if (validTiers.length === 0) {
                    alert("Please add at least one pricing tier with quantity and price")
                    return
                  }

                  // Update formData with pricing tiers if we're in add/edit modal
                  if (showModal) {
                    setFormData({ ...formData, pricingTiers: validTiers })
                  }

                  // If editing existing service, update it in services list
                  if (editingPricingService.id && editingPricingService.id > 0) {
                    setServices(
                      services.map((s) =>
                        s.id === editingPricingService.id ? { ...s, pricingTiers: validTiers } : s
                      )
                    )
                  }

                  setShowPricingModal(false)
                  setEditingPricingService(null)
                }}
                className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors font-medium text-sm sm:text-base"
              >
                Save Pricing
              </button>
              <button
                onClick={() => {
                  setShowPricingModal(false)
                  setEditingPricingService(null)
                }}
                className={`w-full sm:flex-1 px-4 py-2.5 rounded-lg transition-colors font-medium text-sm sm:text-base ${
                  darkMode ? "bg-slate-800 text-white hover:bg-slate-700" : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
