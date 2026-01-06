const cakePivot = document.getElementById('cakePivot');
const blowBtn = document.getElementById('blowBtn');
const flame = document.getElementById('flame');

// Gyroscope (Erişim izni gerekebilir iOS için)
function handleOrientation(event) {
    let x = event.beta;  // Ön-arka eğim
    let y = event.gamma; // Sağ-sol eğim

    // Sınırlandırma ve yumuşatma
    let rotateX = -15 + (x - 45) * 0.2; 
    let rotateY = y * 0.5;

    cakePivot.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

// iOS 13+ için izin talebi
if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    blowBtn.addEventListener('click', () => {
        DeviceOrientationEvent.requestPermission()
            .then(state => { if (state === 'granted') window.addEventListener('deviceorientation', handleOrientation); });
    });
} else {
    window.addEventListener('deviceorientation', handleOrientation);
}

// Üfleme Fonksiyonu
blowBtn.addEventListener('click', () => {
    flame.style.display = 'none';
    document.getElementById('wishText').textContent = "Mutlu Yıllar! 🎂";
    blowBtn.textContent = "Hediyeyi Gör →";
    blowBtn.onclick = () => window.location.href = "gift.html";
});
