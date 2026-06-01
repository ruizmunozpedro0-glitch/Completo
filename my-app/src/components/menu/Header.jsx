import { Menu, ShoppingBag } from "lucide-react";

export function Header({ userName, toggleSidebar }) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Botón hamburguesa */}
        <button
          onClick={toggleSidebar}
          className="p-2 text-slate-600 lg:hidden hover:bg-slate-100 rounded-lg"
        >
          <Menu size={24} />
        </button>

        <div className="hidden sm:block text-gray-400 text-sm font-medium">
          Panel / <span className="text-slate-800">Menú digital</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-bold text-slate-700 leading-none">
            {userName}
          </p>
          <p className="text-xs text-gray-500">
            Administración del menú
          </p>
        </div>

        <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center border border-pink-200">
          <ShoppingBag size={20} className="text-pink-600" />
        </div>
      </div>
    </header>
  );
}