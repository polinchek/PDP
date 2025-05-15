document.addEventListener('DOMContentLoaded', function() {
    // Инициализация рейтинга
    const stars = document.querySelectorAll('.rating-stars i');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.getAttribute('data-rating');
            document.getElementById('rating').value = rating;
            
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('fas', 'active');
                    s.classList.remove('far');
                } else {
                    s.classList.add('far');
                    s.classList.remove('fas', 'active');
                }
            });
        });
    });

    // Загрузка фото
    const fileInput = document.getElementById('reviewPhotos');
    const photoPreview = document.getElementById('photoPreview');
    
    fileInput.addEventListener('change', function() {
        photoPreview.innerHTML = '';
        
        if (this.files.length > 3) {
            alert('Можно загрузить не более 3 фотографий');
            this.value = '';
            return;
        }
        
        Array.from(this.files).forEach((file, index) => {
            if (index < 3) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const previewItem = document.createElement('div');
                    previewItem.className = 'photo-preview-item';
                    previewItem.innerHTML = `
                        <img src="${e.target.result}" alt="Превью ${index + 1}">
                        <button class="remove-photo" data-index="${index}">&times;</button>
                    `;
                    photoPreview.appendChild(previewItem);
                    
                    previewItem.querySelector('.remove-photo').addEventListener('click', function() {
                        const dt = new DataTransfer();
                        const input = document.getElementById('reviewPhotos');
                        const { files } = input;
                        
                        for (let i = 0; i < files.length; i++) {
                            if (index !== i) dt.items.add(files[i]);
                        }
                        
                        input.files = dt.files;
                        previewItem.remove();
                    });
                };
                reader.readAsDataURL(file);
            }
        });
    });

    // Модальное окно для фото
    const photoModal = document.getElementById('photoModal');
    const modalPhoto = document.getElementById('modalPhoto');
    const closeModal = document.querySelector('.close-photo-modal');
    
    closeModal.addEventListener('click', () => photoModal.style.display = 'none');
    photoModal.addEventListener('click', (e) => e.target === photoModal && (photoModal.style.display = 'none'));

    // Загрузка отзывов
    async function loadReviews() {
        try {
            const response = await fetch('/api/reviews');
            if (!response.ok) throw new Error('Ошибка загрузки отзывов');
            const reviews = await response.json();
            renderReviews(reviews);
        } catch (error) {
            console.error('Ошибка загрузки отзывов:', error);
            document.getElementById('reviewsList').innerHTML = 
                '<div class="no-reviews">Не удалось загрузить отзывы. Пожалуйста, попробуйте позже.</div>';
        }
    }

    function renderReviews(reviews) {
        const reviewsList = document.getElementById('reviewsList');
        
        if (!reviews || reviews.length === 0) {
            reviewsList.innerHTML = '<div class="no-reviews">Пока нет отзывов. Будьте первым!</div>';
            return;
        }
        
        reviewsList.innerHTML = reviews.map(review => `
            <div class="review-card">
                <div class="review-header">
                    <div class="user-info">
                        <div class="user-name">${review.userName}</div>
                        <div class="review-date">${new Date(review.createdAt).toLocaleDateString('ru-RU')}</div>
                    </div>
                    <div class="review-rating">
                        ${'<i class="fas fa-star"></i>'.repeat(review.rating)}
                        ${'<i class="far fa-star"></i>'.repeat(5 - review.rating)}
                    </div>
                </div>
                <div class="review-text">${review.text}</div>
                ${review.photos && review.photos.length > 0 ? `
                <div class="review-photos">
                    ${review.photos.map(photo => `
                        <div class="review-photo">
                            <img src="/uploads/${photo.fileName}" alt="Фото отзыва">
                        </div>
                    `).join('')}
                </div>` : ''}
            </div>
        `).join('');
        
        // Добавляем обработчики для фото в отзывах
        document.querySelectorAll('.review-photo img').forEach(img => {
            img.addEventListener('click', () => {
                modalPhoto.src = img.src;
                photoModal.style.display = 'flex';
            });
        });
    }

    // Отправка формы
    const reviewForm = document.getElementById('reviewForm');
    reviewForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const rating = document.getElementById('rating').value;
        
        if (rating === '0') {
            alert('Пожалуйста, поставьте оценку');
            return;
        }
        
        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                alert('Спасибо за ваш отзыв! После модерации он появится на сайте.');
                this.reset();
                photoPreview.innerHTML = '';
                stars.forEach(star => {
                    star.classList.add('far');
                    star.classList.remove('fas', 'active');
                });
                document.getElementById('rating').value = '0';
                loadReviews(); // Обновляем список отзывов
            } else {
                throw new Error(await response.text());
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке отзыва. Пожалуйста, попробуйте позже.');
        }
    });

    // Инициализация
    loadReviews();
});