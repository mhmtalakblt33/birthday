function pad2(n){ return String(n).padStart(2,"0"); }
function clamp(v,a,b){ return Math.min(b, Math.max(a,v)); }

const START_MS = Date.UTC(2005,6,22);
const END_MS   = Date.UTC(2026,6,22);
const DURATION_MS = 33000;

function easeInOut(t){
  return t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2,3)/2;
}

const dEl = document.getElementById("dVal");
const mEl = document.getElementById("mVal");
const yEl = document.getElementById("yVal");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const hint = document.getElementById("hint");

const progressWrap = document.getElementById("progressWrap");
const trackEl = document.getElementById("track");
const fillEl = document.getElementById("fill");
const moverEl = document.getElementById("mover");
const ageEl = document.getElementById("age");

let running = false;
let lastP = 0;

// Yaşa göre emoji
function emojiForByAge(age){
  if (age <= 2) return "🤱🏼";
  if (age <= 5) return "👶🏻";
  if (age <= 12) return "👧🏻";
  if (age <= 17) return "👩🏻‍🦱";
  if (age <= 19) return "👩🏻";
  return "👱🏼‍♀️";
}

function setDateUTC(ms){
  const d = new Date(ms);
  dEl.textContent = pad2(d.getUTCDate());
  mEl.textContent = pad2(d.getUTCMonth()+1);
  yEl.textContent = d.getUTCFullYear();
}

function layout(p){
  lastP = p;

  fillEl.style.width = `${Math.round(p*100)}%`;

  const age = Math.round(p * 21);
  ageEl.textContent = `Yaş: ${age}`;
  moverEl.textContent = emojiForByAge(age);

  const leftPad = 8;
  const rightPad = 8;
  const avatarW = moverEl.offsetWidth || 44;
  const w = trackEl.clientWidth;
  const usable = Math.max(0, w - leftPad - rightPad - avatarW);
  moverEl.style.left = `${leftPad + usable * p}px`;

  const scale = 1 + 0.5*p;
  moverEl.style.transform = `translateY(-50%) scale(${scale})`;
}

function animate(){
  const t0 = performance.now();
  running = true;
  hint.textContent = "Çalışıyor…";

  function frame(now){
    const raw = clamp((now - t0)/DURATION_MS, 0, 1);
    const p = easeInOut(raw);

    const cur = START_MS + p*(END_MS-START_MS);
    setDateUTC(cur);
    layout(p);

    if(raw < 1){
      requestAnimationFrame(frame);
    }else{
      setDateUTC(END_MS);
      layout(1);

      hint.textContent = "Hazır.";
      // ❌ bar gizlenmiyor
      nextBtn.classList.remove("hidden"); // ✅ alttan çıkıyor
      running = false;
    }
  }
  requestAnimationFrame(frame);
}

// başlangıç
setDateUTC(START_MS);
layout(0);
progressWrap.classList.add("hidden");
nextBtn.classList.add("hidden");

startBtn.addEventListener("click", ()=>{
  if(running) return;
  startBtn.classList.add("hidden");
  progressWrap.classList.remove("hidden");
  animate();
});

nextBtn.addEventListener("click", ()=>{
  window.location.href = "ikinci.html";
});

window.addEventListener("resize", ()=>{
  layout(lastP);
});
