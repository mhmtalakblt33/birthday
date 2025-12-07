// Konfeti container
const confettiContainer = document.getElementById("confetti-container");

// Sayfa yüklendiğinde konfeti sürekli aksın
window.addEventListener("load", () => {
    startConfettiInfinite();
});

// Belirli sayıda konfeti parçacığı üret
function spawnConfetti(count) {
    if (!confettiContainer) return;

    for (let i = 0; i < count; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");

        // Rastgele konum ve renk
        const startX = Math.random() * 100; // viewport %
        const endX = startX + (Math.random() * 30 - 15); // biraz sağ-sol
        const delay = Math.random() * 0.8;
        const fallTime = 3 + Math.random() * 1.5;

        const colors = ["#ff6f91", "#ff9671", "#ffc75f", "#f9f871", "#4da3ff", "#9d8bff"];
        const color = colors[Math.floor(Math.random() * colors.length)];

        confetti.style.setProperty("--x-start", startX + "vw");
        confetti.style.setProperty("--x-end", endX + "vw");
        confetti.style.background = color;
        confetti.style.left = startX + "vw";
        confetti.style.animationDuration = fallTime + "s";
        confetti.style.animationDelay = delay + "s";

        confettiContainer.appendChild(confetti);

        // Animasyon bitince elemanı sil (memory şişmesin)
        setTimeout(() => {
            confetti.remove();
        }, (fallTime + delay) * 1000);
    }
}

// Sonsuz konfeti akışı
function startConfettiInfinite() {
    // İlk burst
    spawnConfetti(40);

    // Her 400 ms'de küçük küçük at
    setInterval(() => {
        spawnConfetti(12);
    }, 400);
}
