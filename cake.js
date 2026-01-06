const blowBtn = document.getElementById("blowBtn");
const statusEl = document.getElementById("status");
const candles = document.querySelectorAll(".candle");
const giftArea = document.getElementById("giftArea");

let blown = false;

function blowOut() {
    if (blown) return;
    blown = true;

    blowBtn.classList.add("hidden");
    statusEl.textContent = "Dileğin tutuldu... ✨";

    // Mumları sırayla söndür
    candles.forEach((c, i) => {
        setTimeout(() => {
            const flame = c.querySelector(".flame");
            if(flame) flame.style.display = "none";
        }, i * 200);
    });

    setTimeout(() => {
        giftArea.classList.remove("hidden");
        statusEl.textContent = "Sana bir sürprizim var 🎁";
    }, 1200);
}

blowBtn.addEventListener("click", blowOut);

// Hediye butonu senin orijinal menü sistemini açacak şekilde ayarlandı
document.getElementById("giftBtn").addEventListener("click", () => {
    // Burada senin ikinci.js'deki menuOverlay açma mantığı çalışacak
    console.log("Menü açılıyor...");
    // window.location.href = "hediye.html"; // İstersen başka sayfaya da atabilirsin
});
