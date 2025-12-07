export default function StatCard({ title, value, change, icon: Icon, color, darkMode }) {
    return (
      <div
        className={`${darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-gray-200"} border rounded-lg p-6 hover:shadow-lg transition-shadow`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-sm font-medium ${darkMode ? "text-slate-400" : "text-gray-600"}`}>{title}</h3>
          {/* @tailwindcss/no-custom-classname: bg-gradient-to-br is correct */}
          <div className={`bg-gradient-to-br ${color} p-3 rounded-lg`}>
            <Icon size={20} className="text-white" />
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-black"}`}>{value}</p>
            <p className="text-xs text-green-500 mt-1">↑ {change}</p>
          </div>
        </div>
      </div>
    )
  }
  