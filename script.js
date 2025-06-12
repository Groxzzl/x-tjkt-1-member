// fungsi buat ngecek orang yang ulang tahun 
function checkBirthdays() {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  
  console.log('Tanggal hari ini:', currentDay, 'Bulan:', currentMonth);
  
  const cards = document.querySelectorAll('.child-card');
  
  cards.forEach(card => {
    const birthdayText = card.querySelector('.child-birthday').textContent;
    const [day, month] = birthdayText.split(' ');
    
    const monthMap = {
      'Januari': 0, 'Februari': 1, 'Maret': 2, 'April': 3,
      'Mei': 4, 'Juni': 5, 'Juli': 6, 'Agustus': 7,
      'September': 8, 'Oktober': 9, 'November': 10, 'Desember': 11
    };
    
    const birthdayDay = parseInt(day);
    const birthdayMonth = monthMap[month];
    
    console.log('Membaca ulang tahun:', birthdayDay, month, '(', birthdayMonth, ')');
    
    if (birthdayDay === currentDay && birthdayMonth === currentMonth) {
      console.log('Ulang tahun ditemukan untuk:', card.querySelector('.child-name').textContent);
      const nameElement = card.querySelector('.child-name');
      nameElement.style.color = '#ef4444';
      nameElement.style.textShadow = '0 0 8px rgba(239, 68, 68, 0.7)';
      nameElement.style.animation = 'birthdayBlink 1.5s infinite';
    }
  });
}

// buat slideshow poto
function initSlideshows() {
  const slideshows = document.querySelectorAll('.photo-slideshow');
  
  slideshows.forEach(slideshow => {
    const slides = slideshow.querySelectorAll('.photo-slide');
    let currentSlide = 0;
    
    function nextSlide() {
      // hapus active class
      slides[currentSlide].classList.remove('active');
      slides[currentSlide].classList.add('prev');
      
      // gerakin ke slide selanjutnya
      currentSlide = (currentSlide + 1) % slides.length;
      
      // nambahin aktif class slide
      slides[currentSlide].classList.remove('prev');
      slides[currentSlide].classList.add('active');
    }
    
    // Start slideshow
    setInterval(nextSlide, 3000); // ubah slide setiap 3 detik
  });
}

// buat nyalain semua pas web dibuka
document.addEventListener('DOMContentLoaded', () => {
  checkBirthdays();
  initSlideshows();
});

// ngecek tahun setiap menit
setInterval(checkBirthdays, 60000);

// Audio handling
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('backgroundMusic');
    let isPlaying = false;
    let playAttempted = false;
    
    // fungsi buat nyalain musik
    function playAudio() {
        if (isPlaying || playAttempted) return; // pengulangan
        
        playAttempted = true;
        
        audio.play()
            .then(() => {
                isPlaying = true;
                console.log("Audio playing successfully");
            })
            .catch(function(error) {
                console.log("Audio playback failed:", error);
                isPlaying = false;
                playAttempted = false; // buat reset kalo error
            });
    }
    
    // Reset flags kalo audio selesai atau pause
    audio.addEventListener('ended', () => {
        isPlaying = false;
        playAttempted = false;
    });
    
    audio.addEventListener('pause', () => {
        isPlaying = false;
        playAttempted = false;
    });
    
    // Handle audio errors
    audio.addEventListener('error', (e) => {
        console.log("Audio error:", e);
        isPlaying = false;
        playAttempted = false;
        
        // buat perbaikan otomatis jika ada error
        setTimeout(() => {
            if (!isPlaying && !playAttempted) {
                playAudio();
            }
        }, 2000);
    });
    
    // ngeplay audio pas user ngeklik
    function handleUserInteraction() {
        playAudio();
        // hapus event listener pas user ngeklik
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
    }
    
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    
    // buat preload audio
    audio.load();
    
    // ngeplay audio pas web dibuka (kalo browser ngeizin)
    if (audio.readyState >= 2) { // HAVE_CURRENT_DATA
        playAudio();
    } else {
        audio.addEventListener('canplay', () => {
            playAudio();
        }, { once: true });
    }
}); 