function pad2(n){ return String(n).padStart(2,"0"); }
function clamp(v,a,b){ return Math.min(b, Math.max(a,v)); }

// UTC: gün kayması olmasın
const START_MS = Date.UTC(2005, 6, 22, 0, 0, 0);
const END_MS   = Date.UTC(2026, 6, 22, 0, 0, 0);

const DURATION_MS = 33000;

// başta/sonda yavaş
function easeInOutCubic(t){
  return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3)/2;
}

// DOM
const dEl = document.getElementById("dVal");
const mEl = document.getElementById("mVal");
const yEl = document.getElementById("yVal");

const startBtn = document.getElementById("startBtn");
const nextBtn  = document.getElementById("nextBtn");
const hint     = document.getElementById("hint");

const progressWrap = document.getElementById("progressWrap");
const trackEl = document.getElementById("track");
const fillEl  = document.getElementById("fill");
const moverEl = document.getElementById("mover");
const ageEl   = document.getElementById("age");

const babyLayer = document.querySelector("#mover .layer.baby");
const womanLayer = document.querySelector("#mover .layer.woman");

let running = false;
let lastP = 0;

function setDateUTC(ms){
  const d = new Date(ms);
  dEl.textContent = pad2(d.getUTCDate());
  mEl.textContent = pad2(d.getUTCMonth() + 1);
  yEl.textContent = String(d.getUTCFullYear());
}

function layoutForProgress(p){
  lastP = p;

  // fill
  fillEl.style.width = `${Math.round(p*100)}%`;

  // yaş 0..21
  const age = Math.round(p * 21);
  ageEl.textContent = `Yaş: ${age}`;

  // mover konum
  const leftPad = 8;
  const rightPad = 8;
  const avatarW = moverEl.offsetWidth || 46;
  const w = trackEl.clientWidth;
  const usable = Math.max(0, w - leftPad - rightPad - avatarW);
  moverEl.style.left = `${leftPad + usable * p}px`;

  // büyüme
  const scale = 1 + 0.55 * p;
  const blur = (1 - p) * 0.6;
  const bright = 1 + 0.15 * p;
  moverEl.style.transform = `translateY(-50%) scale(${scale})`;
  moverEl.style.filter = `blur(${blur}px) brightness(${bright})`;

  // crossfade bebek -> kadın
  if (babyLayer && womanLayer) {
    const wFade = clamp((p - 0.40) / 0.45, 0, 1);
    womanLayer.style.opacity = String(wFade);
    babyLayer.style.opacity = String(1 - wFade);
  }
}

function animate(){
  const t0 = performance.now();
  running = true;
  hint.textContent = "Çalışıyor…";

  function frame(now){
    const raw = clamp((now - t0) / DURATION_MS, 0, 1);
    const p = easeInOutCubic(raw);

    const curMs = START_MS + p * (END_MS - START_MS);
    setDateUTC(curMs);
    layoutForProgress(p);

    if (raw < 1) {
      requestAnimationFrame(frame);
    } else {
      // kesin bitiş
      setDateUTC(END_MS);
      layoutForProgress(1);

      hint.textContent = "Hazır.";
      progressWrap.classList.add("hidden");
      nextBtn.classList.remove("hidden");
      nextBtn.focus();
      running = false;
    }
  }

  requestAnimationFrame(frame);
}

// başlangıç
setDateUTC(START_MS);
layoutForProgress(0);

progressWrap.classList.add("hidden");
nextBtn.classList.add("hidden");
startBtn.classList.remove("hidden");
startBtn.disabled = false;

startBtn.addEventListener("click", () => {
  if (running) return;
  startBtn.disabled = true;
  startBtn.classList.add("hidden");
  progressWrap.classList.remove("hidden");
  animate();
});

nextBtn.addEventListener("click", () => {
  window.location.href = "ikinci.html";
});

window.addEventListener("resize", () => {
  layoutForProgress(lastP);
});
