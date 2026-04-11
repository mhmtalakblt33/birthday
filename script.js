// Ayarlar
const START_MS = Date.UTC(2005, 6, 22);
const END_MS = Date.UTC(2026, 6, 22);
const DURATION_MS = 60000; // 60 Saniye

// Hikaye Akışı
const storyPoints = [
    { p: 0.00, text: "Hazır mısın?" },
    { p: 0.05, text: "2005'te bir hikaye başladı." },
    { p: 0.10, text: "Bu senin hikayen." },
    { p: 0.15, text: "Küçük adımlarla başladın bu yola." },
    { p: 0.20, text: "Düştün, dizlerin kanadı..." },
    { p: 0.25, text: "Ama her seferinde daha güçlü kalktın." },
    { p: 0.30, text: "Bazen fırtınalar koptu içinde." },
    { p: 0.35, text: "Gizli gizli ağladığın geceler oldu." },
    { p: 0.40, text: "Gülüşünün etrafı güzelleştirdiği günler de." },
    { p: 0.45, text: "Değiştin, büyüdün, güzelleştin." },
    { p: 0.50, text: "Ama kalbindeki o masumiyet hep kaldı." },
    { p: 0.55, text: "Hayallerin var, umutların var." },
    { p: 0.60, text: "Belki biraz da korkuların..." },
    { p: 0.65, text: "Fakat içindeki umut, korkularından hep bir adım öndeydi." },
    { p: 0.70, text: "Geride kalan her iz, seni sen yapan en güzel detaydı." },
    { p: 0.75, text: "Bugün olduğun kişiyle gurur duy." },
    { p: 0.80, text: "Çünkü sen, her halinle çok özelsin." },
    { p: 0.85, text: "Yeni bir yaş, bembeyaz bir sayfa demek." },
    { p: 0.90, text: "Bu beyaz sayfayı doldurmak için..."},
    { p: 0.95, text: "Kalemi eline almaya var mısın?" }
        ];

const sadMessages = [
    "😯 Yapma...", "💔 Kalbim çıt...", "🥺 Gerçekten mi?",
"😢 Beni üzüyorsun", "🙄 Ama pasta var?", "🙏 Lütfen evet de!",
"😤 İnatçı şey!", "😜 Yakala beni :)", "😒 Küserim bak.",
"🧐 Son kararın mı?", "🤔 Emin misin?", "🤨 Bir daha düşün.",
"😇 Bence evet demelisin.", "🥀 Üzdün...", "🎁 Peki ya sürprizler?",
"😞 Kırma beni...", "😭 Ağlarım bak!", "😱 Ciddi olamazsın!",
"🫠 Yıkıldım şu an...", "👋 Gidiyorum ben...", "😥 Gözüme toz kaçtı..."
];

const elements = {
    d: document.getElementById("dVal"),
    m: document.getElementById("mVal"),
    y: document.getElementById("yVal"),
    startBtn: document.getElementById("startBtn"),
    card: document.getElementById("mainCard"),
    bg: document.getElementById("bgLayer"),
    bottomArea: document.getElementById("bottomArea"),
    track: document.getElementById("track"),
    fill: document.getElementById("fill"),
    mover: document.getElementById("mover"),
    age: document.getElementById("age"),
    storyText: document.getElementById("storyText"),
    finalAction: document.getElementById("finalAction"),
    nextBtn: document.getElementById("nextBtn"),
    noBtn: document.getElementById("noBtn"),
    sadContainer: document.getElementById("sadContainer")
};

let running = false;
let noClickCount = 0;
let yesScale = 1;

// --- EMOJİ FONKSİYONLARI ---
function getAppleEmojiUrl(emoji) {
    const map = {
        "🤱🏼": "1f931-1f3fc", "👶🏻": "1f476-1f3fb", "👧🏻": "1f467-1f3fb",
        "👩🏻‍🦱": "1f469-1f3fb-200d-1f9b1", "👩🏻": "1f469-1f3fb", "👱🏼‍♀️": "1f471-1f3fc-200d-2640-fe0f"
    };
    const hex = map[emoji] || "1f600";
    return `<img class="emoji" draggable="false" src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple@14.0.0/img/apple/64/${hex}.png">`;
}

function getEmojiByAge(age) {
    if (age <= 2) return "🤱🏼";
    if (age <= 5) return "👶🏻";
    if (age <= 12) return "👧🏻";
    if (age <= 17) return "👩🏻‍🦱";
    if (age <= 19) return "👩🏻";
    return "👱🏼‍♀️";
}

// --- ZAMAN GÜNCELLEME ---
const pad2 = (n) => String(n).padStart(2, "0");
function updateDateDisplay(ms) {
    const d = new Date(ms);
    elements.d.textContent = pad2(d.getUTCDate());
    elements.m.textContent = pad2(d.getUTCMonth() + 1);
    elements.y.textContent = d.getUTCFullYear();
}

// --- RENDER DÖNGÜSÜ ---
function renderFrame(p) {
    elements.fill.style.width = `${p * 100}%`;

    const trackWidth = elements.track.clientWidth;
    const moverWidth = elements.mover.offsetWidth || 50;
    const padding = 10;
    const maxMove = trackWidth - moverWidth - (padding * 2);
    elements.mover.style.left = `${padding + (maxMove * p)}px`;

    const currentAge = Math.floor(p * 21);
    elements.age.textContent = `Yaş: ${currentAge}`;
    
    const newEmojiChar = getEmojiByAge(currentAge);
    if (elements.mover.getAttribute('data-e') !== newEmojiChar) {
        elements.mover.setAttribute('data-e', newEmojiChar);
        elements.mover.innerHTML = getAppleEmojiUrl(newEmojiChar);
    }

    checkStory(p);
}

// --- HİKAYE AKIŞI ---
let currentStoryIndex = 0;
function checkStory(p) {
    if (currentStoryIndex < storyPoints.length) {
        const point = storyPoints[currentStoryIndex];
        if (p >= point.p) {
            const el = elements.storyText;
            el.style.opacity = '0';
            setTimeout(() => {
                el.textContent = point.text;
                el.classList.add('visible');
                el.style.opacity = '1';
            }, 300);
            currentStoryIndex++;
        }
    }
}

// --- BAŞLATMA ---
function handleStart() {
    if (running) return;
    elements.startBtn.style.opacity = '0.5'; 
    elements.startBtn.style.pointerEvents = 'none';
    
    // 1 Saniye Gecikme
    setTimeout(() => {
        elements.card.classList.add('minimized'); 
        elements.bg.classList.add('fade-out'); 
        elements.bottomArea.classList.remove('hidden');

        const startTime = performance.now();
        running = true;
        elements.mover.innerHTML = getAppleEmojiUrl("🤱🏼");

        function step(now) {
            const elapsed = now - startTime;
            let progress = elapsed / DURATION_MS;
            if (progress > 1) progress = 1;

            const currentMs = START_MS + progress * (END_MS - START_MS);
            
            updateDateDisplay(currentMs);
            renderFrame(progress);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                finishLine();
            }
        }
        requestAnimationFrame(step);
    }, 1000);
}

function finishLine() {
    running = false;
    elements.storyText.style.opacity = '0';
    setTimeout(() => {
        elements.finalAction.classList.remove('hidden');
        // Finalde butonu resetle (Eğer kaçmışsa geri gelsin)
        elements.noBtn.style.position = 'static'; // Yerine dönsün
        elements.noBtn.style.transform = 'translate(0,0)';
    }, 500);
}

// --- KAÇAN BUTON ve MESAJ (GELİŞTİRİLMİŞ) ---
function spawnSadMessage(x, y) {
    const msg = document.createElement('div');
    msg.className = 'sad-msg';
    msg.textContent = sadMessages[Math.floor(Math.random() * sadMessages.length)];
    
    const randomX = (Math.random() - 0.5) * 50;
    msg.style.left = `${x + randomX}px`;
    msg.style.top = `${y}px`;
    
    elements.sadContainer.appendChild(msg);
    setTimeout(() => msg.remove(), 2000);
}

function moveButton(e) {
    const btn = elements.noBtn;
    
    // BUG FIX: Butonu ilk kaçışta BODY'ye taşı ki kartın transform'undan etkilenmesin
    if (btn.parentNode !== document.body) {
        // Mevcut konumunu al
        const rect = btn.getBoundingClientRect();
        // Body'ye taşı
        document.body.appendChild(btn);
        // Eski yerine koy (görsel sıçrama olmasın)
        btn.style.position = 'fixed';
        btn.style.left = rect.left + 'px';
        btn.style.top = rect.top + 'px';
        btn.classList.add('rogue-btn'); // CSS ile stil verelim
    }

    // Mesaj spawn et
    const rect = btn.getBoundingClientRect();
    spawnSadMessage(rect.left + rect.width/2, rect.top);

    // Yeni rastgele pozisyon
    // Kenarlardan 50px pay bırak
    const maxX = window.innerWidth - btn.offsetWidth - 50;
    const maxY = window.innerHeight - btn.offsetHeight - 50;
    
    const newX = Math.max(50, Math.random() * maxX);
    const newY = Math.max(50, Math.random() * maxY);
    
    // Kaydır
    btn.style.left = `${newX}px`;
    btn.style.top = `${newY}px`;

    // --- EVET BUTONUNU BÜYÜTME ---
    noClickCount++;
    if (noClickCount % 1 === 0) {
        yesScale += 0.25;
        elements.nextBtn.style.transform = `scale(${yesScale})`;
    }
}

// Event Listeners
elements.noBtn.addEventListener('mouseover', moveButton);
elements.noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); moveButton(e); });
elements.noBtn.addEventListener('click', (e) => { e.preventDefault(); moveButton(e); });

elements.startBtn.addEventListener("click", handleStart);
elements.nextBtn.addEventListener("click", () => {
    document.body.style.opacity = "0";
    setTimeout(() => window.location.href = "cake.html", 1000);
});

window.onload = function() {
    updateDateDisplay(START_MS);
};