document.addEventListener('DOMContentLoaded', function() {
    // Данные проектов
    const portfolioData = [
        {
            id: 1,
            title: 'Трек "don&#39t stp"',
            artist: 'savchiik',
            description: 'Запись, сведение и мастеринг MAXIMUM RECORDS',
            year: '2024',
            genre: 'Хип-Хоп, Рэп',
            category: 'track',
            image: 'D:/Сайтик/image/DNT.jpg',
            audio: 'D:/Сайтик/music/DNT.wav'
        },
        {
            id: 2,
            title: 'Трек "Barracuda"',
            artist: 'FESFART',
            description: 'Запись, сведение и мастеринг MAXIMUM RECORDS',
            year: '2025',
            genre: 'Рэп',
            category: 'track',
            image: 'D:/Сайтик/image/barra.jpg',
            audio: 'D:/Сайтик/music/barracuda.wav'
        },
        {
            id: 3,
            title: 'Трек "кварталы"',
            artist: 'savchiikK',
            description: 'Запись, сведение и мастеринг MAXIMUM RECORDS',
            year: '2025',
            genre: 'Рэп',
            category: 'track',
            image: 'D:/Сайтик/image/kvartaly.jpg',
            audio: 'D:/Сайтик/music/kvartaly.wav'
        },

        {
            id: 4,
            title: 'Трек "Плагины йоу"',
            artist: 'FESFART',
            description: 'Запись, сведение, мастеринг и обложка MAXIMUM RECORDS ',
            year: '2025',
            genre: 'Рэп',
            category: 'track',
            image: 'D:/Сайтик/image/plaginy.png',
            audio: 'D:/Сайтик/music/plaginy.mp3'
        },

        {
            id: 5,
            title: 'Трек "Спам"',
            artist: 'ritm sердца',
            description: 'Инструментал, запись, сведение и мастеринг MAXIMUM RECORDS',
            year: '2024',
            genre: 'Рок',
            category: 'track',
            image: 'D:/Сайтик/image/SPAM.jpeg',
            audio: 'D:/Сайтик/music/SPAM.wav'
        },
        {
            id: 6,
            title: 'Трек "Свечи"',
            artist: 'Orskey',
            description: 'Инструментал, запись, сведение и мастеринг MAXIMUM RECORDS ',
            year: '2025',
            genre: 'Хип-Поп',
            category: 'track',
            image: 'D:/Сайтик/image/svechi.jpg',
            audio: 'D:/Сайтик/music/svechi.wav'
        },
          {
            id: 7,
            title: 'Пример сведения 1',
            artist: '',
            description: 'Пример сведения, сделанный в студии MAXIMUM RECORDS ',
            year: '2024',
            genre: 'Рэп / Джерси клаб',
            category: 'svedenye',
            image: 'Сведение 1',
            audio: 'D:/Сайтик/music/svedenye/pr1.mp3'
        },
        {
          id: 8,
            title: 'Пример сведения 2',
            artist: '',
            description: 'Пример сведения, сделанный в студии MAXIMUM RECORDS ',
            year: '2024',
            genre: 'Рэп ',
            category: 'svedenye',
            image: '',
            audio: 'D:/Сайтик/music/svedenye/pr2.mp3'
        },
          {
          id: 9,
            title: 'Пример сведения 3',
            artist: '',
            description: 'Пример сведения, сделанный в студии MAXIMUM RECORDS ',
            year: '2024',
            genre: 'Хип-Хоп',
            category: 'svedenye',
            image: '',
            audio: 'D:/Сайтик/music/svedenye/pr3.mp3'
        },
         {
          id: 10,
            title: 'Пример сведения 4',
            artist: '',
            description: 'Пример сведения, сделанный в студии MAXIMUM RECORDS ',
            year: '2024',
            genre: 'Рэп',
            category: 'svedenye',
            image: '',
            audio: 'D:/Сайтик/music/svedenye/pr4.mp3'
        },
         {
          id: 11,
            title: 'Пример сведения 5',
            artist: '',
            description: 'Пример сведения, сделанный в студии MAXIMUM RECORDS ',
            year: '2024',
            genre: 'Поп',
            category: 'svedenye',
            image: '',
            audio: 'D:/Сайтик/music/svedenye/pr5.mp3'
        },

    ];

   // Аудиоплеер
    const audioPlayer = document.getElementById('audio-player');
    let currentlyPlaying = null;

    // Функция для воспроизведения трека
    function playTrack(audioUrl, cardElement) {
        if (currentlyPlaying === audioUrl) {
            // Если кликаем по текущему треку - пауза/воспроизведение
            if (audioPlayer.paused) {
                audioPlayer.play();
                cardElement.querySelector('.btn-play i').className = 'fas fa-pause';
            } else {
                audioPlayer.pause();
                cardElement.querySelector('.btn-play i').className = 'fas fa-play';
            }
        } else {
            // Новый трек
            audioPlayer.src = audioUrl;
            audioPlayer.play();
            
            // Сброс предыдущей кнопки
            if (currentlyPlaying) {
                const prevCard = document.querySelector(`[data-audio="${currentlyPlaying}"]`);
                if (prevCard) {
                    prevCard.querySelector('.btn-play i').className = 'fas fa-play';
                }
            }
            
            // Обновление текущего трека
            currentlyPlaying = audioUrl;
            cardElement.querySelector('.btn-play i').className = 'fas fa-pause';
        }
    }

    // Обработчик событий аудиоплеера
    audioPlayer.addEventListener('ended', function() {
        const currentCard = document.querySelector(`[data-audio="${currentlyPlaying}"]`);
        if (currentCard) {
            currentCard.querySelector('.btn-play i').className = 'fas fa-play';
        }
        currentlyPlaying = null;
    });

    // Заполняем сетку портфолио
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    function renderPortfolio(filter = 'all') {
        portfolioGrid.innerHTML = '';
        
        const filteredProjects = filter === 'all' 
            ? portfolioData 
            : portfolioData.filter(project => project.category === filter);
        
        filteredProjects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.setAttribute('data-category', project.category);
            projectCard.setAttribute('data-audio', project.audio); // Добавляем атрибут с аудио
            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-overlay">
                        <button class="btn btn-play"><i class="fas fa-play"></i></button>
                    </div>
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p class="project-artist">${project.artist}</p>
                    <p class="project-description">${project.description}</p>
                    <div class="project-meta">
                        <span><i class="fas fa-calendar-alt"></i> ${project.year}</span>
                        <span><i class="fas fa-music"></i> ${project.genre}</span>
                    </div>
                </div>
            `;
            portfolioGrid.appendChild(projectCard);
            
            // Добавляем обработчик клика для кнопки воспроизведения
            const playBtn = projectCard.querySelector('.btn-play');
            playBtn.addEventListener('click', function(e) {
                e.preventDefault();
                playTrack(project.audio, projectCard);
            });
        });
    }

    // Инициализация фильтрации
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            renderPortfolio(filterValue);
        });
    });

    // Первоначальная загрузка портфолио
    renderPortfolio();
});