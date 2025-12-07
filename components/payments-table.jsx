"use client"

import { useState } from "react"
import { Edit2, Trash2, Plus } from "lucide-react"
import Modal from "./modal"

export default function PaymentsTable({ darkMode }) {
  const [payments, setPayments] = useState([
    { id: "PAY001", user: "John Doe", amount: "$50", method: "Credit Card", status: "Completed", date: "2024-03-15" },
    { id: "PAY002", user: "Jane Smith", amount: "$75", method: "PayPal", status: "Completed", date: "2024-03-16" },
    { id: "PAY003", user: "Mike Johnson", amount: "$120", method: "Stripe", status: "Pending", date: "2024-03-17" },
    {
      id: "PAY004",
      user: "Sarah Williams",
      amount: "$40",
      method: "Credit Card",
      status: "Failed",
      date: "2024-03-18",
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingPayment, setEditingPayment] = useState(null)
  const [formData, setFormData] = useState({ user: "", amount: "", method: "Credit Card", status: "Pending" })

  const handleAdd = () => {
    setEditingPayment(null)
    setFormData({ user: "", amount: "", method: "Credit Card", status: "Pending" })
    setShowModal(true)
  }

  const handleEdit = (payment) => {
    setEditingPayment(payment)
    setFormData(payment)
    setShowModal(true)
  }

  const handleDelete = (id) => {
    setPayments(payments.filter((p) => p.id !== id))
  }

  const handleSave = () => {
    if (editingPayment) {
      setPayments(payments.map((p) => (p.id === editingPayment.id ? { ...formData, id: p.id, date: p.date } : p)))
    } else {
      setPayments([
        ...payments,
        {
          ...formData,
          id: `PAY${String(Math.max(...payments.map((p) => Number.parseInt(p.id.slice(3))), 0) + 1).padStart(3, "0")}`,
          date: new Date().toISOString().split("T")[0],
        },
      ])
    }
    setShowModal(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/20 text-green-400"
      case "Pending":
        return "bg-yellow-500/20 text-yellow-400"
      case "Failed":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className={`text-xl sm:text-2xl font-bold ${darkMode ? "text-white" : "text-black"}`}>Payments Management</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors w-full sm:w-auto"
        >
          <Plus size={18} /> Add Payment
        </button>
      </div>

      <div
        className={`${darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-gray-200"} border rounded-lg overflow-hidden overflow-x-auto`}
      >
        <table className="w-full min-w-[700px]">
          <thead
            className={`${darkMode ? "bg-slate-800" : "bg-gray-50"} border-b ${darkMode ? "border-slate-700" : "border-gray-200"}`}
          >
            <tr>
              <th
                className={`px-6 py-3 text-left text-sm font-semibold ${darkMode ? "text-slate-300" : "text-gray-700"}`}
              >
                Payment ID
              </th>
              <th
                className={`px-6 py-3 text-left text-sm font-semibold ${darkMode ? "text-slate-300" : "text-gray-700"}`}
              >
                User
              </th>
              <th
                className={`px-6 py-3 text-left text-sm font-semibold ${darkMode ? "text-slate-300" : "text-gray-700"}`}
              >
                Amount
              </th>
              <th
                className={`px-6 py-3 text-left text-sm font-semibold ${darkMode ? "text-slate-300" : "text-gray-700"}`}
              >
                Method
              </th>
              <th
                className={`px-6 py-3 text-left text-sm font-semibold ${darkMode ? "text-slate-300" : "text-gray-700"}`}
              >
                Status
              </th>
              <th
                className={`px-6 py-3 text-left text-sm font-semibold ${darkMode ? "text-slate-300" : "text-gray-700"}`}
              >
                Date
              </th>
              <th
                className={`px-6 py-3 text-left text-sm font-semibold ${darkMode ? "text-slate-300" : "text-gray-700"}`}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className={`border-b ${darkMode ? "border-slate-700 hover:bg-slate-800" : "border-gray-200 hover:bg-gray-50"} transition-colors`}
              >
                <td className={`px-6 py-4 font-medium ${darkMode ? "text-white" : "text-black"}`}>{payment.id}</td>
                <td className={`px-6 py-4 ${darkMode ? "text-slate-400" : "text-gray-600"}`}>{payment.user}</td>
                <td className={`px-6 py-4 font-medium ${darkMode ? "text-white" : "text-black"}`}>{payment.amount}</td>
                <td className={`px-6 py-4 ${darkMode ? "text-slate-400" : "text-gray-600"}`}>{payment.method}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.status)}`}>
                    {payment.status}
                  </span>
                </td>
                <td className={`px-6 py-4 ${darkMode ? "text-slate-400" : "text-gray-600"}`}>{payment.date}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(payment)}
                    className={`p-2 rounded-lg transition-colors ${darkMode ? "bg-slate-800 text-blue-400 hover:bg-slate-700" : "bg-gray-100 text-blue-600 hover:bg-gray-200"}`}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(payment.id)}
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
        title={editingPayment ? "Edit Payment" : "Add Payment"}
        darkMode={darkMode}
      >
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
              User
            </label>
            <input
              type="text"
              value={formData.user}
              onChange={(e) => setFormData({ ...formData, user: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
              Amount
            </label>
            <input
              type="text"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
              Payment Method
            </label>
            <select
              value={formData.method}
              onChange={(e) => setFormData({ ...formData, method: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border ${darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-gray-300 text-black"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option>Credit Card</option>
              <option>PayPal</option>
              <option>Stripe</option>
              <option>Bank Transfer</option>
            </select>
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
              <option>Completed</option>
              <option>Failed</option>
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
