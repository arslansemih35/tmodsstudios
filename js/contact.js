// İletişim formu işlemleri için JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Form elementini seç
  const contactForm = document.getElementById('contact-form');
  const resultMessage = document.getElementById('form-result');
  
  // Form varsa
  if (contactForm) {
    // CSRF token'ı al
    let csrfToken = '';
    fetch('php/token.php')
      .then(response => response.json())
      .then(data => {
        csrfToken = data.token;
        
        // Hidden input olarak forma ekle
        const tokenInput = document.createElement('input');
        tokenInput.type = 'hidden';
        tokenInput.name = 'token';
        tokenInput.value = csrfToken;
        contactForm.appendChild(tokenInput);
      })
      .catch(error => {
        console.error('Token alınırken hata oluştu:', error);
      });
    
    // Form gönderimini işle
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Form verilerini topla
      const formData = new FormData(contactForm);
      
      // Loading durumunu göster
      if (resultMessage) {
        resultMessage.innerHTML = `
          <div class="flex items-center justify-center space-x-2 text-primary">
            <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Mesajınız gönderiliyor...</span>
          </div>
        `;
        resultMessage.classList.remove('hidden');
      }
      
      // Form verilerini PHP'ye gönder
      fetch('php/contact.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Başarılı mesaj göster
          if (resultMessage) {
            resultMessage.innerHTML = `
              <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
                <div class="flex items-center">
                  <svg class="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <p>${data.message}</p>
                </div>
              </div>
            `;
          }
          
          // Formu temizle
          contactForm.reset();
          
          // 5 saniye sonra başarı mesajını kaldır
          setTimeout(() => {
            if (resultMessage) {
              resultMessage.classList.add('hidden');
            }
          }, 5000);
          
        } else {
          // Hata mesajı göster
          let errorHtml = '';
          
          if (data.errors && Array.isArray(data.errors)) {
            // Birden fazla hata varsa liste halinde göster
            errorHtml = `
              <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                <div class="flex">
                  <svg class="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                  </svg>
                  <div>
                    <p class="font-bold">Lütfen aşağıdaki hataları düzeltin:</p>
                    <ul class="mt-2 list-disc list-inside">
            `;
            
            data.errors.forEach(error => {
              errorHtml += `<li>${error}</li>`;
            });
            
            errorHtml += `
                    </ul>
                  </div>
                </div>
              </div>
            `;
          } else {
            // Tek hata mesajı varsa
            errorHtml = `
              <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                <div class="flex items-center">
                  <svg class="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                  </svg>
                  <p>${data.message || 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.'}</p>
                </div>
              </div>
            `;
          }
          
          if (resultMessage) {
            resultMessage.innerHTML = errorHtml;
          }
        }
      })
      .catch(error => {
        // Network hatası durumunda
        console.error('Form gönderilirken hata oluştu:', error);
        
        if (resultMessage) {
          resultMessage.innerHTML = `
            <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
              <div class="flex items-center">
                <svg class="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                </svg>
                <p>Bağlantı hatası! İnternet bağlantınızı kontrol edin ve tekrar deneyin.</p>
              </div>
            </div>
          `;
        }
      });
    });
  }
}); 