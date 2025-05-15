// services.js - обработка модальных окон и форм на странице услуг

document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const modal = document.getElementById('serviceModal');
    const modalContent = document.getElementById('modalServiceContent');
    const bookingForm = document.getElementById('bookingForm');
    const serviceNameSpan = document.getElementById('serviceName');
    const selectedServiceInput = document.getElementById('selectedService');
    
    // Данные услуг
    const services = {
        'distribution': {
            title: 'Дистрибуция',
            content: `
                <h2>Дистрибуция</h2>
                <div class="service-description">
                    <div class="service-tier">
                        <h3>Дистрибуция EASY</h3>
                        <p>Размещение Вашей песни на стриминг-платформах (VK музыка, Apple Music, Яндекс.Музыка, Spotify и т.д.)</p>
                        <p class="service-price">Стоимость: 990₽</p>
                    </div>
                    <div class="service-tier">
                        <h3>Дистрибуция PRO</h3>
                        <p>Включает все из "Дистрибуция EASY" + дополнительные услуги:</p>
                        <ul>
                            <li>Ссылка на бендлинк</li>
                            <li>Проверка карточек на соответствие</li>
                            <li>Написание пресс-релиза</li>
                            <li>Отправка редакторам</li>
                            <li>Добавление в каталог ВК сторис + ВК клипы</li>
                            <li>Пресейв</li>
                            <li>Добавление видеошота в Яндекс Музыку (при наличии)</li>
                        </ul>
                        <p class="service-price">Стоимость: 2300₽</p>
                    </div>
                    <button class="btn btn-order" id="bookServiceBtn">Заказать услугу</button>
                </div>
            `
        },
        'ghostwriting': {
            title: 'Гострайтинг',
            content: `
                <h2>Гострайтинг</h2>
                <div class="service-description">
                    <p>Написание текста любой сложности!</p>
                    <p>Срок выполнения работы: 3-5 дней</p>
                    <p class="service-price">Стоимость: 3 500 ₽</p>
                    <button class="btn btn-order" id="bookServiceBtn">Заказать услугу</button>
                </div>
            `
        },
        'studio-hour': {
            title: 'Час на студии',
            content: `
                <h2>Час на студии</h2>
                <div class="service-description">
                    <p>Эта услуга предусматривает:</p>
                    <ul>
                        <li>Один час записи на студии со звукорежиссером</li>
                        <li>Или час аренды студии</li>
                    </ul>
                    <p class="service-price">Стоимость: 900 ₽</p>
                    <button class="btn btn-order" id="bookServiceBtn">Заказать услугу</button>
                </div>
            `
        },
        'mixing': {
            title: 'Сведение',
            content: `
                <h2>Сведение</h2>
                <div class="service-description">
                    <p>Услуга предусматривает дистанционное сведение трека и мастеринг песни в течении одной недели</p>
                    <p>Цена варьируется от сложности работы</p>
                    <p class="service-price">Стоимость: 3 000–7 000 ₽</p>
                    <button class="btn btn-order" id="bookServiceBtn">Заказать услугу</button>
                </div>
            `
        },
        'arrangement': {
            title: 'Аранжировка',
            content: `
                <h2>Аранжировка</h2>
                <div class="service-description">
                    <p>Профессиональная аранжировка вашего трека с учетом всех пожеланий</p>
                    <p>Стоимость зависит от сложности и жанра</p>
                    <p class="service-price">Стоимость: 4 000–15 000 ₽</p>
                    <button class="btn btn-order" id="bookServiceBtn">Заказать услугу</button>
                </div>
            `
        },
        'cover-art': {
            title: 'Обложка на трек',
            content: `
                <h2>Обложка на трек</h2>
                <div class="service-description">
                    <p>Вам предоставляется пример вашей обложки при точном и подробном описании, что именно вам нужно.</p>
                    <p>Вы можете:</p>
                    <ul>
                        <li>Скидывать пожелания или пример похожей картинки, какую сами бы хотели получить</li>
                        <li>Или оставить свою идею на усмотрение нашего классного дизайнера</li>
                    </ul>
                    <p class="service-price">Стоимость: 1 500–5 000 ₽</p>
                    <button class="btn btn-order" id="bookServiceBtn">Заказать услугу</button>
                </div>
            `
        }
    };

    // Функция для открытия модального окна с информацией об услуге
    function openServiceModal(serviceId) {
        const service = services[serviceId];
        
        if (!service) return;
        
        modalContent.innerHTML = service.content;
        serviceNameSpan.textContent = service.title;
        selectedServiceInput.value = service.title;
        
        // Показываем информацию об услуге, скрываем форму
        modalContent.style.display = 'block';
        bookingForm.style.display = 'none';
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Добавляем обработчик для кнопки "Заказать услугу"
        const bookBtn = document.getElementById('bookServiceBtn');
        if (bookBtn) {
            bookBtn.addEventListener('click', function() {
                // Показываем форму, скрываем информацию об услуге
                modalContent.style.display = 'none';
                bookingForm.style.display = 'block';
            });
        }
    }

    // Функция для закрытия модального окна
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Обработчики событий
    function setupEventListeners() {
        // Открытие модального окна при клике на кнопку "Подробнее"
        document.querySelectorAll('.modal-open').forEach(btn => {
            btn.addEventListener('click', function() {
                const serviceId = this.getAttribute('data-service');
                openServiceModal(serviceId);
            });
        });

        // Закрытие модального окна
        document.querySelector('.modal-close').addEventListener('click', closeModal);

        // Закрытие при клике вне модального окна
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });

        // Обработка формы записи
        const bookingForm = document.getElementById('serviceBookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Собираем данные формы
                const formData = {
                    service: selectedServiceInput.value,
                    name: this.elements.name.value,
                    phone: this.elements.phone.value,
                    email: this.elements.email.value,
                    comment: this.elements.comment.value
                };
                
                // Здесь можно добавить AJAX отправку формы
                console.log('Форма отправлена:', formData);
                
                // Показываем сообщение об успехе
                alert(`Ваша заявка на услугу "${formData.service}" отправлена! Мы свяжемся с вами в ближайшее время.`);
                
                // Закрываем модальное окно и сбрасываем форму
                closeModal();
                this.reset();
            });
        }
    }

    // Инициализация
    setupEventListeners();
});
// В вашем файле с формой бронирования
document.getElementById('bookingForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const bookingData = {
        name: this.elements['name'].value,
        phone: this.elements['phone'].value,
        email: this.elements['email'].value,
        date: this.elements['date'].value,
        sessionType: this.elements['sessionType'].value,
        duration: parseInt(this.elements['duration'].value)
    };

    const { saveBooking } = await import('./db.js');
    const isSuccess = await saveBooking(bookingData);
    
    if (isSuccess) {
        alert('Ваша заявка успешно отправлена!');
        this.reset();
    } else {
        alert('Произошла ошибка. Пожалуйста, попробуйте позже.');
    }
});

const audioPlayer = document.getElementById('audio-player');
if (audioPlayer) {
    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const track = this.closest('.track');
            const audioSrc = track.getAttribute('data-audio');
            
            fetch(audioSrc)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Аудиофайл не найден');
                    }
                    
                    if (audioPlayer.src.includes(audioSrc)) {
                        audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause();
                    } else {
                        audioPlayer.src = audioSrc;
                        audioPlayer.play();
                    }
                    
                    this.textContent = audioPlayer.paused ? '▶️ Воспроизвести' : '⏸️ Пауза';
                })
                .catch(error => {
                    console.error('Ошибка:', error.message);
                    this.textContent = '❌ Ошибка';
                });
        });
    });
}
