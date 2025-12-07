"use client"

import { useState } from "react"
import { Copy, Eye, EyeOff, Plus, Trash2 } from "lucide-react"

export default function ApiIntegrations({ darkMode }) {
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: "JustAnotherPanel", key: "jap_1234567890abcdef", status: "Active", created: "2024-01-15" },
    { id: 2, name: "Peakerr", key: "peakerr_abcdef1234567890", status: "Active", created: "2024-02-20" },
    { id: 3, name: "SMM Provider", key: "smm_xyz9876543210", status: "Inactive", created: "2024-01-10" },
  ])

  const [showKeys, setShowKeys] = useState({})
  const [copied, setCopied] = useState(null)

  const toggleKeyVisibility = (id) => {
    setShowKeys((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const copyToClipboard = (key, id) => {
    navigator.clipboard.writeText(key)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const deleteKey = (id) => {
    setApiKeys(apiKeys.filter((k) => k.id !== id))
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-black"}`}>API Integrations</h2>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            <Plus size={18} /> Add API Key
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {apiKeys.map((api) => (
            <div
              key={api.id}
              className={`${darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-gray-200"} border rounded-lg p-6`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-black"}`}>{api.name}</h3>
                  <p className={`text-sm ${darkMode ? "text-slate-400" : "text-gray-600"}`}>Created: {api.created}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${api.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                >
                  {api.status}
                </span>
              </div>

              <div
                className={`flex items-center gap-2 p-3 rounded-lg ${darkMode ? "bg-slate-800" : "bg-gray-100"} mb-4`}
              >
                <code className={`flex-1 font-mono text-sm ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                  {showKeys[api.id] ? api.key : "•".repeat(api.key.length)}
                </code>
                <button
                  onClick={() => toggleKeyVisibility(api.id)}
                  className={`p-2 rounded transition-colors ${darkMode ? "hover:bg-slate-700" : "hover:bg-gray-200"}`}
                >
                  {showKeys[api.id] ? (
                    <EyeOff size={18} className={darkMode ? "text-slate-400" : "text-gray-600"} />
                  ) : (
                    <Eye size={18} className={darkMode ? "text-slate-400" : "text-gray-600"} />
                  )}
                </button>
                <button
                  onClick={() => copyToClipboard(api.key, api.id)}
                  className={`p-2 rounded transition-colors ${darkMode ? "hover:bg-slate-700" : "hover:bg-gray-200"}`}
                >
                  <Copy
                    size={18}
                    className={copied === api.id ? "text-green-400" : darkMode ? "text-slate-400" : "text-gray-600"}
                  />
                </button>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium">
                  Test Connection
                </button>
                <button
                  onClick={() => deleteKey(api.id)}
                  className={`p-2 rounded-lg transition-colors ${darkMode ? "bg-slate-800 text-red-400 hover:bg-slate-700" : "bg-gray-100 text-red-600 hover:bg-gray-200"}`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Documentation */}
      <div
        className={`${darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-gray-200"} border rounded-lg p-6`}
      >
        <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-black"}`}>API Documentation</h3>
        <div className={`space-y-3 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
          <p>
            <strong>Base URL:</strong> https://api.smmpanel.com/v1
          </p>
          <p>
            <strong>Authentication:</strong> Bearer Token in Authorization header
          </p>
          <p>
            <strong>Rate Limit:</strong> 1000 requests per hour
          </p>
          <p>
            <strong>Response Format:</strong> JSON
          </p>
        </div>
      </div>
    </div>
  )
}
