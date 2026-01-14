// Emojileri Apple stiline çevir
window.onload = function() {
    if (window.twemoji) {
        twemoji.parse(document.body, {
            callback: function(icon, options) {
                return 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple@14.0.0/img/apple/64/' + icon + '.png';
            }
        });
    }
};

// Renk ve Animasyon Kontrolü
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.body.className = "theme-default"; 
            const themeClass = entry.target.getAttribute('data-theme');
            if (themeClass) {
                document.body.classList.add(themeClass);
            }
            document.querySelectorAll('.snap-page').forEach(p => p.classList.remove('active'));
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.snap-page').forEach((page) => {
    observer.observe(page);
});

// İNDİRME MODALINI AÇ/KAPA
function toggleDownloadModal() {
    const modal = document.getElementById('downloadModal');
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
    } else {
        modal.classList.add('hidden');
    }
}

// RESİM BÜYÜTME (ZOOM) İŞLEMLERİ
const imageModal = document.getElementById("imageZoomModal");
const modalImg = document.getElementById("zoomedImage");

// Sayfadaki tıklanabilir resimleri bul
document.querySelectorAll('.clickable-img').forEach(img => {
    img.addEventListener('click', function() {
        imageModal.classList.remove('hidden');
        modalImg.src = this.src;
    });
});

// Kapatma Fonksiyonu
function closeImageModal() {
    imageModal.classList.add('hidden');
}