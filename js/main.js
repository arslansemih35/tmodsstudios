// Main JavaScript for Portfolio - Semih Arslan

// DOM yüklendikten sonra çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
  // Typed.js ile yazı animasyonu
  initTyped();
  
  // AOS (Animate On Scroll) kütüphanesini başlat
  initAOS();
  
  // Yetenek barlarını animasyonla göster
  initSkillBars();
  
  // Hexagon arkaplan animasyonunu başlat
  createHexagons();
  
  // Proje kartlarına 3D Tilt efekti ekle
  initTiltEffect();
  
  // Smooth scroll işlemlerini aktifleştir
  initSmoothScroll();
  
  // Mobil menü işlemleri
  initMobileMenu();
});

// Typed.js başlatma
function initTyped() {
  if (document.getElementById('typed')) {
    new Typed('#typed', {
      strings: [
        'Yazılım Geliştirici',
        'Mobil Uygulama Uzmanı',
        'Backend API',
        'Flutter Öğrencisi',
        'Oyun Geliştiricisi'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
      startDelay: 500,
      backDelay: 1500
    });
  }
}

// AOS kütüphanesini başlatma
function initAOS() {
  AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true,
    offset: 100
  });
}

// Hexagon arkaplan animasyonu
function createHexagons() {
  const hexContainer = document.querySelector('.hex-container');
  if (!hexContainer) return;
  
  const hexCount = 20;
  
  for(let i = 0; i < hexCount; i++) {
    const hex = document.createElement('div');
    hex.classList.add('hex');
    
    // Random position
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    hex.style.left = `${x}%`;
    hex.style.top = `${y}%`;
    
    // Random size
    const size = Math.random() * 30 + 10;
    hex.style.width = `${size}px`;
    hex.style.height = `${size * 1.73}px`;
    
    // Random opacity
    hex.style.opacity = Math.random() * 0.3 + 0.1;
    
    // Random rotation
    const rotation = Math.random() * 360;
    hex.style.transform = `rotate(${rotation}deg)`;
    
    // Animation delay
    hex.style.animationDelay = `${Math.random() * 5}s`;
    
    hexContainer.appendChild(hex);
    
    // Animate hexagons with random movement
    setInterval(() => {
      const newX = parseFloat(hex.style.left) + (Math.random() * 10 - 5);
      const newY = parseFloat(hex.style.top) + (Math.random() * 10 - 5);
      const newRotation = parseFloat(hex.style.transform.replace('rotate(', '').replace('deg)', '')) + (Math.random() * 10 - 5);
      
      hex.style.left = `${Math.max(0, Math.min(100, newX))}%`;
      hex.style.top = `${Math.max(0, Math.min(100, newY))}%`;
      hex.style.transform = `rotate(${newRotation}deg)`;
    }, 5000);
  }
}

// Yetenek barlarını animasyonla gösterme
function initSkillBars() {
  const skillSection = document.getElementById('skills');
  const skillBars = document.querySelectorAll('.skill-progress');
  
  // Başlangıçta tüm barları sıfıra ayarla
  skillBars.forEach(bar => {
    bar.style.width = '0%';
  });
  
  // Intersection Observer kullanarak görünürlüğü izle
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };
  
  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Skills bölümü görünür olduğunda
        setTimeout(() => {
          skillBars.forEach((bar, index) => {
            // Her bar için gecikmeli animasyon
            setTimeout(() => {
              // Yüzde içeriğini seç
              const percentText = bar.parentElement.previousElementSibling.querySelector('.skill-percentage').textContent;
              // Yüzdeyi al ve bar genişliği olarak ayarla
              bar.style.transition = 'width 1.5s cubic-bezier(0.26, 0.86, 0.44, 0.98)';
              bar.style.width = percentText;
            }, index * 120); // Her bar için gecikme ekle
          });
        }, 300); // İlk başlamadan önce kısa bir gecikme
        
        // Sadece bir kez çalıştır
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Skills bölümünü gözlemle
  if (skillSection) {
    skillObserver.observe(skillSection);
  }
}

// Proje kartlarına 3D Tilt efekti
function initTiltEffect() {
  const cards = document.querySelectorAll('.tilt-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
      
      const mouseX = e.clientX - cardCenterX;
      const mouseY = e.clientY - cardCenterY;
      
      // Rotate based on mouse position (limited to 10 degrees)
      const rotateX = mouseY / (cardRect.height / 2) * -5;
      const rotateY = mouseX / (cardRect.width / 2) * 5;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', function() {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      setTimeout(() => {
        card.style.transform = '';
      }, 300);
    });
  });
}

// Mobil menü işlemleri
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
    
    // Mobil menüde link tıklamaları
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

// Yumuşak kaydırma işlemleri
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
}

// Navbar scroll efekti
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('header');
  
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Active link highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  let scrollY = window.pageYOffset;
  
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(`nav a[href*=${sectionId}]`).classList.add('text-primary');
    } else {
      document.querySelector(`nav a[href*=${sectionId}]`).classList.remove('text-primary');
    }
  });
}); 