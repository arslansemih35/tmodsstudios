// Gelişmiş Animasyonlar için JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Parallax efekti
  initParallaxEffect();
  
  // Sayfa içi geçiş animasyonları
  initScrollAnimations();
  
  // Yetenek barları için sayaç animasyonu
  initSkillCounters();
  
  // Hero bölümü için gelişmiş arka plan animasyonu
  initWaveEffect();
  
  // Proje kartları için hover efekti
  initProjectCards();
  
  // Terminal efekti
  initTerminalEffect();
});

// Parallax efekti
function initParallaxEffect() {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    
    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-speed') || 0.1;
      const offsetY = -scrollY * speed;
      element.style.transform = `translateY(${offsetY}px)`;
    });
  });
}

// Sayfa içi geçiş animasyonları
function initScrollAnimations() {
  const sections = document.querySelectorAll('section');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    section.classList.add('section-hidden');
    sectionObserver.observe(section);
  });
  
  // CSS için eklenmesi gereken stil
  const style = document.createElement('style');
  style.textContent = `
    .section-hidden {
      opacity: 0;
      transform: translateY(50px);
      transition: opacity 1s ease, transform 1s ease;
    }
    
    .visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
}

// Yetenek barları için sayaç animasyonu
function initSkillCounters() {
  const skillSection = document.getElementById('skills');
  
  if (!skillSection) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  };
  
  const skillObserver = new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
      // Skills bölümü görünür olduğunda sayaçları başlat
      const skillPercentages = document.querySelectorAll('.skill-percentage');
      
      setTimeout(() => {
        skillPercentages.forEach((counter, index) => {
          // Her sayaç için gecikmeli animasyon
          setTimeout(() => {
            // Orijinal yüzde değerini al
            const originalText = counter.textContent;
            const targetValue = parseInt(originalText);
            let currentValue = 0;
            
            // Sayacı sıfırla
            counter.textContent = '0%';
            
            // Sayaç animasyonu
            const counterTimer = setInterval(() => {
              if (currentValue >= targetValue) {
                clearInterval(counterTimer);
              } else {
                currentValue += 1;
                counter.textContent = `${currentValue}%`;
              }
            }, 15);
          }, index * 120); // Her sayaç için gecikme ekle
        });
      }, 300); // İlk başlamadan önce kısa bir gecikme
      
      observer.unobserve(skillSection);
    }
  }, observerOptions);
  
  skillObserver.observe(skillSection);
}

// Hero bölümü için gelişmiş arka plan animasyonu
function initWaveEffect() {
  const heroSection = document.querySelector('#hero');
  if (!heroSection) return;
  
  // Canvas oluştur
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.opacity = '0.05';
  canvas.style.zIndex = '1';
  
  // Canvas'ı hero bölümüne ekle
  heroSection.style.position = 'relative';
  heroSection.style.overflow = 'hidden';
  heroSection.insertBefore(canvas, heroSection.firstChild);
  
  // Dalga parametreleri
  const waves = [
    { y: canvas.height * 0.2, wavelength: 0.02, amplitude: 20, speed: 0.01, color: '#4ade80' },
    { y: canvas.height * 0.5, wavelength: 0.03, amplitude: 15, speed: 0.015, color: '#22d3ee' },
    { y: canvas.height * 0.8, wavelength: 0.01, amplitude: 30, speed: 0.005, color: '#4ade80' }
  ];
  
  // Animasyon durumu
  let animationTime = 0;
  
  // Dalga çizme fonksiyonu
  function drawWaves() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    waves.forEach(wave => {
      ctx.beginPath();
      ctx.moveTo(0, wave.y);
      
      for (let x = 0; x < canvas.width; x++) {
        const frequency = Math.sin(x * wave.wavelength + animationTime * wave.speed);
        const y = wave.y + frequency * wave.amplitude;
        ctx.lineTo(x, y);
      }
      
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      
      ctx.fillStyle = wave.color;
      ctx.fill();
    });
    
    animationTime++;
    requestAnimationFrame(drawWaves);
  }
  
  // Animasyonu başlat
  drawWaves();
  
  // Pencere boyutu değiştiğinde canvas'ı güncelle
  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Proje kartları için hover efekti
function initProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    // İçeriği ve overlay'i seç
    const cardImage = card.querySelector('.project-image');
    const cardContent = card.querySelector('.project-content');
    const cardTags = card.querySelector('.project-tags');
    
    if (!cardImage || !cardContent) return;
    
    // Hover efekti
    card.addEventListener('mouseenter', function() {
      gsap.to(cardImage, { 
        duration: 0.3, 
        scale: 1.1, 
        opacity: 0.7
      });
      
      gsap.to(cardContent, { 
        duration: 0.3, 
        y: -10, 
        opacity: 1 
      });
      
      if (cardTags) {
        gsap.to(cardTags, {
          duration: 0.3,
          opacity: 1,
          y: 0,
          stagger: 0.05
        });
      }
    });
    
    card.addEventListener('mouseleave', function() {
      gsap.to(cardImage, { 
        duration: 0.3, 
        scale: 1, 
        opacity: 0.6
      });
      
      gsap.to(cardContent, { 
        duration: 0.3, 
        y: 0, 
        opacity: 0.9 
      });
      
      if (cardTags) {
        gsap.to(cardTags, {
          duration: 0.3,
          opacity: 0.7,
          y: 5,
          stagger: 0.05
        });
      }
    });
  });
}

// Terminal efekti
function initTerminalEffect() {
  const terminalElements = document.querySelectorAll('.terminal-body');
  
  terminalElements.forEach(terminal => {
    // Terminal içeriğini terminal komutları gibi göster
    const codeElements = terminal.querySelectorAll('p, h2, span');
    
    // Görünmez yap
    codeElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(10px)';
      element.style.transition = 'opacity 0.3s, transform 0.3s';
    });
    
    // Terminal efekti için intersection observer kullan
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const terminalObserver = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        // Terminal görünür olduğunda yazı efekti başlat
        let delay = 0;
        
        codeElements.forEach(element => {
          setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          }, delay);
          
          delay += 100; // Her satır için gecikme ekle
        });
        
        observer.unobserve(terminal);
      }
    }, observerOptions);
    
    terminalObserver.observe(terminal);
  });
} 