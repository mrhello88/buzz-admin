"use client"

import { useState } from "react"
import { Edit2, Trash2, Plus } from "lucide-react"
import Modal from "./modal"

export default function UsersTable({ darkMode }) {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active", joinDate: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Active", joinDate: "2024-02-20" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", status: "Inactive", joinDate: "2024-01-10" },
    { id: 4, name: "Sarah Williams", email: "sarah@example.com", status: "Active", joinDate: "2024-03-05" },
    { id: 5, name: "Tom Brown", email: "tom@example.com", status: "Active", joinDate: "2024-02-28" },
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({ name: "", email: "", status: "Active" })

  const handleAdd = () => {
    setEditingUser(null)
    setFormData({ name: "", email: "", status: "Active" })
    setShowModal(true)
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setFormData(user)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id))
  }

  const handleSave = () => {
    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...formData, id: u.id, joinDate: u.joinDate } : u)))
    } else {
      setUsers([
        ...users,
        {
          ...formData,
          id: Math.max(...users.map((u) => u.id), 0) + 1,
          joinDate: new Date().toISOString().split("T")[0],
        },
      ])
    }
    setShowModal(false)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className={`text-xl sm:text-2xl font-bold ${darkMode ? "text-white" : "text-black"}`}>Users Management</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors w-full sm:w-auto"
        >
          <Plus size={18} /> Add User
        </button>
      </div>

      <div
        className={`${darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-gray-200"} border rounded-lg overflow-hidden overflow-x-auto`}
      >
        <table className="w-full min-w-[600px]">
          <thead
            className={`${darkMode ? "bg-slate-800" : "bg-gray-50"} border-b ${darkMode ? "border-slate-700" : "border-gray-200"}`}
          >
            <tr>
              <th
                className={`px-6 py-3 text-left text-sm font-semibold ${darkMode ? "text-slate-300" : "text-gray-700"}`}
              >
                Name
              </th>
              <th
                className={`px-6 py-3 text-left text-sm font-semibold ${darkMode ? "text-slate-300" : "text-gray-700"}`}
              >
                Email
              </th>
              <th
                className={`px-6 py-3 text-left text-sm font-semibold ${darkMode ? "text-slate-300" : "text-gray-700"}`}
              >
                Status
              </th>
              <th
                className={`px-6 py-3 text-left text-sm font-semibold ${darkMode ? "text-slate-300" : "text-gray-700"}`}
              >
                Join Date
              </th>
              <th
                className={`px-6 py-3 text-left text-sm font-semibold ${darkMode ? "text-slate-300" : "text-gray-700"}`}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className={`border-b ${darkMode ? "border-slate-700 hover:bg-slate-800" : "border-gray-200 hover:bg-gray-50"} transition-colors`}
              >
                <td className={`px-6 py-4 ${darkMode ? "text-white" : "text-black"}`}>{user.name}</td>
                <td className={`px-6 py-4 ${darkMode ? "text-slate-400" : "text-gray-600"}`}>{user.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${user.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className={`px-6 py-4 ${darkMode ? "text-slate-400" : "text-gray-600"}`}>{user.joinDate}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className={`p-2 rounded-lg transition-colors ${darkMode ? "bg-slate-800 text-blue-400 hover:bg-slate-700" : "bg-gray-100 text-blue-600 hover:bg-gray-200"}`}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
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
        title={editingUser ? "Edit User" : "Add User"}
        darkMode={darkMode}
      >
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
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
