export default function StatCard({ title, value, change, changeType, icon: Icon, color, darkMode, description }) {
    return (
      <div
        className={`${darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-gray-200"} border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 group`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-sm font-medium ${darkMode ? "text-slate-400" : "text-gray-600"}`}>{title}</h3>
          {/* @tailwindcss/no-custom-classname: bg-gradient-to-br is correct */}
          <div className={`bg-gradient-to-br ${color} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
            <Icon size={20} className="text-white" />
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className={`text-3xl font-bold mb-1 ${darkMode ? "text-white" : "text-black"}`}>{value}</p>
            {description && (
              <p className={`text-xs ${darkMode ? "text-slate-500" : "text-gray-500"} mb-2`}>{description}</p>
            )}
            <div className="flex items-center gap-1">
              {changeType === "up" ? (
                <span className="text-xs text-green-500 font-medium flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 2L10 6H7V10H5V6H2L6 2Z" fill="currentColor" />
                  </svg>
                  {change}
                </span>
              ) : (
                <span className="text-xs text-red-500 font-medium flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 10L2 6H5V2H7V6H10L6 10Z" fill="currentColor" />
                  </svg>
                  {change}
                </span>
              )}
              <span className={`text-xs ${darkMode ? "text-slate-500" : "text-gray-500"}`}>vs last month</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  