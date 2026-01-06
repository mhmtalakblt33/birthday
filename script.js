/**
 * Profesyonel Web Geliştirme Standartları: 
 * Temiz kod, modüler yapı ve performans optimizasyonu.
 */

// Yardımcı Fonksiyonlar
const pad2 = (n) => String(n).padStart(2, "0");
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

// Zaman Ayarları (UTC kullanarak tutarlılık sağlıyoruz)
const START_MS = Date.UTC(2005, 6, 22);
const END_MS = Date.UTC(2026, 6, 22);
const DURATION_MS = 10000; // 10 saniye sürecek yolculuk

// Yumuşak Geçiş (Easing) Fonksiyonu - Daha doğal bir hareket hissi verir
function easeInOutQuart(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}

// DOM Elementleri
const elements = {
    d: document.getElementById("dVal"),
    m: document.getElementById("mVal"),
    y: document.getElementById("yVal"),
    startBtn: document.getElementById("startBtn"),
    nextBtn: document.getElementById("nextBtn"),
    hint: document.getElementById("hint"),
    progressWrap: document.getElementById("progressWrap"), // HTML'de id="progressWrap" olduğundan emin olun
    track: document.getElementById("track"),
    fill: document.getElementById("fill"),
    mover: document.getElementById("mover"),
    age: document.getElementById("age")
};

let running = false;
let lastP = 0;

/**
 * Yaşa göre emoji belirler.
 * Twemoji kütüphanesi bu metinleri yakalayıp şık görsellere dönüştürecektir.
 */
function getEmojiByAge(age) {
    if (age <= 2) return "🤱";
    if (age <= 5) return "👶";
    if (age <= 12) return "👧";
    if (age <= 17) return "👩‍🦱";
    if (age <= 19) return "👩";
    return "👱‍♀️";
}

function updateDateDisplay(ms) {
    const d = new Date(ms);
    elements.d.textContent = pad2(d.getUTCDate());
    elements.m.textContent = pad2(d.getUTCMonth() + 1);
    elements.y.textContent = d.getUTCFullYear();
}

/**
 * Arayüz yerleşimi ve emoji dönüşümü
 */
function renderFrame(p) {
    lastP = p;
    elements.fill.style.width = `${p * 100}%`;

    const currentAge = Math.floor(p * 21);
    elements.age.textContent = `Yaş: ${currentAge}`;
    
    // Emoji değişimi kontrolü
    const newEmoji = getEmojiByAge(currentAge);
    if (elements.mover.textContent !== newEmoji) {
        elements.mover.textContent = newEmoji;
        // Kritik Nokta: Yeni emojiyi her platformda iOS görünümüne zorla
        if (window.twemoji) twemoji.parse(elements.mover);
    }

    // Pozisyon Hesaplama (Responsive)
    const trackWidth = elements.track.clientWidth;
    const moverWidth = elements.mover.offsetWidth || 44;
    const padding = 10;
    const maxMove = trackWidth - moverWidth - (padding * 2);
    
    const posX = padding + (maxMove * p);
    elements.mover.style.left = `${posX}px`;

    // Hafif büyüme efekti
    const scale = 1 + (0.3 * p);
    elements.mover.style.transform = `translateY(-50%) scale(${scale})`;
}

function startJourney() {
    if (running) return;
    
    const startTime = performance.now();
    running = true;
    elements.hint.textContent = "Zaman akıyor...";
    
    function step(now) {
        const elapsed = now - startTime;
        const rawProgress = clamp(elapsed / DURATION_MS, 0, 1);
        const easedProgress = easeInOutQuart(rawProgress);

        const currentTimestamp = START_MS + easedProgress * (END_MS - START_MS);
        
        updateDateDisplay(currentTimestamp);
        renderFrame(easedProgress);

        if (rawProgress < 1) {
            requestAnimationFrame(step);
        } else {
            finalizeJourney();
        }
    }
    requestAnimationFrame(step);
}

function finalizeJourney() {
    running = false;
    updateDateDisplay(END_MS);
    renderFrame(1);
    elements.hint.textContent = "Yeni bir yaş, yeni bir başlangıç!";
    elements.nextBtn.classList.remove("hidden");
    // Küçük bir konfeti veya kutlama tetikleyicisi buraya eklenebilir
}

// Event Listeners
elements.startBtn.addEventListener("click", () => {
    elements.startBtn.classList.add("hidden");
    elements.progressWrap.classList.remove("hidden");
    startJourney();
});

elements.nextBtn.addEventListener("click", () => {
    // Sayfa geçiş animasyonu için ufak bir bekleme eklenebilir
    document.body.style.opacity = "0";
    setTimeout(() => {
        window.location.href = "cake.html";
    }, 500);
});

window.addEventListener("resize", () => renderFrame(lastP));

// İlk yükleme
updateDateDisplay(START_MS);
if (window.twemoji) twemoji.parse(document.body);
