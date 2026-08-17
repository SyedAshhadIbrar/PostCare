import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      {/* Row 1: KPIs */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#1e1e1e] border border-[#333333] rounded-xl p-5 relative overflow-hidden group hover:border-[#00ffcc]/50 transition-colors">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#00ffcc]/5 rounded-full blur-2xl group-hover:bg-[#00ffcc]/10 transition-colors"></div>
          <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#00ffcc]">monitor_heart</span>
            Active Patients
          </div>
          <div className="text-3xl font-bold text-gray-100 leading-none mt-4">48</div>
        </div>

        <div className="bg-[#1e1e1e] border border-[#333333] rounded-xl p-5 relative overflow-hidden group hover:border-amber-500/50 transition-colors">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors"></div>
          <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-amber-400">pending_actions</span>
            Pending AI Reviews
          </div>
          <div className="text-3xl font-bold text-amber-400 leading-none mt-4">8</div>
        </div>

        <div className="bg-[#1e1e1e] border border-red-500/30 rounded-xl p-5 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-500/10 rounded-full blur-2xl"></div>
          <div className="text-red-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">warning</span>
            Urgent Escalations
            <div className="w-2 h-2 rounded-full bg-red-500 ml-auto animate-pulse"></div>
          </div>
          <div className="text-3xl font-bold text-red-400 leading-none mt-4">2</div>
        </div>

        <div className="bg-[#1e1e1e] border border-[#333333] rounded-xl p-5 relative overflow-hidden group hover:border-[#00ffcc]/50 transition-colors">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#00ffcc]/5 rounded-full blur-2xl group-hover:bg-[#00ffcc]/10 transition-colors"></div>
          <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#00ffcc]">verified_user</span>
            Compliance Rate
          </div>
          <div className="text-3xl font-bold text-[#00ffcc] leading-none mt-4">
            94.2<span className="text-xl">%</span>
          </div>
        </div>
      </section>

      {/* Row 2: Analytics */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Left Card: Chart Mockup */}
        <div className="md:col-span-2 bg-[#1e1e1e] border border-[#333333] rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-100">Patient Check-ins vs Flags (7-Day)</h3>
            <button className="text-gray-400 hover:text-[#00ffcc] text-sm flex items-center gap-1 transition-colors">
              <span className="material-symbols-outlined text-[18px]">download</span> Export
            </button>
          </div>
          <div className="flex-1 flex gap-3 mt-4 items-end h-48 pt-2">
            {/* Y Axis Labels */}
            <div className="flex flex-col justify-between text-gray-500 items-end text-[10px] font-bold h-full pb-6 select-none">
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>
            {/* Bars */}
            <div className="flex-1 flex items-end gap-2 h-full border-b border-l border-[#333333] pb-2 pl-2">
              <div className="flex-1 flex flex-col justify-end items-center group">
                <div className="w-full flex gap-1 justify-center items-end h-[60%]">
                  <div className="w-3 bg-[#2a2a2a] rounded-t group-hover:bg-[#333333] transition-colors" style={{ height: "100%" }}></div>
                  <div className="w-3 bg-amber-500/40 rounded-t group-hover:bg-amber-500/60 transition-colors" style={{ height: "20%" }}></div>
                </div>
                <span className="text-gray-500 text-[10px] font-bold mt-2">MON</span>
              </div>
              <div className="flex-1 flex flex-col justify-end items-center group">
                <div className="w-full flex gap-1 justify-center items-end h-[80%]">
                  <div className="w-3 bg-[#2a2a2a] rounded-t group-hover:bg-[#333333] transition-colors" style={{ height: "100%" }}></div>
                  <div className="w-3 bg-amber-500/40 rounded-t group-hover:bg-amber-500/60 transition-colors" style={{ height: "30%" }}></div>
                </div>
                <span className="text-gray-500 text-[10px] font-bold mt-2">TUE</span>
              </div>
              <div className="flex-1 flex flex-col justify-end items-center group">
                <div className="w-full flex gap-1 justify-center items-end h-[75%]">
                  <div className="w-3 bg-[#2a2a2a] rounded-t group-hover:bg-[#333333] transition-colors" style={{ height: "100%" }}></div>
                  <div className="w-3 bg-amber-500/40 rounded-t group-hover:bg-amber-500/60 transition-colors" style={{ height: "25%" }}></div>
                </div>
                <span className="text-gray-500 text-[10px] font-bold mt-2">WED</span>
              </div>
              <div className="flex-1 flex flex-col justify-end items-center group">
                <div className="w-full flex gap-1 justify-center items-end h-[90%]">
                  <div className="w-3 bg-[#2a2a2a] rounded-t group-hover:bg-[#333333] transition-colors" style={{ height: "100%" }}></div>
                  <div className="w-3 bg-red-500/50 rounded-t group-hover:bg-red-500/70 transition-colors" style={{ height: "45%" }}></div>
                </div>
                <span className="text-gray-500 text-[10px] font-bold mt-2">THU</span>
              </div>
              <div className="flex-1 flex flex-col justify-end items-center group">
                <div className="w-full flex gap-1 justify-center items-end h-[65%]">
                  <div className="w-3 bg-[#2a2a2a] rounded-t group-hover:bg-[#333333] transition-colors" style={{ height: "100%" }}></div>
                  <div className="w-3 bg-amber-500/40 rounded-t group-hover:bg-amber-500/60 transition-colors" style={{ height: "15%" }}></div>
                </div>
                <span className="text-gray-500 text-[10px] font-bold mt-2">FRI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Distribution */}
        <div className="bg-[#1e1e1e] border border-[#333333] rounded-xl p-6 flex flex-col">
          <h3 className="text-lg font-bold text-gray-100 mb-6">Triage Distribution</h3>
          <div className="space-y-6 flex-1 flex flex-col justify-center">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#00ffcc] font-bold">Routine</span>
                <span className="text-gray-100 font-bold text-sm">70%</span>
              </div>
              <div className="h-1.5 w-full bg-[#121212] rounded-full overflow-hidden border border-[#333333]">
                <div className="h-full bg-[#00ffcc] rounded-full" style={{ width: "70%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-amber-400 font-bold">Review</span>
                <span className="text-gray-100 font-bold text-sm">25%</span>
              </div>
              <div className="h-1.5 w-full bg-[#121212] rounded-full overflow-hidden border border-[#333333]">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: "25%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-red-400 font-bold flex items-center gap-1">
                  Urgent <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                </span>
                <span className="text-gray-100 font-bold text-sm">5%</span>
              </div>
              <div className="h-1.5 w-full bg-[#121212] rounded-full overflow-hidden border border-[#333333]">
                <div className="h-full bg-red-500 rounded-full" style={{ width: "5%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Row 3: Priority Queue */}
      <section className="bg-[#1e1e1e] border border-[#333333] rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-100 flex items-center gap-2">
            <span className="material-symbols-outlined text-red-400">priority_high</span>
            Priority Triage Queue
          </h3>
          <Link
            to="/clinician/queue"
            className="text-[#00ffcc] hover:text-[#00ccaa] text-sm font-bold flex items-center gap-1 transition-colors"
          >
            View Full Queue <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#333333] text-gray-400 text-xs font-bold uppercase tracking-wider bg-[#121212]">
                <th className="py-3 px-4 font-bold">Patient ID</th>
                <th className="py-3 px-4 font-bold">Timeline</th>
                <th className="py-3 px-4 font-bold">Flagged Symptoms</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-[#333333]">
              <tr className="hover:bg-[#2a2a2a]/50 transition-colors">
                <td className="py-4 px-4 text-gray-100 font-bold">PT-8942-X</td>
                <td className="py-4 px-4 text-gray-400">Post-Op Day 5</td>
                <td className="py-4 px-4 text-gray-200 font-medium">High Fever + Discharge</td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 text-red-500 px-2.5 py-1 rounded text-xs font-bold tracking-wide uppercase">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                    Critical
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <Link
                    to="/clinician/queue"
                    className="inline-block bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors px-4 py-1.5 rounded-md text-xs font-bold border border-red-500/30"
                  >
                    Open Case
                  </Link>
                </td>
              </tr>
              <tr className="hover:bg-[#2a2a2a]/50 transition-colors">
                <td className="py-4 px-4 text-gray-100 font-bold">PT-1102-Y</td>
                <td className="py-4 px-4 text-gray-400">Post-Op Day 2</td>
                <td className="py-4 px-4 text-gray-200 font-medium">Excessive Pain Score (9/10)</td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2.5 py-1 rounded text-xs font-bold tracking-wide uppercase">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                    Elevated
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <Link
                    to="/clinician/queue"
                    className="inline-block bg-[#2a2a2a] text-gray-300 hover:bg-[#333333] hover:text-white transition-colors px-4 py-1.5 rounded-md text-xs font-bold border border-[#333333]"
                  >
                    Review
                  </Link>
                </td>
              </tr>
              <tr className="hover:bg-[#2a2a2a]/50 transition-colors">
                <td className="py-4 px-4 text-gray-100 font-bold">PT-4491-A</td>
                <td className="py-4 px-4 text-gray-400">Post-Op Day 14</td>
                <td className="py-4 px-4 text-gray-200 font-medium">Missed check-in (48h)</td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2.5 py-1 rounded text-xs font-bold tracking-wide uppercase">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                    Warning
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <Link
                    to="/clinician/queue"
                    className="inline-block bg-[#2a2a2a] text-gray-300 hover:bg-[#333333] hover:text-white transition-colors px-4 py-1.5 rounded-md text-xs font-bold border border-[#333333]"
                  >
                    Contact
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
