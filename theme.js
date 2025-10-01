
// Theme manager for Dave Level 3 site
// Persists to localStorage and applies CSS vars to :root
const THEMES = {
  "Dave (Blue/Purple)": {
    "--bg":"#0b0f17","--card":"#121826","--text":"#e6eefc","--muted":"#8892a6",
    "--acc":"#6ee7ff","--acc2":"#a78bfa"
  },
  "College (Red/Gold)": {
    "--bg":"#140d0d","--card":"#1e1414","--text":"#ffe8d9","--muted":"#d7b8a5",
    "--acc":"#ef4444","--acc2":"#f59e0b"
  },
  "Mono Teal": {
    "--bg":"#0b1616","--card":"#0f1f21","--text":"#e5fffb","--muted":"#95bdb7",
    "--acc":"#22d3ee","--acc2":"#14b8a6"
  },
  "Midnight Neon": {
    "--bg":"#05070f","--card":"#0a0f20","--text":"#eaf2ff","--muted":"#93a7d0",
    "--acc":"#22c55e","--acc2":"#60a5fa"
  }
};

export function applyTheme(name){
  const vars = THEMES[name] || THEMES["Dave (Blue/Purple)"];
  const root = document.documentElement;
  Object.entries(vars).forEach(([k,v])=>root.style.setProperty(k, v));
  localStorage.setItem("l3_theme", name);
}

export function initTheme(){
  const name = localStorage.getItem("l3_theme") || "Dave (Blue/Purple)";
  applyTheme(name);
  // set dropdown to current if present
  const sel = document.getElementById("themePicker");
  if(sel){ sel.innerHTML = Object.keys(THEMES).map(k=>`<option ${k===name?'selected':''}>${k}</option>`).join(""); }
  // apply saved logo if present
  const logo = localStorage.getItem("l3_logo");
  if(logo){ const imgs=document.querySelectorAll("#siteLogo"); imgs.forEach(img=>img.src=logo); }
}

export function handleThemePicker(){
  const sel = document.getElementById("themePicker");
  if(sel) sel.onchange = ()=>applyTheme(sel.value);
}

export function handleLogoUpload(){
  const input = document.getElementById("logoUpload");
  if(!input) return;
  input.onchange = ()=>{
    const f = input.files?.[0]; if(!f) return;
    const reader = new FileReader();
    reader.onload = ()=>{
      const data = reader.result;
      localStorage.setItem("l3_logo", data);
      document.querySelectorAll("#siteLogo").forEach(img=>img.src=data);
    };
    reader.readAsDataURL(f);
  };
}
