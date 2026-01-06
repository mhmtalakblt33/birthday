const flame = document.getElementById('flame');
const blowBtn = document.getElementById('blowBtn');
const finalBtn = document.getElementById('finalBtn');
const msg = document.getElementById('msg');

blowBtn.addEventListener('click', () => {
    // Alevi söndür
    flame.classList.add('off');
    
    // Metni değiştir
    msg.textContent = "İyi ki doğdun! 🥳";
    msg.style.color = "#ffcc00";
    
    // Butonları değiştir
    blowBtn.classList.add('hidden');
    finalBtn.classList.remove('hidden');
    
    // Küçük bir konfeti efekti başlatılabilir (Opsiyonel)
    createConfetti();
});

function createConfetti() {
    // Buraya ileride basit bir partikül sistemi ekleyebiliriz
    console.log("Konfetiler atıldı!");
}

finalBtn.addEventListener('click', () => {
    document.body.style.opacity = "0";
    setTimeout(() => {
        window.location.href = "final.html"; // Bir sonraki sayfa
    }, 500);
});
