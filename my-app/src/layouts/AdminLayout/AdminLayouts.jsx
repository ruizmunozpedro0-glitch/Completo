import { useState } from "react";
import { MenuLateral, Header } from "../../components";

export function AdminLayouts({ children }) {
  const [sideBar, setSideBar] = useState(false);

  const toggleSidebar = () => {
    setSideBar(!sideBar);
  };

  return (
    <div className="flex h-screen bg-pink-50 overflow-hidden text-slate-900">
      <MenuLateral isOpen={sideBar} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header userName="BakeHub" toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}