import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

export default function ClinicianLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Dr. Chen");
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed.name) {
          const nameParts = parsed.name.trim().split(/\s+/);
          if (nameParts[0].toLowerCase().startsWith("dr")) {
            setUserName(nameParts.slice(0, 2).join(" "));
          } else {
            setUserName(nameParts[0]);
          }
        }
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-[#121212] text-gray-100 font-sans">
      {/* Sidebar Component */}
      <nav className="fixed left-0 top-0 h-screen w-[240px] bg-[#1e1e1e] border-r border-[#333333] flex flex-col h-full pt-6 pb-4 z-50">
        <div className="px-5 mb-6">
          <h1 className="text-xl font-bold text-gray-100 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00ffcc] text-[26px]">medical_services</span>
            PostCare<span className="text-[#00ffcc]">AI</span>
          </h1>
          <span className="text-[11px] font-bold text-[#00ffcc] mt-1 block tracking-wider uppercase">
            Medical Command
          </span>
        </div>

        <ul className="flex-1 px-3 space-y-1.5">
          <li>
            <Link
              to="/clinician"
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm transition-all duration-150 ease-in-out ${
                location.pathname === "/clinician"
                  ? "bg-[#00ffcc]/10 text-[#00ffcc] border border-[#00ffcc]/50 font-bold"
                  : "text-gray-400 hover:bg-[#2a2a2a] hover:text-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={location.pathname === "/clinician" ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  dashboard
                </span>
                <span>Dashboard</span>
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/clinician/queue"
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm transition-all duration-150 ease-in-out ${
                location.pathname === "/clinician/queue"
                  ? "bg-[#00ffcc]/10 text-[#00ffcc] border border-[#00ffcc]/50 font-bold"
                  : "text-gray-400 hover:bg-[#2a2a2a] hover:text-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={location.pathname === "/clinician/queue" ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  group
                </span>
                <span>Patients</span>
              </div>
              <span className="bg-[#2a2a2a] text-[#00ffcc] text-xs font-bold px-2 py-0.5 rounded-full border border-[#333333]">
                8
              </span>
            </Link>
          </li>
          <li>
            <a
              className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-[#2a2a2a] hover:text-gray-200 transition-all duration-150 ease-in-out"
              href="#"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">
                  emergency_home
                </span>
                <span>Alerts</span>
              </div>
              <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-0.5 rounded-full border border-red-500/30">
                2
              </span>
            </a>
          </li>
          <li>
            <Link
              to="/clinician/add-user"
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm transition-all duration-150 ease-in-out ${
                location.pathname === "/clinician/add-user"
                  ? "bg-[#00ffcc]/10 text-[#00ffcc] border border-[#00ffcc]/50 font-bold"
                  : "text-gray-400 hover:bg-[#2a2a2a] hover:text-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={location.pathname === "/clinician/add-user" ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  person_add
                </span>
                <span>Add User</span>
              </div>
            </Link>
          </li>
          <li>
            <a
              className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-[#2a2a2a] hover:text-gray-200 transition-all duration-150 ease-in-out"
              href="#"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">
                  settings
                </span>
                <span>Settings</span>
              </div>
            </a>
          </li>
        </ul>

        <div className="px-4 mt-auto relative">
          {profileOpen && (
            <div className="absolute bottom-[calc(100%+8px)] left-4 right-4 bg-[#1e1e1e] border border-[#333333] rounded-lg shadow-xl py-1 z-50">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#2a2a2a] flex items-center gap-2 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  logout
                </span>
                Logout
              </button>
            </div>
          )}
          <div
            onClick={() => setProfileOpen(!profileOpen)}
            className="pt-3 border-t border-[#333333] cursor-pointer hover:bg-[#2a2a2a]/30 rounded-lg p-1.5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#2a2a2a] flex items-center justify-center border border-[#333333] overflow-hidden shrink-0">
                <img
                  className="w-full h-full object-cover"
                  alt="Dr. Chen portrait"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBX_JlLs554qfDKHhqdYRtVFmoAyxCiN9plmSj8XULplZ2cBrHqMsEcFTib5O9BsdCWM0AQcXSEovW98ugY_Vlu6GOZyf_iqJqHv6viN6UI4LeXpQCMXTk6Vl_awChheIVW1h1bzACu_EE7PHB4-gzCtGfzVfujlXcBOLOokLwtwxw1ce3tOFN4l_3zQNyZ8CFnWoltweZELEr7gj-Zcp3HRfHZbxIfncQr0hqsE2FeCyTHb0bsAv3z"
                />
              </div>
              <div className="min-w-0 text-left">
                <div className="font-bold text-sm text-gray-100 truncate">{userName}</div>
                <div className="text-xs text-gray-400 truncate">Surgery Dept</div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="ml-[240px] flex-1 flex flex-col h-full bg-[#121212] overflow-y-auto relative z-10">
        {/* Top App Bar Component */}
        <header className="sticky top-0 w-full h-20 bg-[#1e1e1e]/90 backdrop-blur-md border-b border-[#333333] flex justify-between items-center px-8 z-40 shrink-0">
          <h2 className="text-xl font-bold text-gray-100">
            PKLI Lahore <span className="text-[#00ffcc]">Medical Command</span>
          </h2>
          <div className="flex items-center gap-6">
            <div className="text-xs font-semibold text-[#00ffcc] flex items-center gap-2 bg-[#121212] border border-[#333333] px-3.5 py-1.5 rounded-lg">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              <span id="real-time-clock">14:02 EST</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-[#00ffcc] transition-colors p-1">
                <span className="material-symbols-outlined text-2xl">refresh</span>
              </button>
              <button className="text-gray-400 hover:text-[#00ffcc] transition-colors p-1 relative">
                <span className="material-symbols-outlined text-2xl">notifications</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="text-gray-400 hover:text-[#00ffcc] transition-colors p-1">
                <span className="material-symbols-outlined text-2xl">account_circle</span>
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
            <span>24/7 Clinical Monitoring</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
