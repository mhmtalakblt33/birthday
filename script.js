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
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="skinBaby" cx="35%" cy="30%">
      <stop offset="0" stop-color="#ffd8c9"/>
      <stop offset="1" stop-color="#efb29d"/>
    </radialGradient>
    <linearGradient id="hairBaby" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2a201b"/>
      <stop offset="1" stop-color="#120f0d"/>
    </linearGradient>
  </defs>

  <!-- arka saç kütlesi -->
  <path d="M12 28c0-11 8-18 20-18s20 7 20 18c0 2-.2 4-.7 5
           -1.4-10-9-14-19.3-14S14.1 23 12.7 33c-.5-1.2-.7-3-.7-5z"
        fill="url(#hairBaby)" opacity="0.98"/>

  <!-- minik topuz/pıtıklar (bebek fotoğraftaki vibe) -->
  <g fill="url(#hairBaby)" opacity="0.98">
    <circle cx="16" cy="20" r="4.2"/>
    <circle cx="48" cy="20" r="4.2"/>
  </g>

  <!-- pembe lastikler -->
  <g fill="#ff86b3" opacity="0.9">
    <circle cx="16" cy="20" r="2.2"/>
    <circle cx="48" cy="20" r="2.2"/>
  </g>

  <!-- yüz -->
  <circle cx="32" cy="34" r="17.5" fill="url(#skinBaby)"/>

  <!-- kaşlar (kalın/soft) -->
  <path d="M22.5 30c2.2-1.8 5.2-2 7.2-.8" stroke="#2a201b" stroke-width="2.2" stroke-linecap="round" opacity="0.8"/>
  <path d="M41.5 30c-2.2-1.8-5.2-2-7.2-.8" stroke="#2a201b" stroke-width="2.2" stroke-linecap="round" opacity="0.8"/>

  <!-- gözler (büyük, fotoğraftaki gibi) -->
  <g>
    <ellipse cx="26.5" cy="35" rx="3.2" ry="3.6" fill="#1c1c1c"/>
    <ellipse cx="37.5" cy="35" rx="3.2" ry="3.6" fill="#1c1c1c"/>
    <circle cx="25.5" cy="34.2" r="0.9" fill="#ffffff" opacity="0.9"/>
    <circle cx="36.5" cy="34.2" r="0.9" fill="#ffffff" opacity="0.9"/>
  </g>

  <!-- burun -->
  <path d="M32 36.5c-1.4 1.2-1.2 2.6.2 3.2" stroke="#d38f7a" stroke-width="1.6" stroke-linecap="round" fill="none" opacity="0.9"/>

  <!-- dudak (bebekte hafif) -->
  <path d="M27.5 44c2.6 2 6.4 2 9 0" stroke="#c46a7b" stroke-width="2.4" stroke-linecap="round" fill="none"/>
  <path d="M28.2 45.2c2.2 1.3 5.4 1.3 7.6 0" stroke="#ff8aa8" stroke-width="2" stroke-linecap="round" opacity="0.65"/>

  <!-- yanaklar -->
  <g opacity="0.25">
    <circle cx="22" cy="40.5" r="3.2" fill="#ff6b8a"/>
    <circle cx="42" cy="40.5" r="3.2" fill="#ff6b8a"/>
  </g>
</svg>`;

const WOMAN_SVG = `
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="skinW" cx="35%" cy="30%">
      <stop offset="0" stop-color="#ffd7c8"/>
      <stop offset="1" stop-color="#eeaf9a"/>
    </radialGradient>
    <linearGradient id="hairW" x1="0" y1="0" x2="1" y2="1">
      <!-- fotoğraftaki kahve/kumral dalgalı hissi -->
      <stop offset="0" stop-color="#3a2a22"/>
      <stop offset="0.55" stop-color="#5a4337"/>
      <stop offset="1" stop-color="#2a1e18"/>
    </linearGradient>
  </defs>

  <!-- dalgalı saç (arkada) -->
  <path d="M10 34c0-15 10-24 22-24s22 9 22 24c0 8-3 16-7 19
           1-8-1-12-5-16-3-3-8-6-10-6s-7 3-10 6c-4 4-6 8-5 16-4-3-7-11-7-19z"
        fill="url(#hairW)" opacity="0.98"/>

  <!-- öne düşen dalgalar -->
  <path d="M12 40c2 8 7 14 14 16-5-6-6-12-4-18 1-3 2-5 4-7-7 2-12 4-14 9z"
        fill="url(#hairW)" opacity="0.95"/>
  <path d="M52 40c-2 8-7 14-14 16 5-6 6-12 4-18-1-3-2-5-4-7 7 2 12 4 14 9z"
        fill="url(#hairW)" opacity="0.95"/>

  <!-- yüz -->
  <ellipse cx="32" cy="34" rx="16.2" ry="17.2" fill="url(#skinW)"/>

  <!-- kaşlar (fotoğraftaki gibi belirgin) -->
  <path d="M20.5 28.8c3.2-2.6 7.2-2.8 10-.8" stroke="#2b201b" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M43.5 28.8c-3.2-2.6-7.2-2.8-10-.8" stroke="#2b201b" stroke-width="2.6" stroke-linecap="round"/>

  <!-- gözler (bademe yakın) -->
  <g>
    <path d="M22.5 34c2-2 6-2 8 0-2 3-6 3-8 0z" fill="#1c1c1c" opacity="0.95"/>
    <path d="M33.5 34c2-2 6-2 8 0-2 3-6 3-8 0z" fill="#1c1c1c" opacity="0.95"/>
    <circle cx="27" cy="34.2" r="0.9" fill="#fff" opacity="0.9"/>
    <circle cx="38" cy="34.2" r="0.9" fill="#fff" opacity="0.9"/>
  </g>

  <!-- burun -->
  <path d="M32 35.8c-2 1.6-1.6 3.6.3 4.6" stroke="#d08975" stroke-width="1.7" stroke-linecap="round" fill="none"/>

  <!-- dudak (fotoğraftaki dolgun/ruj hissi) -->
  <path d="M24.5 44.2c3.2 3 11.8 3 15 0" stroke="#b24258" stroke-width="2.6" stroke-linecap="round" fill="none"/>
  <path d="M26 45.4c2.8 2 9.2 2 12 0" stroke="#ff6b8a" stroke-width="2.2" stroke-linecap="round" opacity="0.75"/>

  <!-- hafif kontur -->
  <path d="M19.5 34c0 10 6.2 17.2 12.5 17.2S44.5 44 44.5 34"
        stroke="rgba(0,0,0,0.10)" stroke-width="1.2" fill="none"/>
</svg>`;


babyIcon.innerHTML  = BABY_SVG;
womanIcon.innerHTML = WOMAN_SVG;

moverIcon.innerHTML = `
  <div class="morph morphBaby">${BABY_SVG}</div>
  <div class="morph morphWoman">${WOMAN_SVG}</div>
`;


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

  const babyLayer = moverIcon.querySelector(".morphBaby");
const womanLayer = moverIcon.querySelector(".morphWoman");
if (babyLayer && womanLayer) {
  // 0.00-1.00 arası yumuşak geçiş
  const w = clamp((p - 0.40) / 0.45, 0, 1); // 40% sonrası kadına doğru
  womanLayer.style.opacity = String(w);
  babyLayer.style.opacity = String(1 - w);
}

function animate(){
  const t0 = performance.now();
  running = true;
  hint.textContent = "Çalışıyor…";

  function frame(now){
    const raw = clamp((now - t0) / DURATION_MS, 0, 1);
    const
