"use client"

import { Search, Bell, Moon, Sun, Menu } from "lucide-react"

export default function Header({ darkMode, setDarkMode, searchQuery, setSearchQuery, sidebarOpen, setSidebarOpen }) {
  return (
    <header
      className={`${darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-gray-200"} border-b px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4`}
    >
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`lg:hidden p-2 rounded-lg ${darkMode ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
      >
        <Menu size={20} />
      </button>
      <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
        <div
          className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg flex-1 min-w-0 ${darkMode ? "bg-slate-800" : "bg-gray-100"}`}
        >
          <Search size={18} className={`shrink-0 ${darkMode ? "text-slate-400" : "text-gray-500"}`} />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`bg-transparent outline-none w-full min-w-0 ${darkMode ? "text-white placeholder-slate-500" : "text-black placeholder-gray-400"}`}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <button
          className={`p-2 rounded-lg ${darkMode ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
        >
          <Bell size={20} />
        </button>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-lg ${darkMode ? "bg-slate-800 text-yellow-400 hover:bg-slate-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  )
}

