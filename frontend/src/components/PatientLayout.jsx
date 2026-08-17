import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

export default function PatientLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const navItems = [
    { name: "Dashboard", path: "/patient", icon: "dashboard" },
    { name: "Daily Log", path: "/patient/log", icon: "fact_check" },
    { name: "AI Assistant", path: "/patient/assistant", icon: "smart_toy" },
    { name: "Settings", path: "/patient/settings", icon: "settings" },
  ];

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-[#121212] text-gray-100 font-sans">
      {/* Sidebar Component */}
      <nav className="fixed left-0 top-0 h-screen w-[240px] bg-[#1e1e1e] border-r border-[#333333] flex flex-col h-full py-6 z-50">
        <div className="px-5 mb-6">
          <h1 className="text-xl font-bold text-gray-100 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00ffcc] text-[26px]">monitor_heart</span>
            PostCare<span className="text-[#00ffcc]">AI</span>
          </h1>
          <span className="text-[11px] font-bold text-[#00ffcc] mt-1 block tracking-wider uppercase">
            Patient Portal
          </span>
        </div>

        <ul className="flex-1 px-3 space-y-1.5">
          {navItems.map((item) => {
            const isActive =
              item.path === "/patient"
                ? location.pathname === "/patient"
                : location.pathname.startsWith(item.path);

            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm transition-all duration-150 ease-in-out ${
                    isActive
                      ? "bg-[#00ffcc]/10 text-[#00ffcc] border border-[#00ffcc]/50 font-bold"
                      : "text-gray-400 hover:bg-[#2a2a2a] hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="px-4 mt-auto">
          <div className="pt-3 border-t border-[#333333]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-[#2a2a2a] flex items-center justify-center border border-[#333333] shrink-0">
                <span className="material-symbols-outlined text-[#00ffcc] text-[20px]">
                  person
                </span>
              </div>
              <div className="min-w-0">
                <div className="font-bold text-sm text-gray-100 truncate">
                  Patient Portal
                </div>
                <div className="text-xs text-[#00ffcc] truncate">
                  Active Care Plan
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <a
                className="text-gray-400 hover:text-[#00ffcc] transition-colors flex items-center gap-1.5 text-xs"
                href="#"
              >
                <span className="material-symbols-outlined text-[16px]">
                  help_outline
                </span>
                Support
              </a>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-[#00ffcc] transition-colors flex items-center gap-1.5 text-xs bg-transparent border-none p-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">
                  logout
                </span>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="ml-[240px] flex-1 flex flex-col h-full bg-[#121212] overflow-y-auto relative z-10">
        {/* Top App Bar */}
        <header className="sticky top-0 w-full h-20 bg-[#1e1e1e]/90 backdrop-blur-md border-b border-[#333333] flex justify-between items-center px-8 z-40 shrink-0">
          <h2 className="text-xl font-bold text-gray-100">
            PKLI Lahore <span className="text-[#00ffcc]">Recovery Guide</span>
          </h2>
          <div className="flex items-center gap-6">
            <div className="text-xs font-semibold text-[#00ffcc] flex items-center gap-2 bg-[#121212] border border-[#333333] px-3.5 py-1.5 rounded-lg">
              <span className="material-symbols-outlined text-[16px]">
                verified
              </span>
              Recovery Status: Active
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-[#00ffcc] transition-colors p-1">
                <span className="material-symbols-outlined text-2xl">
                  notifications
                </span>
              </button>
              <button className="text-gray-400 hover:text-[#00ffcc] transition-colors p-1">
                <span className="material-symbols-outlined text-2xl">
                  account_circle
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Outlet renders child routes */}
        <div className="px-8 py-8 max-w-[1440px] mx-auto w-full flex-1">
          <Outlet />
        </div>

        {/* Anchored Footer */}
        <footer className="mt-auto border-t border-[#333333] py-4 px-8 bg-[#1e1e1e]/50 text-xs text-gray-400 flex flex-col sm:flex-row justify-between items-center gap-2 shrink-0">
          <div>
            PostCare<span className="text-[#00ffcc]">AI</span> &copy; 2026 Pakistan Kidney &amp; Liver Institute (PKLI Lahore)
          </div>
          <div className="flex items-center gap-4 text-[11px] text-gray-400">
            <span>HIPAA Compliant</span>
            <span>&bull;</span>
            <span>24/7 Clinical Care</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
