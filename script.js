// Konfeti container
const confettiContainer = document.getElementById("confetti-container");

// Sayfa yüklendiğinde konfeti başlat
window.addEventListener("load", () => {
    startConfetti(90, 1600); // (parça sayısı, toplam süre ms)
});

// Basit konfeti üretici
function startConfetti(count, duration) {
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

        // Bireysel parçayı süre bitince sil
        setTimeout(() => {
            confetti.remove();
        }, (fallTime + delay) * 1000);
    }

    // Genel süre sonunda container içini temizle
    setTimeout(() => {
        if (confettiContainer) confettiContainer.innerHTML = "";
    }, duration);
}
