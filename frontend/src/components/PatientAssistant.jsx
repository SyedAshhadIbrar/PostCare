export default function PatientAssistant() {
  return (
    <div>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center border-b border-[#333333] pb-6 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-100 tracking-tight">
              AI Care Assistant
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Interactive 24/7 post-op recovery guidance &amp; support
            </p>
          </div>
          <div className="bg-[#1e1e1e] border border-[#333333] px-3.5 py-1.5 rounded-lg text-xs text-gray-300 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#00ffcc]">smart_toy</span>
            PostCareAI Assistant
          </div>
        </div>

        <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-[#333333] rounded-xl bg-[#1e1e1e]/50 p-8 text-center space-y-4">
          <span className="material-symbols-outlined text-6xl text-[#00ffcc]">
            smart_toy
          </span>
          <h3 className="text-xl font-bold text-gray-100">AI Assistant Portal</h3>
          <p className="text-sm text-gray-400 max-w-md">
            Ask post-operative wound care questions, track medications, or get emergency guidance.
          </p>
        </div>
      </div>
    </div>
  );
}
