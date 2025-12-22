// Ay gün sayısı hesap (leap year dahil)
function daysInMonth(year, month1to12) {
  return new Date(year, month1to12, 0).getDate();
}

function clamp(v, a, b) {
  return Math.min(b, Math.max(a, v));
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

const START = { y: 2005, m: 7, d: 22 };
const END   = { y: 2026, m: 7, d: 22 };

// Süre: 30–35 sn arası; istersen sabitle.
// (Rastgele istiyorsan: 30000 + Math.random()*5000)
const DURATION_MS = 33000; // 33sn

const yEl = document.getElementById("yVal");
const mEl = document.getElementById("mVal");
const dEl = document.getElementById("dVal");

const fillEl = document.getElementById("fill");
const moverEl = document.getElementById("mover");
const pctEl = document.getElementById("pct");

const progressWrap = document.getElementById("progressWrap");
const nextBtn = document.getElementById("nextBtn");
const hint = document.getElementById("hint");

// büyüme ikon seti (emoji ile; istersen görsel/PNG ile değiştirebilirsin)
function stageFor(p) {
  // p: 0..1
  if (p < 0.20) return "👶";
  if (p < 0.45) return "🧒";
  if (p < 0.70) return "👧";
  return "👩";
}

// “Senkron” tarih üretimi:
// p ilerledikçe yıl ve ay adım adım ilerler,
// gün ise her ayın gün sayısına göre yumuşakça kayar.
function computeDateFromProgress(p) {
  // 1) Yıl
  const totalYears = END.y - START.y; // 21
  const yearFloat = START.y + p * totalYears;
  let y = Math.floor(yearFloat);

  // sınır düzelt
  y = clamp(y, START.y, END.y);

  // 2) Ay: yıl içi kalan p’ye göre 0..11
  let yearStartP = (y - START.y) / totalYears;
  let yearEndP = (y + 1 - START.y) / totalYears;
  // son yılda (2026) özel durum: sadece 7. aya kadar gideceğiz (END.m)
  const isLastYear = (y === END.y);

  // Bu yılın içindeki normalized progress (0..1)
  let inYearP = 0;
  if (yearEndP > yearStartP) inYearP = (p - yearStartP) / (yearEndP - yearStartP);
  inYearP = clamp(inYearP, 0, 1);

  const startMonthIndex = (y === START.y) ? (START.m - 1) : 0;
  const endMonthIndexExclusive = isLastYear ? (END.m) : 12; // exclusive
  const monthsThisYear = endMonthIndexExclusive - startMonthIndex;

  const monthFloat = startMonthIndex + inYearP * monthsThisYear;
  let mIndex = Math.floor(monthFloat); // 0..11
  mIndex = clamp(mIndex, startMonthIndex, endMonthIndexExclusive - 1);
  let m = mIndex + 1;

  // 3) Gün: ay içi progress ile kaydır
  const monthStartFrac = mIndex;
  const monthEndFrac = mIndex + 1;
  let inMonthP = 0;
  if (monthEndFrac > monthStartFrac) inMonthP = (monthFloat - monthStartFrac) / (monthEndFrac - monthStartFrac);
  inMonthP = clamp(inMonthP, 0, 1);

  const dim = daysInMonth(y, m);

  // Başlangıç ve bitiş aylarında günleri sabitlemeye yakın tut:
  let dMin = 1;
  let dMax = dim;

  // Start tarihinin olduğu ay/yıl için alt sınır 22
  if (y === START.y && m === START.m) dMin = START.d;

  // End tarihinin olduğu ay/yıl için üst sınır 22
  if (y === END.y && m === END.m) dMax = END.d;

  // Gün animasyonu (yumuşak) -> integer gün
  let d = Math.round(dMin + inMonthP * (dMax - dMin));
  d = clamp(d, dMin, dMax);

  return { y, m, d };
}

function animate() {
  const t0 = performance.now();

  function frame(now) {
    const elapsed = now - t0;
    const p = clamp(elapsed / DURATION_MS, 0, 1);

    // Tarih
    const cur = computeDateFromProgress(p);
    yEl.textContent = String(cur.y);
    mEl.textContent = pad2(cur.m);
    dEl.textContent = pad2(cur.d);

    // Progress
    const pct = Math.round(p * 100);
    fillEl.style.width = pct + "%";
    pctEl.textContent = pct + "%";

    // mover pozisyonu (track içinde)
    const track = progressWrap.querySelector(".track");
    const trackRect = track.getBoundingClientRect();

    // Avatar genişliği 46px; solda/sağda 8px padding var.
    const leftPad = 8;
    const rightPad = 8;
    const avatarW = 46;

    const usable = trackRect.width - leftPad - rightPad - avatarW;
    const x = leftPad + usable * p;
    moverEl.style.left = `${x}px`;

    // büyüme efekti: scale + blur + hue ile “büyüyor” hissi
    const scale = 1 + 0.55 * p;          // 1.00 -> 1.55
    const blur = (1 - p) * 0.6;          // 0.6px -> 0px
    const bright = 1 + 0.15 * p;         // hafif parlaklaşma
    moverEl.style.transform = `translateY(-50%) scale(${scale})`;
    moverEl.style.filter = `blur(${blur}px) brightness(${bright})`;

    // ikon aşaması
    moverEl.textContent = stageFor(p);

    if (p < 1) {
      requestAnimationFrame(frame);
    } else {
      // bitiş
      hint.textContent = "Hazır.";
      progressWrap.classList.add("hidden");
      nextBtn.classList.remove("hidden");
      nextBtn.focus();
    }
  }

  requestAnimationFrame(frame);
}

// buton
nextBtn.addEventListener("click", () => {
  // 2. sayfa: ikinci.html (istersen adını değiştir)
  window.location.href = "ikinci.html";
});

// başlat
hint.textContent = "Başlıyor…";
animate();
