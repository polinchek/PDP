document.addEventListener('DOMContentLoaded', function() {
  // Обработка выпадающего меню
  if (window.innerWidth <= 768) {
      document.querySelectorAll('.dropbtn').forEach(function(btn) {
          btn.addEventListener('click', function(e) {
              e.preventDefault();
              const dropdown = this.closest('.dropdown');
              dropdown.classList.toggle('active');
          });
      });
  }

  // Обработка модальных окон услуг
  document.querySelectorAll('.btn-details').forEach(function(button) {
      button.addEventListener('click', function() {
          const serviceId = this.getAttribute('data-service');
          document.getElementById(serviceId + '-modal').style.display = 'flex';
      });
  });

  // Обработка кнопок "Заказать услугу"
  document.querySelectorAll('.btn-order').forEach(function(button) {
      button.addEventListener('click', function() {
          const serviceName = this.getAttribute('data-service');
          const modal = this.closest('.modal');
          modal.style.display = 'none';
          
          const bookingModal = document.getElementById('modal');
          bookingModal.style.display = 'flex';
          
          const serviceSelect = document.getElementById('service');
          serviceSelect.value = serviceName;
      });
  });

  // Обработка кнопок "Записаться" и "Забронировать студию"
  document.querySelectorAll('[href*="#booking"], .btn-hero').forEach(function(button) {
      button.addEventListener('click', function(e) {
          e.preventDefault();
          document.getElementById('modal').style.display = 'flex';
      });
  });

  // Закрытие модальных окон
  document.querySelectorAll('.close-modal').forEach(function(closeBtn) {
      closeBtn.addEventListener('click', function() {
          this.closest('.modal').style.display = 'none';
      });
  });

  // Закрытие модальных окон при клике вне их
  window.addEventListener('click', function(event) {
      if (event.target.classList.contains('modal')) {
          event.target.style.display = 'none';
      }
  });

  // Бургер-меню
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  
  if (burger && nav) {
      burger.addEventListener('click', function() {
          this.classList.toggle('active');
          nav.classList.toggle('active');
      });
  }
  
  // Фиксированный хедер
  window.addEventListener('scroll', function() {
      const header = document.getElementById('header');
      if (window.scrollY > 100) {
          header.classList.add('scrolled');
      } else {
          header.classList.remove('scrolled');
      }
  });

  // Обработка формы бронирования
 const API_URL = 'https://localhost:7288/swagger/index.html';

async function submitBooking(data) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || error.message || 'Server error');
    }

    return await response.json();
}

document.getElementById('bookingForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: e.target.elements.name.value.trim(),
        phone: e.target.elements.phone.value.trim(),
        email: e.target.elements.email.value.trim(),
        service: e.target.elements.service.value,
        date: e.target.elements.date.value,
        time: e.target.elements.time.value,
        comment: e.target.elements.comment?.value.trim() || null
    };

    try {
        // Валидация
        if (!formData.name || !formData.phone || !formData.service) {
            throw new Error('Заполните обязательные поля');
        }

        const result = await submitBooking(formData);
        showSuccess(result.message);
        e.target.reset();
    } catch (error) {
        showError(error.message);
    }
});

function showSuccess(message) {
    alert(`✅ ${message}`);
}

function showError(message) {
    alert(`❌ Ошибка: ${message}`);
}

// Обработка модального окна услуг
document.addEventListener('DOMContentLoaded', function() {
    const modalButtons = document.querySelectorAll('.modal-open');
    const modal = document.getElementById('serviceModal');
    const modalContent = document.getElementById('modalServiceContent');
    const closeButton = document.querySelector('.modal-close');
    
    // Данные услуг
    const services = {
        vocal: {
            title: "Запись вокала",
            description: "Профессиональная запись вокала с использованием микрофонов Neumann U87 и Avalon VT-737sp. Мы предлагаем индивидуальный подход к каждому вокалисту и помощь в настройке оптимального звучания.",
            price: "от 3 000 ₽/час",
            details: [
                "Использование профессионального оборудования",
                "Акустически обработанное помещение",
                "Опытный звукорежиссер",
                "Предварительная консультация"
            ]
        },
        instruments: {
            title: "Запись инструментов",
            description: "Качественная запись акустических и электронных инструментов. Мы имеем опыт работы с гитарами, ударными, клавишными и оркестровыми инструментами.",
            price: "от 2 500 ₽/час",
            details: [
                "Широкий выбор микрофонов",
                "Амплифицированная и DI запись",
                "Профессиональная обработка",
                "Гибкие тарифы"
            ]
        },
        mixing: {
            title: "Сведение треков",
            description: "Профессиональное сведение многодорожечных записей для получения сбалансированного и коммерческого звучания. Работаем во всех популярных жанрах.",
            price: "от 5 000 ₽/трек",
            details: [
                "Баланс инструментов и вокала",
                "Пространственная обработка",
                "Динамическая обработка",
                "До 3 правок включено"
            ]
        },
        mastering: {
            title: "Мастеринг",
            description: "Финальная обработка трека для достижения коммерческого уровня громкости и качества звука. Подготовка трека к публикации на всех платформах.",
            price: "от 3 500 ₽/трек",
            details: [
                "Оптимизация громкости",
                "Коррекция частотного баланса",
                "Подготовка для стриминга",
                "Форматы: WAV, MP3, FLAC"
            ]
        },
        composition: {
            title: "Написание музыки",
            description: "Создание оригинальной музыки и аранжировок под ваш проект. Работаем в различных жанрах от поп-музыки до кинематографических саундтреков.",
            price: "от 15 000 ₽/трек",
            details: [
                "Индивидуальный подход",
                "Полные аранжировки",
                "Работа с текстами",
                "Неограниченные правки"
            ]
        },
        sounddesign: {
            title: "Саунд-дизайн",
            description: "Создание звуковых эффектов и атмосферы для видео, игр и мультимедиа проектов. Полный цикл производства звука для вашего продукта.",
            price: "от 10 000 ₽/проект",
            details: [
                "Звуковые эффекты",
                "Атмосферные лупы",
                "Адаптивный звук для игр",
                "Синхронизация с видео"
            ]
        }
    };

    // Открытие модального окна
    modalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            const serviceData = services[service];
            
            let detailsHtml = '';
            serviceData.details.forEach(item => {
                detailsHtml += `<li>${item}</li>`;
            });
            
            modalContent.innerHTML = `
                <h2>${serviceData.title}</h2>
                <p class="service-modal-description">${serviceData.description}</p>
                <div class="service-price">${serviceData.price}</div>
                <h3>Что включено:</h3>
                <ul class="service-details">${detailsHtml}</ul>
                <button class="btn btn-hero" onclick="window.location.href='contacts.html#booking'">Записаться</button>
            `;
            
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    // Закрытие модального окна
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Закрытие при клике вне окна
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Инициализация слайдера
document.addEventListener('DOMContentLoaded', function() {
    // Слайдер студии
    const studioSwiper = new Swiper('.studio-slider .swiper', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Бургер-меню
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    
    if (burger && nav) {
        burger.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    // Фиксированный хедер при скролле
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Слайдер
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    const slideCount = slides.length;
    let slideInterval;
    
    // Инициализация слайдера
    function initSlider() {
        updateSlider();
        startAutoSlide();
        
        // Обработчики событий
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
                resetAutoSlide();
            });
        });
        
        // Пауза при наведении
        slider.addEventListener('mouseenter', pauseAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Обновление позиции слайдера
    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Следующий слайд
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlider();
        resetAutoSlide();
    }
    
    // Предыдущий слайд
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSlider();
        resetAutoSlide();
    }
    
    // Автопрокрутка
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function pauseAutoSlide() {
        clearInterval(slideInterval);
    }
    
    function resetAutoSlide() {
        pauseAutoSlide();
        startAutoSlide();
    }
    
    // Рейтинг звёздами
    const stars = document.querySelectorAll('.rating-stars span');
    let currentRating = 0;
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            currentRating = rating;
            
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
        
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('hover');
                } else {
                    s.classList.remove('hover');
                }
            });
        });
        
        star.addEventListener('mouseout', function() {
            stars.forEach(s => s.classList.remove('hover'));
        });
    });
    
    // Превью загруженного фото
    const photoInput = document.getElementById('review-photo');
    const photoPreview = document.getElementById('photo-preview');
    
    photoInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = function(event) {
                photoPreview.innerHTML = `
                    <img src="${event.target.result}" alt="Превью фото">
                    <button class="remove-photo" id="remove-photo">×</button>
                `;
                
                document.getElementById('remove-photo').addEventListener('click', function() {
                    photoPreview.innerHTML = '';
                    photoInput.value = '';
                });
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    // Отправка формы отзыва
    document.getElementById('submit-review').addEventListener('click', async function() {
        const name = document.getElementById('user-name').value.trim();
        const text = document.getElementById('review-text').value.trim();
        const photo = photoInput.files[0];
        const rating = currentRating;
        
        if (!name || !text || rating === 0) {
            alert('Пожалуйста, заполните все обязательные поля и поставьте оценку!');
            return;
        }
        
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('text', text);
            formData.append('rating', rating);
            if (photo) formData.append('photo', photo);
            
            const response = await fetch('https://your-api-url/api/reviews', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                const result = await response.json();
                alert('Спасибо за ваш отзыв! После модерации он появится на сайте.');
                
                // Очистка формы
                document.getElementById('user-name').value = '';
                document.getElementById('review-text').value = '';
                photoPreview.innerHTML = '';
                photoInput.value = '';
                stars.forEach(star => star.classList.remove('active'));
                currentRating = 0;
            } else {
                throw new Error('Ошибка при отправке отзыва');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Произошла ошибка при отправке отзыва. Пожалуйста, попробуйте еще раз.');
        }
    });
    
    // Инициализация
    initSlider();
});
});