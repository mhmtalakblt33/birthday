const memories = [
  { src: "anilar/1.jpg", date: "Mutluluğun Resmi", note: "O gün her şeyin mükemmel olduğu o nadir anlardan biriydi.", emotion: "joy", label: "NEŞE", char: "img/joy.png" },
  { src: "anilar/2.jpg", date: "Hüzünlü Vedalar", note: "Bazı bitişler yeni başlangıçların habercisidir.", emotion: "sadness", label: "HÜZÜN", char: "img/sadness.png" },
  { src: "anilar/3.jpg", date: "Kızıl Saatler", note: "Sabrımızın sınırlarını zorladığımız o meşhur gün.", emotion: "anger", label: "ÖFKE", char: "img/anger.png" },
  { src: "anilar/4.jpg", date: "Bilinmezin Eşiği", note: "Korkularımızın üzerine gitmek bizi biz yapar.", emotion: "fear", label: "KORKU", char: "img/fear.png" },
  { src: "anilar/5.jpg", date: "Tuhaf Tatlar", note: "Hala hatırladıkça yüzümüzü ekşitmemiz normal.", emotion: "disgust", label: "TİKSİNTİ", char: "img/disgust.png" },
  { src: "anilar/6.jpg", date: "Güneşin Doğuşu", note: "Umutların yeniden yeşerdiği o sabah.", emotion: "joy", label: "NEŞE", char: "img/joy.png" },
  { src: "anilar/7.jpg", date: "Yağmurlu Sokaklar", note: "Islanmanın tadını çıkardığımız o sessiz yürüyüş.", emotion: "sadness", label: "HÜZÜN", char: "img/sadness.png" },
  { src: "anilar/8.jpg", date: "Beklenmedik Anlar", note: "Şaşkınlığımızı gizleyemediğimiz o büyük sürpriz.", emotion: "joy", label: "NEŞE", char: "img/joy.png" },
  { src: "anilar/9.jpg", date: "Sessiz Direniş", note: "Haksızlığa karşı sustuğumuz ama çok şey anlattığımız gün.", emotion: "anger", label: "ÖFKE", char: "img/anger.png" },
  { src: "anilar/10.jpg", date: "Gece Mavisi", note: "Yıldızların altında kurulan o derin hayaller.", emotion: "fear", label: "KORKU", char: "img/fear.png" },
  { src: "anilar/11.jpg", date: "İlk Adımlar", note: "Yeni bir yola çıkmanın heyecanı ve tatlı telaşı.", emotion: "joy", label: "NEŞE", char: "img/joy.png" },
  { src: "anilar/12.jpg", date: "Bulutların Üstü", note: "Kendimizi dünyanın tepesinde hissettiğimiz o an.", emotion: "joy", label: "NEŞE", char: "img/joy.png" },
  { src: "anilar/13.jpg", date: "Eski Defterler", note: "Geçmişin tozlu sayfalarında bir yolculuk.", emotion: "sadness", label: "HÜZÜN", char: "img/sadness.png" },
  { src: "anilar/14.jpg", date: "Fırtına Öncesi", note: "Her şeyin sakin ama gergin olduğu o an.", emotion: "fear", label: "KORKU", char: "img/fear.png" },
  { src: "anilar/15.jpg", date: "Son Durak", note: "Bu yolculuğun en güzel, en anlamlı karesi.", emotion: "joy", label: "NEŞE", char: "img/joy.png" }
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
  // CSS'teki duygu renklerini al
  const color = getComputedStyle(document.documentElement).getPropertyValue(`--${m.emotion}`).trim();
  
  document.documentElement.style.setProperty('--accent', color);
  
  const img = document.getElementById('mainImage');
  const textInfo = document.getElementById('textInfo');
  const charBox = document.getElementById('charBox');

  // Çıkış Animasyonu
  img.style.opacity = "0";
  textInfo.classList.remove('text-active');

  setTimeout(() => {
    // İçerikleri Değiştir
    img.src = m.src;
    document.getElementById('memoryDate').textContent = m.date;
    document.getElementById('memoryNote').textContent = m.note;
    document.getElementById('emotionTag').textContent = m.label;
    
    // Sayaç güncelleme (Örn: 01 / 15)
    document.getElementById('counter').textContent = `${(currentIndex + 1).toString().padStart(2, '0')} / ${memories.length.toString().padStart(2, '0')}`;
    
    charBox.innerHTML = `<img src="${m.char}" alt="character">`;

    // Giriş Animasyonu tetikle
    img.style.opacity = "1";
    textInfo.classList.add('text-active');

    // Aktif Noktayı Güncelle
    document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === currentIndex));
    
    isAnimating = false;
  }, 400);
}

function nextMemory() {
  if (isAnimating) return;
  currentIndex = (currentIndex + 1) % memories.length;
  updateUI();
}

window.onload = updateUI;