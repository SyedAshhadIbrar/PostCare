import { useState } from "react";

const API_BASE = "http://localhost:8000";

export default function PatientCheckIn() {
  const [day, setDay] = useState(1);
  const [pain, setPain] = useState(0);
  const [symptoms, setSymptoms] = useState({
    fever: false,
    redness: false,
    swelling: false,
    bleeding: false,
    discharge: false,
  });
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState("idle");

  const toggleSymptom = (key) => {
    setSymptoms((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.name.toLowerCase().endsWith(".heic")) {
        alert("HEIC files are not supported yet. Please upload a JPEG or PNG.");
        return;
      }
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Please upload today's wound photo.");
      return;
    }

    setStatus("submitting");

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append(
      "payload",
      JSON.stringify({
        post_op_day: day,
        pain_level: pain,
        symptoms: symptoms,
      })
    );

    try {
      const response = await fetch(`${API_BASE}/api/patients/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Server rejected submission");
      setStatus("success");
    } catch (error) {
      console.error("Submission failed:", error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center justify-center p-4 min-h-[60vh]">
        <div className="bg-[#1e1e1e] border border-[#00ffcc] rounded-xl p-8 max-w-md text-center">
          <span className="material-symbols-outlined text-[#00ffcc] text-6xl mb-4">
            check_circle
          </span>
          <h2 className="text-2xl font-bold text-gray-100 mb-2">Check-In Complete</h2>
          <p className="text-gray-400">
            Your daily recovery data has been securely transmitted to your clinical team.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-[#2a2a2a] text-gray-300 hover:text-white px-4 py-2 rounded"
          >
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center border-b border-[#333333] pb-6 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-100 tracking-tight">
              Daily Recovery Check-In
            </h2>
            <p className="text-sm text-gray-400 mt-1">Submit your daily wound photo &amp; symptom log</p>
          </div>
          <div className="bg-[#1e1e1e] border border-[#333333] px-3.5 py-1.5 rounded-lg text-xs text-gray-300 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">language</span>
            English
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-[#1e1e1e] border border-[#333333] rounded-xl p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Days Post-Surgery
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setDay(num)}
                    className={`flex-1 py-2.5 rounded text-sm font-bold transition-colors ${
                      day === num
                        ? "bg-[#00ffcc] text-black"
                        : "bg-[#2a2a2a] text-gray-400 hover:bg-[#333333]"
                    }`}
                  >
                    Day {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#1e1e1e] border border-[#333333] rounded-xl p-6">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Today's Wound Photo (Required)
            </label>
            <div className="relative border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-[#00ffcc] transition-colors bg-[#121212]">
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <span className="material-symbols-outlined text-4xl text-gray-500 mb-2">
                add_a_photo
              </span>
              <p className="text-sm text-gray-300 font-semibold">
                {imageFile ? imageFile.name : "Tap to upload or drag image here"}
              </p>
              <p className="text-xs text-gray-500 mt-1">JPEG or PNG only</p>
            </div>
          </div>

          <div className="bg-[#1e1e1e] border border-[#333333] rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                Pain Level
              </label>
              <span className="text-2xl font-bold text-[#00ffcc]">{pain}</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={pain}
              onChange={(e) => setPain(parseInt(e.target.value))}
              className="w-full accent-[#00ffcc] h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2 font-bold">
              <span>0 - No Pain</span>
              <span>10 - Unbearable</span>
            </div>
          </div>

          <div className="bg-[#1e1e1e] border border-[#333333] rounded-xl p-6">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              Observed Symptoms
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {Object.keys(symptoms).map((symp) => (
                <button
                  key={symp}
                  type="button"
                  onClick={() => toggleSymptom(symp)}
                  className={`py-3.5 rounded-lg border text-sm font-bold capitalize transition-all ${
                    symptoms[symp]
                      ? "bg-[#00ffcc]/20 border-[#00ffcc] text-[#00ffcc]"
                      : "bg-[#2a2a2a] border-transparent text-gray-300 hover:bg-[#333333]"
                  }`}
                >
                  {symp}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-[#00ffcc] text-black font-bold py-4 rounded-xl hover:bg-[#00ccaa] transition-colors flex items-center justify-center gap-2 text-lg disabled:opacity-50"
          >
            {status === "submitting" ? (
              <span className="material-symbols-outlined animate-spin">refresh</span>
            ) : (
              <span className="material-symbols-outlined">send</span>
            )}
            {status === "submitting" ? "Processing AI Analysis..." : "Submit Daily Check-In"}
          </button>

          {status === "error" && (
            <p className="text-red-500 text-sm text-center font-bold">
              Failed to connect to the server. Check your connection.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
