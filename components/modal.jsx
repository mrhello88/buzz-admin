"use client"

export default function Modal({ isOpen, onClose, title, children, darkMode }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`${darkMode ? "bg-slate-900" : "bg-white"} rounded-lg shadow-xl max-w-md w-full mx-4`}>
        <div
          className={`flex items-center justify-between p-6 border-b ${darkMode ? "border-slate-700" : "border-gray-200"}`}
        >
          <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-black"}`}>{title}</h2>
          <button
            onClick={onClose}
            className={`text-2xl leading-none ${darkMode ? "text-slate-400 hover:text-white" : "text-gray-500 hover:text-black"}`}
          >
            ×
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
