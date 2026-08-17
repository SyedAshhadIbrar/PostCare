import { useState, useEffect, useCallback } from "react";

const API_BASE = "http://localhost:8000";

function PriorityTag({ priority }) {
  const key = (priority || "routine").toLowerCase();

  if (key === "high") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] uppercase font-bold tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
        Urgent
      </span>
    );
  }

  if (key === "needs_review") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] uppercase font-bold tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
        Review
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00ffcc]/10 border border-[#00ffcc]/30 text-[#00ffcc] text-[10px] uppercase font-bold tracking-wider">
      <span className="w-1.5 h-1.5 rounded-full bg-[#00ffcc]"></span>
      On Track
    </span>
  );
}

function fmtTime(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export default function PatientManagement() {
  const [cases, setCases] = useState([]);
  const [stats, setStats] = useState({
    discharge_patients: 0,
    on_track: 0,
    completed: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [casesRes, statsRes] = await Promise.all([
        fetch(`${API_BASE}/clinician/cases`),
        fetch(`${API_BASE}/clinician/stats`),
      ]);
      const casesData = casesRes.ok ? await casesRes.json() : [];
      const statsData = statsRes.ok
        ? await statsRes.json()
        : { discharge_patients: 0, on_track: 0, completed: 0 };
      setCases(casesData);
      setStats(statsData);
    } catch (err) {
      console.error("PatientManagement: fetch failed —", err);
      setCases([]);
      setStats({ discharge_patients: 0, on_track: 0, completed: 0 });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleReview = async (caseId) => {
    try {
      await fetch(`${API_BASE}/clinician/cases/${caseId}/review`, {
        method: "POST",
      });
      setSelectedCase(null);
      fetchData();
    } catch (err) {
      console.error("PatientManagement: review failed —", err);
    }
  };

  const q = searchQuery.toLowerCase();
  const filteredCases = cases.filter(
    (r) =>
      !q ||
      [r.patient_name, r.procedure, r.consultant_surgeon, r.case_id]
        .join(" ")
        .toLowerCase()
        .includes(q)
  );

  return (
    <div>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-[#333333] pb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-100">
              Patient Management
            </h2>
            <p className="text-base text-gray-300 mt-2">
              Pakistan Kidney and Liver Institute (Lahore)
            </p>
            <p className="text-xs font-bold text-[#00ffcc] uppercase tracking-widest mt-1">
              Department: Liver Transplant
            </p>
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            className="bg-[#00ffcc] text-black text-sm font-bold py-2 px-6 rounded-md hover:bg-[#00ccaa] transition-colors flex items-center gap-2"
          >
            {loading ? "Loading…" : "Refresh"}
          </button>
        </div>

        {/* KPI Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1e1e1e] border border-[#333333] rounded-xl p-6 relative overflow-hidden">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              Discharge patients
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl text-gray-100 font-bold">
                {stats.discharge_patients ?? 0}
              </span>
            </div>
          </div>
          <div className="bg-[#1e1e1e] border border-[#333333] rounded-xl p-6 relative overflow-hidden">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              On track
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl text-[#00ffcc] font-bold">
                {stats.on_track ?? 0}
              </span>
            </div>
          </div>
          <div className="bg-[#1e1e1e] border border-[#333333] rounded-xl p-6 relative overflow-hidden">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              Completed
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl text-gray-100 font-bold">
                {stats.completed ?? 0}
              </span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full max-w-xl">
          <input
            className="w-full bg-[#121212] border border-[#333333] text-gray-100 rounded-md py-3 px-4 focus:ring-1 focus:ring-[#00ffcc] focus:border-[#00ffcc] transition-colors placeholder:text-gray-500 outline-none"
            placeholder="Search patients..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Data Table */}
        <div className="bg-[#1e1e1e] border border-[#333333] rounded-xl overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#333333] bg-[#121212]">
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Time</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Patient Name</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Procedure</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Consultant Surgeon</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Discharge Date</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Priority Tag</th>
                <th className="py-4 px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#333333]">
              {filteredCases.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 px-6 text-center text-sm text-gray-500">
                    {loading ? "Loading patient queue…" : "No cases in the queue"}
                  </td>
                </tr>
              ) : (
                filteredCases.map((row) => (
                  <tr key={row.case_id} className="hover:bg-[#2a2a2a]/50 transition-colors">
                    <td className="py-4 px-6 text-sm text-gray-300">{fmtTime(row.created_at)}</td>
                    <td className="py-4 px-6 text-sm text-gray-100 font-semibold">{row.patient_name}</td>
                    <td className="py-4 px-6 text-sm text-gray-300">{row.procedure}</td>
                    <td className="py-4 px-6 text-sm text-gray-300">{row.consultant_surgeon}</td>
                    <td className="py-4 px-6 text-sm text-gray-300">{row.discharge_date}</td>
                    <td className="py-4 px-6"><PriorityTag priority={row.priority} /></td>
                    <td className="py-4 px-6 text-right">
                      {row.status !== "reviewed" ? (
                        <button
                          onClick={() => setSelectedCase(row)}
                          className="bg-[#00ffcc]/10 text-[#00ffcc] border border-[#00ffcc]/50 hover:bg-[#00ffcc]/20 transition-colors py-1.5 px-4 rounded-md text-xs font-bold"
                        >
                          Review
                        </button>
                      ) : (
                        <span className="text-[10px] text-gray-500 uppercase font-bold">Reviewed</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Clinical Review Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#1e1e1e] border border-[#333333] rounded-xl w-full max-w-lg shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="border-b border-[#333333] p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-100">{selectedCase.patient_name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{selectedCase.procedure}</p>
                </div>
                <PriorityTag priority={selectedCase.priority} />
              </div>
              <div className="flex gap-4 mt-3">
                <span className="text-xs text-gray-500">
                  Case: <span className="text-gray-300 font-semibold">{selectedCase.case_id}</span>
                </span>
                <span className="text-xs text-gray-500">
                  Discharge: <span className="text-gray-300 font-semibold">{selectedCase.discharge_date}</span>
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Wound Photo Placeholder */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Wound Photo</p>
                <div className="bg-[#121212] border border-[#333333] rounded-lg h-48 flex flex-col items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-gray-600">photo_camera</span>
                  <p className="text-xs text-gray-500 mt-2">Photo not available in queue view</p>
                </div>
              </div>

              {/* Clinical Data */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#121212] border border-[#333333] rounded-lg p-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Pain Level</p>
                  <p className="text-2xl font-bold text-[#00ffcc]">{selectedCase.pain_score ?? 4}<span className="text-sm text-gray-500 font-normal">/10</span></p>
                </div>
                <div className="bg-[#121212] border border-[#333333] rounded-lg p-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Post-Op Day</p>
                  <p className="text-2xl font-bold text-gray-100">{selectedCase.post_op_day ?? "—"}</p>
                </div>
              </div>

              <div className="bg-[#121212] border border-[#333333] rounded-lg p-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Reported Symptoms</p>
                <div className="flex flex-wrap gap-2">
                  {["Redness", "Swelling"].map((s) => (
                    <span key={s} className="bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#121212] border border-[#333333] rounded-lg p-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Consultant Surgeon</p>
                <p className="text-sm text-gray-100 font-semibold">{selectedCase.consultant_surgeon}</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-[#333333] p-6 flex justify-end gap-3">
              <button
                onClick={() => setSelectedCase(null)}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-300 bg-[#2a2a2a] hover:bg-[#333333] transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => handleReview(selectedCase.case_id)}
                className="px-5 py-2.5 rounded-lg text-sm font-bold text-black bg-[#00ffcc] hover:bg-[#00ccaa] transition-colors"
              >
                Approve &amp; Mark Reviewed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
