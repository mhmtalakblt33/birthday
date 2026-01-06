// Arka plan parıltıları oluştur
const starContainer = document.getElementById('stars');
for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.style.position = 'absolute';
    star.style.width = '2px';
    star.style.height = '2px';
    star.style.background = '#fff';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.opacity = Math.random();
    star.style.borderRadius = '50%';
    starContainer.appendChild(star);
}

const flame = document.getElementById('flame');
const blowBtn = document.getElementById('blowBtn');
const wishText = document.getElementById('wishText');

blowBtn.addEventListener('click', () => {
    // Mum sönme efekti
    flame.style.transition = 'all 0.5s ease';
    flame.style.opacity = '0';
    flame.style.transform = 'scale(0) translateY(-20px)';
    
    setTimeout(() => {
        flame.classList.add('off');
        wishText.textContent = "Tüm dileklerin gerçek olsun... ✨";
        wishText.style.color = "#f48fb1";
        blowBtn.innerHTML = "Hediyeni Aç 🎁";
        
        // Bir sonraki sayfaya geçiş için butonu güncelle
        blowBtn.onclick = () => {
            document.body.style.opacity = '0';
            setTimeout(() => window.location.href = "gift.html", 1000);
        };
    }, 500);
});
