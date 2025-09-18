import { useState } from "react";
import {
  Home,
  Users,
  ClipboardList,
  FileText,
  Calendar,
  Menu as MenuIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } h-screen bg-gray-900 text-gray-200 flex flex-col transition-all duration-300 shadow-lg`}
    >
      {/* Header / Brand */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
        {isOpen && <span className="text-xl font-bold">MediCare</span>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-800 transition"
        >
          <MenuIcon size={20} />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              <Home size={20} />
              {isOpen && <span>Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/tasks"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              <ClipboardList size={20} />
              {isOpen && <span>Tasks</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/reports"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              <FileText size={20} />
              {isOpen && <span>Reports</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/calendar"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              <Calendar size={20} />
              {isOpen && <span>Calendar</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              <Users size={20} />
              {isOpen && <span>Profile</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              <span className="material-symbols-outlined">chat</span>
              {isOpen && <span>Chat</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
