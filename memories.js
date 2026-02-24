const memories = [
  { src: "anilar/1.jpg", date: "Mutluluğun Resmi", note: "O gün her şeyin mükemmel olduğu o nadir anlardan biriydi.", emotion: "joy", label: "NEŞE", char: "img/joy.png" },
  { src: "anilar/2.jpg", date: "Hüzünlü Vedalar", note: "Bazı bitişler yeni başlangıçların habercisidir.", emotion: "sadness", label: "HÜZÜN", char: "img/sadness.png" },
  { src: "anilar/3.jpg", date: "Kızıl Saatler", note: "Sabrımızın sınırlarını zorladığımız o meşhur gün.", emotion: "anger", label: "ÖFKE", char: "img/anger.png" },
  { src: "anilar/4.jpg", date: "Bilinmezin Eşiği", note: "Korkularımızın üzerine gitmek bizi biz yapar.", emotion: "fear", label: "KORKU", char: "img/fear.png" },
  { src: "anilar/5.jpg", date: "Tuhaf Tatlar", note: "Hala hatırladıkça yüzümüzü ekşitmemiz normal.", emotion: "disgust", label: "TİKSİNTİ", char: "img/disgust.png" }
];

let currentIndex = 0;
let isAnimating = false;

// Sayfa yüklendiğinde noktaları oluştur
const dotsContainer = document.getElementById('orbCarousel');
memories.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'dot';
  dot.onclick = () => { if(!isAnimating) { currentIndex = i; updateUI(); } };
  dotsContainer.appendChild(dot);
});

function updateUI() {
  isAnimating = true;
  const m = memories[currentIndex];
  const color = getComputedStyle(document.documentElement).getPropertyValue(`--${m.emotion}`).trim();
  
  // Renk Temasını Güncelle
  document.documentElement.style.setProperty('--accent', color);
  
  const img = document.getElementById('mainImage');
  const text = document.querySelector('.text-info');
  const charBox = document.getElementById('charBox');
  
  // Çıkış Animasyonu
  img.style.opacity = "0";
  img.style.transform = "scale(0.98) translateY(10px)";
  text.style.opacity = "0";
  charBox.style.opacity = "0";

  setTimeout(() => {
    // İçerikleri Değiştir
    img.src = m.src;
    document.getElementById('memoryDate').textContent = m.date;
    document.getElementById('memoryNote').textContent = m.note;
    document.getElementById('emotionTag').textContent = m.label;
    document.getElementById('counter').textContent = `${(currentIndex + 1).toString().padStart(2, '0')} / ${memories.length.toString().padStart(2, '0')}`;
    
    // Karakteri Güncelle
    charBox.innerHTML = `<img src="${m.char}" alt="character">`;

    // Aktif Noktayı Güncelle
    document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === currentIndex));

    // Giriş Animasyonu
    img.style.opacity = "1";
    img.style.transform = "scale(1) translateY(0)";
    text.style.opacity = "1";
    charBox.style.opacity = "1";
    
    isAnimating = false;
  }, 400);
}

function nextMemory() {
  if (isAnimating) return;
  currentIndex = (currentIndex + 1) % memories.length;
  updateUI();
}

// Başlat
window.onload = updateUI;