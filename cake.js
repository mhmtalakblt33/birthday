const blowBtn = document.getElementById('blowBtn');
const progressCircle = document.querySelector('.progress-circle');
const flames = document.querySelectorAll('.flame');
const smokes = document.querySelectorAll('.smoke');
const candleGlow = document.getElementById('candleGlow');
const partyBg = document.getElementById('partyBg');
const headerMsg = document.getElementById('headerMsg');
const controls = document.getElementById('controls');
const giftBtn = document.getElementById('giftBtn');

// Halka Çevresi (r=40 -> 2*pi*40 ≈ 251)
const circumference = 251;
progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
progressCircle.style.strokeDashoffset = circumference;

let timer;
let progress = 0;
let isExtinguished = false;

// 1. Üflemeye Başla
function startBlowing(e) {
    if (e.cancelable) e.preventDefault();
    if (isExtinguished) return;

    blowBtn.style.transform = "scale(0.9)";
    
    // Alevler titresin
    flames.forEach(f => f.classList.add('blowing'));
    candleGlow.style.opacity = "0.6";

    // Halka Dolumu
    timer = setInterval(() => {
        progress += 2; // Hız
        const offset = circumference - (progress / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;

        if (progress >= 100) {
            clearInterval(timer);
            success();
        }
    }, 20);
}

// 2. Üflemeyi Bırak
function stopBlowing() {
    if (isExtinguished) return;
    
    clearInterval(timer);
    progress = 0;
    progressCircle.style.strokeDashoffset = circumference;
    
    // Reset
    blowBtn.style.transform = "scale(1)";
    flames.forEach(f => f.classList.remove('blowing'));
    candleGlow.style.opacity = "1";
}

// 3. BAŞARI: Mumlar Söndü
function success() {
    isExtinguished = true;

    // Alevleri söndür, Dumanı çıkar
    flames.forEach(f => {
        f.classList.remove('blowing');
        f.classList.add('off');
    });
    smokes.forEach(s => s.classList.add('rise'));

    // Işık Efektleri
    candleGlow.classList.add('off'); // Sarı ışık gitsin
    partyBg.classList.add('on');     // Parti ışığı gelsin

    // UI Temizliği
    controls.style.opacity = "0";
    setTimeout(() => controls.style.display = "none", 500);

    // Yazı ve Buton
    setTimeout(() => {
        headerMsg.classList.add('visible');
        giftBtn.classList.add('visible');
        launchConfetti();
    }, 1000);
}

// Konfeti
function launchConfetti() {
    if (typeof confetti === 'undefined') return;
    
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#ff4081', '#ffffff', '#ffd700'] });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#ff4081', '#ffffff', '#ffd700'] });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// Olay Dinleyicileri
blowBtn.addEventListener('mousedown', startBlowing);
blowBtn.addEventListener('mouseup', stopBlowing);
blowBtn.addEventListener('mouseleave', stopBlowing);
blowBtn.addEventListener('touchstart', startBlowing);
blowBtn.addEventListener('touchend', stopBlowing);