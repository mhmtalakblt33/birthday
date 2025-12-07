const confettiContainer = document.getElementById("confetti-container");

// Sayfa yüklenince başlat
window.addEventListener("load", () => {
    startExplosionConfetti();
});

// Rastgele sayı
function rand(min, max) {
    return Math.random() * (max - min) + min;
}

// Tek bir patlama: ekrandaki rastgele noktadan 26–45 parça saçılır
function createExplosion() {
    const pieces = Math.floor(rand(26, 45));

    // Patlamanın başlayacağı rastgele koordinat
    const x = rand(10, 90); // yüzde
    const y = rand(10, 80);

    for (let i = 0; i < pieces; i++) {
        const piece = document.createElement("div");
        piece.classList.add("confetti-piece");

        // Renk paleti
        const colors = [
            "#ff6f91", "#ff9671", "#ffc75f",
            "#f9f871", "#4da3ff", "#9d8bff", "#7affc3"
        ];
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];

        // Başlangıç pozisyonu
        piece.style.left = x + "vw";
        piece.style.top = y + "vh";

        // Rastgele açı
        const angle = rand(0, 360);
        const distance = rand(60, 180); // patlama yarıçapı

        // Son hedef koordinatı hesapla
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance;

        piece.style.setProperty("--end-x", endX + "vw");
        piece.style.setProperty("--end-y", endY + "vh");
        piece.style.setProperty("--rot", rand(180, 800) + "deg");
        piece.style.animationDuration = rand(0.9, 1.7) + "s";

        confettiContainer.appendChild(piece);

        // bittiğinde kaldır
        setTimeout(() => {
            piece.remove();
        }, 2000);
    }
}

// Sürekli rastgele patlamalar
function startExplosionConfetti() {
    createExplosion(); // ilk patlama

    setInterval(() => {
        createExplosion();
    }, 700); // her 0.7 saniyede 1 patlama
}




const confettiContainer = document.getElementById("confetti-container");

// === KONFETİ SİSTEMİ (TAM EKRAN, TÜM CİHAZLAR) ===

window.addEventListener("load", () => {
    startExplosionConfetti();
});

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function createExplosion() {
    if (!confettiContainer) return;

    const pieces = Math.floor(rand(26, 45));
    const x = rand(10, 90); // vw
    const y = rand(10, 80); // vh

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

// === PASTA SAYFASI MANTIK ===

const blowButton = document.getElementById("blowButton");
const candles = document.getElementById("candles");
const giftArea = document.getElementById("gift-area");
const giftBox = document.getElementById("gift-box");
const openGiftButton = document.getElementById("openGiftButton");

// ÜFLE butonu
if (blowButton && candles) {
    blowButton.addEventListener("click", () => {
        // Mumları söndür
        candles.classList.add("blown");

        // Küçük ekstra konfeti patlaması
        createExplosion();

        // Hediye alanını göster
        if (giftArea && giftBox && openGiftButton) {
            giftArea.classList.remove("hidden");

            // Kutuyu düşür
            setTimeout(() => {
                giftBox.classList.add("drop");
            }, 350);

            // Animasyon bitince "Hediyeni Aç" butonunu göster
            giftBox.addEventListener(
                "animationend",
                () => {
                    openGiftButton.classList.remove("hidden");
                },
                { once: true }
            );
        }

        // Butonu devre dışı bırak
        blowButton.disabled = true;
        blowButton.style.opacity = "0.7";
    });
}

// Hediyeyi aç → video.html'e git
if (openGiftButton) {
    openGiftButton.addEventListener("click", () => {
        window.location.href = "video.html";
    });
}

