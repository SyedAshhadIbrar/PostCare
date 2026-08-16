const store = {
  get api() { return localStorage.getItem("postcare_api") || window.location.origin; },
  set api(v) { localStorage.setItem("postcare_api", v); },
  get lastCase() { return JSON.parse(localStorage.getItem("postcare_last_case") || "null"); },
  set lastCase(v) { localStorage.setItem("postcare_last_case", JSON.stringify(v)); },
  get reminders() { return JSON.parse(localStorage.getItem("postcare_reminders") || "[]"); },
  set reminders(v) { localStorage.setItem("postcare_reminders", JSON.stringify(v)); },
};

function switchTab(name) {
  document.querySelectorAll(".bottom-nav button").forEach((b) => {
    b.classList.toggle("active", b.dataset.tab === name);
  });
  document.querySelectorAll(".panel").forEach((p) => p.classList.remove("active"));
  document.getElementById(`tab-${name}`).classList.add("active");
}

document.querySelectorAll(".bottom-nav button").forEach((btn) => {
  btn.onclick = () => switchTab(btn.dataset.tab);
});

document.getElementById("start-checkin").onclick = () => switchTab("log");

document.querySelector('[name="pain_score"]').oninput = (e) => {
  document.getElementById("pain-val").textContent = e.target.value;
};

document.querySelector('[name="image"]').onchange = (e) => {
  const file = e.target.files?.[0];
  const preview = document.getElementById("photo-preview");
  if (!file) {
    preview.classList.add("hidden");
    return;
  }
  preview.src = URL.createObjectURL(file);
  preview.classList.remove("hidden");
  document.querySelectorAll(".step")[0].classList.add("active");
};

document.querySelector('[name="patient_name"]').oninput = () => {
  document.querySelectorAll(".step")[1].classList.add("active");
};

document.getElementById("api-url").value = store.api;
document.getElementById("save-settings").onclick = () => {
  store.api = document.getElementById("api-url").value.replace(/\/$/, "");
  alert("Saved");
};

function renderReminders() {
  const ul = document.getElementById("reminder-list");
  ul.innerHTML = store.reminders.map((r, i) =>
    `<li><span>${r.med} — ${r.time}</span><button data-i="${i}" class="btn">✕</button></li>`
  ).join("");
  ul.querySelectorAll("button").forEach((b) => {
    b.onclick = () => {
      const list = store.reminders;
      list.splice(+b.dataset.i, 1);
      store.reminders = list;
      renderReminders();
    };
  });
}

document.getElementById("reminder-form").onsubmit = (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  store.reminders = [...store.reminders, { med: fd.get("med"), time: fd.get("time") }];
  e.target.reset();
  renderReminders();
};

function renderRecovery() {
  const c = store.lastCase;
  const status = document.getElementById("recovery-status");
  const metrics = document.getElementById("recovery-metrics");
  const guidance = document.getElementById("recovery-guidance");
  const flow = document.getElementById("recovery-flow");
  const startBtn = document.getElementById("start-checkin");

  if (!c) {
    startBtn.classList.remove("hidden");
    flow.classList.add("hidden");
    metrics.classList.add("hidden");
    guidance.classList.add("hidden");
    return;
  }

  startBtn.classList.add("hidden");
  flow.classList.remove("hidden");
  status.textContent = `Case ${c.case_id} · ${c.clinician_priority || "routine"} priority`;
  metrics.classList.remove("hidden");
  metrics.innerHTML = `
    <div class="metric"><strong>${c.patient.pain_score}/10</strong>Pain</div>
    <div class="metric"><strong>Day ${c.patient.post_op_day}</strong>Post-op</div>
    <div class="metric"><strong>${Math.round(c.wound.infection_risk.score * 100)}%</strong>Infection signal</div>
    <div class="metric"><strong>${Math.round(c.wound.healing_status.score * 100)}%</strong>Healing score</div>`;

  if (c.patient_guidance?.message) {
    guidance.classList.remove("hidden");
    const agent = c.patient_guidance.agent || c.triage?.agent || "PostCare";
    guidance.innerHTML = `
      <h3>AI recovery guidance</h3>
      <p class="agent-tag">${agent}</p>
      <p>${c.patient_guidance.message}</p>`;
  }
}

document.getElementById("log-form").onsubmit = async (e) => {
  e.preventDefault();
  document.querySelectorAll(".step")[2].classList.add("active");
  const msg = document.getElementById("log-msg");
  msg.textContent = "Uploading photo → MedSigLIP → PostCare-Gemini…";
  msg.className = "msg";
  const fd = new FormData(e.target);
  try {
    const res = await fetch(`${store.api}/patient/case`, { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok) throw new Error(typeof data.detail === "string" ? data.detail : res.statusText);
    store.lastCase = data;
    msg.textContent = `Done — ${data.case_id}. View recovery dashboard.`;
    msg.className = "msg ok";
    renderRecovery();
    switchTab("recovery");
  } catch (err) {
    msg.textContent = err.message;
    msg.className = "msg err";
  }
};

renderReminders();
renderRecovery();
if (store.lastCase) switchTab("recovery");
