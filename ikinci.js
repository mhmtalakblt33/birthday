const blowBtn = document.getElementById("blowBtn");
const statusEl = document.getElementById("status");
const candles = document.querySelectorAll(".candle");
const giftWrap = document.getElementById("giftWrap");
const giftBtn = document.getElementById("giftBtn");

let blown = false;

function blowOut(){
  if (blown) return;
  blown = true;

  blowBtn.disabled = true;
  statusEl.textContent = "Üflendi… mumlar sönüyor!";

  // mumları söndür
  candles.forEach((c, i) => {
    // küçük gecikme ile daha hoş
    setTimeout(() => c.classList.add("blown"), i * 90);
  });

  // 5 sn sonra hediye kutusu gelsin
  setTimeout(() => {
    statusEl.textContent = "Sürpriz geliyor…";
    giftWrap.classList.remove("hidden");
    statusEl.textContent = "Sürpriz hazır 🎁";
  }, 5000);
}

blowBtn.addEventListener("click", blowOut);

// hediye tıkla (şimdilik örnek)
giftBtn.addEventListener("click", () => {
  // Burayı 3. sayfaya yönlendirebilir veya modal açabiliriz
  window.location.href = "ucuncu.html";
});
