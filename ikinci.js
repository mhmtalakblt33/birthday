// ========== ELEMENTLER ==========
const blowBtn = document.getElementById("blowBtn");
const statusEl = document.getElementById("status");
const candles = Array.from(document.querySelectorAll(".candle"));

const giftArea = document.getElementById("giftArea");
const giftBtn = document.getElementById("giftBtn");

// Menü
const menuOverlay = document.getElementById("menuOverlay");
const panels = document.querySelectorAll(".panel");

// Anılar
const prevMem = document.getElementById("prevMem");
const nextMem = document.getElementById("nextMem");
const memImg  = document.getElementById("memImg");
const memNote = document.getElementById("memNote");
const memCount= document.getElementById("memCount");

// Mektup
const letterName = document.getElementById("letterName");
const letterText = document.getElementById("letterText");

// ========== DURUM ==========
let blown = false;

// ========== ÜFLE ==========
function blowOut(){
  if (blown) return;
  blown = true;

  blowBtn.disabled = true;
  statusEl.textContent = "Üflendi… mumlar sönüyor!";

  candles.forEach((c, i) => {
    setTimeout(() => c.classList.add("blown"), i * 90);
  });

  setTimeout(() => {
    giftArea.classList.remove("hidden");
    statusEl.textContent = "Sürpriz hazır 🎁";
  }, 2000);
}

blowBtn.addEventListener("click", blowOut);

// ========== MENÜ ==========
function showPanel(id){
  panels.forEach(p => p.classList.remove("active"));
  const el = document.getElementById(id);
  if (el) el.classList.add("active");
}

function openMenu(){
  menuOverlay.classList.remove("hidden");
  showPanel("panelMain");
}

function closeMenu(){
  menuOverlay.classList.add("hidden");
}

// hediye tıkla -> menü aç
giftBtn.addEventListener("click", () => {
  giftBtn.classList.add("open");
  openMenu();
});

// menu click
menuOverlay.addEventListener("click", (e) => {
  const goBtn = e.target.closest("[data-go]");
  const backBtn = e.target.closest("[data-back]");
  const closeBtn = e.target.closest("[data-close]");

  if (goBtn){
    const go = goBtn.dataset.go; // friends/memories/reasons/surprise
    const panelId = "panel" + go.charAt(0).toUpperCase() + go.slice(1);
    showPanel(panelId);
    return;
  }
  if (backBtn){
    showPanel("panelMain");
    return;
  }
  if (closeBtn){
    closeMenu();
    return;
  }

  // dışa tıklayınca kapatmak istersen:
  // if (e.target === menuOverlay) closeMenu();
});

// ========== ARKADAŞ MEKTUPLARI ==========
const letters = [
  { name:"İsim 1", text:"Buraya 1. kişinin mesajı gelecek." },
  { name:"İsim 2", text:"Buraya 2. kişinin mesajı gelecek." },
  { name:"İsim 3", text:"Buraya 3. kişinin mesajı gelecek." },
  { name:"İsim 4", text:"Buraya 4. kişinin mesajı gelecek." },
  { name:"İsim 5", text:"Buraya 5. kişinin mesajı gelecek." },
  { name:"İsim 6", text:"Buraya 6. kişinin mesajı gelecek." },
  { name:"İsim 7", text:"Buraya 7. kişinin mesajı gelecek." },
];

document.querySelectorAll("[data-letter]").forEach(btn => {
  btn.addEventListener("click", () => {
    const i = Number(btn.dataset.letter);
    const l = letters[i];
    if (!l) return;
    letterName.textContent = l.name;
    letterText.textContent = l.text;
    showPanel("panelLetter");
  });
});

// ========== ANILAR (21 FOTO) ==========
const memImgs = Array.from({length:21}, (_,i)=> `anilar/${i+1}.jpg`);
const memNotes = memImgs.map((_,i)=> `Anı ${i+1} notu`);

let memIndex = 0;

function updateMem(){
  if (!memImg) return;
  memImg.src = memImgs[memIndex];
  memNote.textContent = memNotes[memIndex];
  memCount.textContent = `${memIndex+1} / ${memImgs.length}`;
}
updateMem();

if (prevMem) prevMem.addEventListener("click", () => {
  memIndex = (memIndex - 1 + memImgs.length) % memImgs.length;
  updateMem();
});
if (nextMem) nextMem.addEventListener("click", () => {
  memIndex = (memIndex + 1) % memImgs.length;
  updateMem();
});
