const body = document.body;
const page = body.dataset.page || "";
const confettiContainer = document.getElementById("confetti-container");

/* === KONFETİ – SADECE index.html === */
function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function createExplosion() {
    if (!confettiContainer) return;

    const pieces = Math.floor(rand(26, 45));
    const x = rand(10, 90);
    const y = rand(10, 80);

    for (let i = 0; i < pieces; i++) {
        const piece = document.createElement("div");
        piece.classList.add("confetti-piece");

        const colors = [
            "#ff6f91", "#ff9671", "#ffc75f",
            "#f9f871", "#4da3ff", "#9d8bff", "#7affc3"
        ];
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];

        piece.style.left = x + "vw";
        piece.style.top = y + "vh";

        const angle = rand(0, 360);
        const distance = rand(60, 180);

        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance;

        piece.style.setProperty("--end-x", endX + "vw");
        piece.style.setProperty("--end-y", endY + "vh");
        piece.style.setProperty("--rot", rand(180, 800) + "deg");
        piece.style.animationDuration = rand(0.9, 1.7) + "s";

        confettiContainer.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 2000);
    }
}

function startExplosionConfetti() {
    createExplosion();
    setInterval(() => {
        createExplosion();
    }, 700);
}

/* === PASTA SAYFASI MANTIK === */

function initPastaPage() {
    const blowButton = document.getElementById("blowButton");
    const candles = document.getElementById("candles");
    const giftArea = document.getElementById("gift-area");
    const giftBox = document.getElementById("gift-box");
    const openGiftButton = document.getElementById("openGiftButton");

    if (!blowButton || !candles) return;

    blowButton.addEventListener("click", () => {
        // Mumları söndür
        candles.classList.add("blown");

        // Butonu devre dışı bırak
        blowButton.disabled = true;
        blowButton.style.opacity = "0.7";

        // Hediye alanını göster
        if (giftArea && giftBox && openGiftButton) {
            giftArea.classList.remove("hidden");

            setTimeout(() => {
                giftBox.classList.add("drop");
            }, 350);

            giftBox.addEventListener(
                "animationend",
                () => {
                    openGiftButton.classList.remove("hidden");
                },
                { once: true }
            );

            openGiftButton.addEventListener("click", () => {
                window.location.href = "video.html";
            });
        }
    });
}

/* === SAYFAYA GÖRE ÇALIŞTIR === */

window.addEventListener("load", () => {
    if (page === "index") {
        startExplosionConfetti();
    } else if (page === "pasta") {
        initPastaPage();
    }
});

