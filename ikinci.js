const blowBtn = document.getElementById("blowBtn");
const statusEl = document.getElementById("status");
const candles = Array.from(document.querySelectorAll(".candle"));
const giftArea = document.getElementById("giftArea");
const giftBtn = document.getElementById("giftBtn");

const overlay = document.getElementById("overlay");
const sheet = document.getElementById("sheet");
const sheetClose = document.getElementById("sheetClose");

const banner = document.getElementById("banner");
const bannerName = document.getElementById("bannerName");
const bannerText = document.getElementById("bannerText");
const bannerClose = document.getElementById("bannerClose");

let blown = false;

/* 7 arkadaş notu — şimdilik placeholder, sen metinleri verince doldururum */
const letters = [
  { name: "Kişi 1", text: "İyi ki doğdun! Bugün senin günün. Hep böyle parlaman dileğiyle." },
  { name: "Kişi 2", text: "Seninle ilgili en sevdiğim şey: enerjin. Yeni yaşın çok güzel geçsin." },
  { name: "Kişi 3", text: "Nice mutlu yıllara! Dileklerin gerçek olsun." },
  { name: "Kişi 4", text: "Seninle daha çok anı biriktirelim. İyi ki varsın." },
  { name: "Kişi 5", text: "Her şey gönlünce olsun. Bugün bol bol gül." },
  { name: "Kişi 6", text: "Yeni yaşın sana güzellikler getirsin. İyi ki doğdun!" },
  { name: "Kişi 7", text: "İyi ki hayatımdasın. Nice yıllara!" },
];

function openSheet() {
  overlay.classList.remove("hidden");
  sheet.classList.remove("hidden");
  requestAnimationFrame(() => {
    overlay.classList.add("show");
    sheet.classList.add("show");
  });
}

function closeSheet() {
  overlay.classList.remove("show");
  sheet.classList.remove("show");
  setTimeout(() => {
    overlay.classList.add("hidden");
    sheet.classList.add("hidden");
  }, 260);
}

function showBanner(name, text) {
  bannerName.textContent = name;
  bannerText.textContent = text;

  banner.classList.remove("hidden");
  requestAnimationFrame(() => banner.classList.add("show"));
}

function hideBanner() {
  banner.classList.remove("show");
  setTimeout(() => banner.classList.add("hidden"), 260);
}

function blowOut() {
  if (blown) return;
  blown = true;

  blowBtn.disabled = true;
  statusEl.textContent = "Üflendi… mumlar sönüyor!";

  candles.forEach((c, i) => {
    setTimeout(() => c.classList.add("blown"), i * 90);
  });

  // 5 sn sonra hediye
  setTimeout(() => {
    giftArea.classList.remove("hidden");
    statusEl.textContent = "Sürpriz hazır 🎁";
  }, 5000);
}

blowBtn.addEventListener("click", blowOut);

giftBtn.addEventListener("click", () => {
  // kapağı hafif aç + menüyü aç
  giftBtn.classList.add("open");
  openSheet();
});

overlay.addEventListener("click", closeSheet);
sheetClose.addEventListener("click", closeSheet);

bannerClose.addEventListener("click", hideBanner);

/* Menü aksiyonları */
sheet.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;

  const action = btn.dataset.action;

  if (action === "letters") {
    // örnek: rastgele bir not göster (istersen ayrı list sayfası yaparız)
    const pick = letters[Math.floor(Math.random() * letters.length)];
    showBanner(pick.name, pick.text);
    return;
  }

  if (action === "wishes") {
    showBanner("Dilekler", "Buraya 21 dilek listesi gelecek. İstersen 3. sayfaya da yönlendirebiliriz.");
    return;
  }

  if (action === "memories") {
    showBanner("Anılar", "Foto/video bölümü burada açılabilir ya da ayrı sayfaya gidebilir.");
    return;
  }

  if (action === "back") {
    window.location.href = "index.html";
  }
});
