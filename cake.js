const flame = document.getElementById('flame');
const blowBtn = document.getElementById('blowBtn');
const wishText = document.getElementById('wish');

blowBtn.addEventListener('click', () => {
    // Söndürme animasyonu
    flame.style.transition = "all 0.6s ease";
    flame.style.opacity = "0";
    flame.style.transform = "scale(0) translateY(-20px)";
    
    setTimeout(() => {
        flame.classList.add('off');
        wishText.textContent = "Mutlu Yıllar! Her şey dilediğin gibi olsun... ✨";
        wishText.style.color = "#ffb7c5";
        
        // Butonu güncelle
        blowBtn.innerHTML = "Hediyene Git 🎁";
        blowBtn.style.borderColor = "#ffb7c5";
        
        blowBtn.onclick = () => {
            document.body.style.opacity = "0";
            setTimeout(() => window.location.href = "gift.html", 800);
        };
    }, 600);
});
