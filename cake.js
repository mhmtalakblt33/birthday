const flame = document.getElementById('flame');
const blowBtn = document.getElementById('blowBtn');
const wishText = document.getElementById('wishText');

blowBtn.addEventListener('click', () => {
    // Sönme Efekti
    flame.style.transition = "all 0.5s ease";
    flame.style.opacity = "0";
    flame.style.transform = "scale(0) translateY(-20px)";
    
    setTimeout(() => {
        flame.style.display = "none";
        wishText.textContent = "Mutlu Yıllar Prenses! ✨";
        wishText.style.color = "#ffb7c5";
        
        blowBtn.innerHTML = "Hediyeni Gör 🎁";
        blowBtn.onclick = () => {
            document.body.style.opacity = "0";
            setTimeout(() => window.location.href = "gift.html", 800);
        };
    }, 500);
});
