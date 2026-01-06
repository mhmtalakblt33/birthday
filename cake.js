const flame = document.getElementById('flame');
const actionBtn = document.getElementById('actionBtn');
const statusText = document.getElementById('statusText');

actionBtn.addEventListener('click', () => {
    if (!flame.classList.contains('off')) {
        // Üfleme anı
        flame.classList.add('off');
        statusText.textContent = "İyi ki doğdun Prenses! ✨";
        statusText.style.color = "#ffb7c5";
        actionBtn.textContent = "Hediyeni Gör →";
        
        // Ekranın hafifçe kararıp aydınlanması (Sinematik efekt)
        document.body.style.backgroundColor = "#000";
        setTimeout(() => {
            document.body.style.backgroundColor = "";
        }, 200);

    } else {
        // Bir sonraki sayfaya geçiş
        document.body.style.opacity = "0";
        setTimeout(() => {
            window.location.href = "gift.html"; // Buraya sonraki sayfanın adını yazarsın
        }, 800);
    }
});
