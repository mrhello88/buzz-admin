"use client"

export default function Modal({ isOpen, onClose, title, children, darkMode, size = "md" }) {
  if (!isOpen) return null

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    "2xl": "max-w-6xl",
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className={`${darkMode ? "bg-slate-900" : "bg-white"} rounded-lg shadow-xl ${sizeClasses[size]} w-full max-w-[90vw] max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex items-center justify-between p-6 border-b ${darkMode ? "border-slate-700" : "border-gray-200"}`}
        >
          <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-black"} pr-4`}>{title}</h2>
          <button
            onClick={onClose}
            className={`text-2xl leading-none shrink-0 ${darkMode ? "text-slate-400 hover:text-white" : "text-gray-500 hover:text-black"}`}
          >
            ×
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
