function pad2(n){ return String(n).padStart(2,"0"); }
function clamp(v,a,b){ return Math.min(b, Math.max(a,v)); }

// Başlangıç / bitiş (UTC kullanıyoruz ki 1 gün kayması olmasın)
const START_MS = Date.UTC(2005, 6, 22, 0, 0, 0); // ay 0-index: 6=Temmuz
const END_MS   = Date.UTC(2026, 6, 22, 0, 0, 0);

const DURATION_MS = 33000; // 30-35 arası: 30000-35000 yapabilirsin

// Ease-in-out (başta ve sonda yavaş)
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

const babyIcon  = document.getElementById("babyIcon");
const womanIcon = document.getElementById("womanIcon");
const moverIcon = document.getElementById("moverIcon");

// Kıvırcık siyah saç temalı basit SVG seti (başlangıç)
const BABY_SVG = `
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <radialGradient id="skinB" cx="35%" cy="30%">
      <stop offset="0" stop-color="#ffd7c2"/>
      <stop offset="1" stop-color="#f2b9a1"/>
    </radialGradient>
  </defs>
  <!-- saç (kıvırcık) -->
  <g fill="#111">
    ${Array.from({length:10}).map((_,i)=>{
      const x = 14 + i*4.2;
      const y = 14 + (i%2)*2;
      return `<circle cx="${x.toFixed(1)}" cy="${y}" r="4.2" opacity="0.95"/>`;
    }).join("")}
  </g>
  <!-- kafa -->
  <circle cx="32" cy="32" r="18" fill="url(#skinB)"/>
  <!-- gözler -->
  <circle cx="26" cy="31" r="2.2" fill="#1b1b1b"/>
  <circle cx="38" cy="31" r="2.2" fill="#1b1b1b"/>
  <!-- ağız / emzik -->
  <circle cx="32" cy="40" r="6" fill="#ff6b8a" opacity="0.9"/>
  <circle cx="32" cy="40" r="2.8" fill="#ffd7c2"/>
</svg>`;

const WOMAN_SVG = `
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <radialGradient id="skinW" cx="35%" cy="30%">
      <stop offset="0" stop-color="#ffd7c2"/>
      <stop offset="1" stop-color="#f0b39a"/>
    </radialGradient>
  </defs>

  <!-- saç (kıvırcık siyah) -->
  <g fill="#0c0c0c">
    <path d="M10 30c0-14 10-22 22-22s22 8 22 22c0 4-1 8-3 11
             2-12-6-20-19-20s-21 8-19 20c-2-3-3-7-3-11z" opacity="0.98"/>
    ${Array.from({length:14}).map((_,i)=>{
      const x = 12 + i*3.6;
      const y = 22 + (i%3)*2.2;
      return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.4" opacity="0.92"/>`;
    }).join("")}
  </g>

  <!-- yüz -->
  <circle cx="32" cy="33" r="16.8" fill="url(#skinW)"/>
  <!-- göz -->
  <circle cx="26.5" cy="32" r="2.1" fill="#1b1b1b"/>
  <circle cx="37.5" cy="32" r="2.1" fill="#1b1b1b"/>
  <!-- dudak -->
  <path d="M26 41c3 2 9 2 12 0" stroke="#c24a5f" stroke-width="2.2" stroke-linecap="round" fill="none"/>
</svg>`;

babyIcon.innerHTML = BABY_SVG;
womanIcon.innerHTML = WOMAN_SVG;
moverIcon.innerHTML = BABY_SVG; // başta bebek

let running = false;

function setDateUTC(ms){
  const d = new Date(ms);
  const day = d.getUTCDate();
  const mon = d.getUTCMonth() + 1;
  const year = d.getUTCFullYear();

  dEl.textContent = pad2(day);
  mEl.textContent = pad2(mon);
  yEl.textContent = String(year);
}

function layoutForProgress(p){
  // Fill
  fillEl.style.width = `${Math.round(p*100)}%`;

  // Yaş (0..21)
  const age = Math.round(p * 21);
  ageEl.textContent = `Yaş: ${age}`;

  // mover konumu (responsive, clientWidth ile)
  const leftPad = 8;
  const rightPad = 8;
  const avatarW = moverEl.offsetWidth || 46;

  const w = trackEl.clientWidth;
  const usable = Math.max(0, w - leftPad - rightPad - avatarW);
  const x = leftPad + usable * p;
  moverEl.style.left = `${x}px`;

  // büyüme hissi
  const scale = 1 + 0.55 * p;
  const blur = (1 - p) * 0.6;
  const bright = 1 + 0.15 * p;
  moverEl.style.transform = `translateY(-50%) scale(${scale})`;
  moverEl.style.filter = `blur(${blur}px) brightness(${bright})`;

  // bebek->kadın geçişi: p arttıkça SVG değişsin (kademeli geçiş istersen sonra morph yaparız)
  if (p < 0.55) moverIcon.innerHTML = BABY_SVG;
  else moverIcon.innerHTML = WOMAN_SVG;
}

function animate(){
  const t0 = performance.now();
  running = true;
  hint.textContent = "Çalışıyor…";

  function frame(now){
    const raw = clamp((now - t0) / DURATION_MS, 0, 1);
    const
