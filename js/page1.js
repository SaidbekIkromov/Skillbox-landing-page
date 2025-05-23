// Initialize swiper for schools section
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn = document.querySelector('.close-btn');
    const body = document.body;

    function openMenu() {
        mobileMenu.classList.add('active');
        body.classList.add('menu-open');
    }

    function closeMenu() {
        mobileMenu.classList.remove('active');
        body.classList.remove('menu-open');
    }

    if (burgerMenu) {
        burgerMenu.addEventListener('click', openMenu);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }

    // Close menu when clicking on a link
    const mobileLinks = mobileMenu?.querySelectorAll('a');
    if (mobileLinks) {
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // Check if swiper exists
    if (typeof Swiper === 'undefined') {
        console.error('Swiper is not loaded. Please check the script inclusion.');
        return;
    }
    
    // Create swiper instance with explicit configuration for better desktop compatibility
    const schoolsSwiper = new Swiper('.schools-slider', {
        // Basic settings
        slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
        speed: 500,
        
        // Pagination dots
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        
        // Navigation - use custom buttons
    navigation: {
            nextEl: '.custom-next-btn',
            prevEl: '.custom-prev-btn',
    },
        
        // Responsive breakpoints
    breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
        640: {
            slidesPerView: 2,
                spaceBetween: 20
        },
        768: {
                slidesPerView: 2,
                spaceBetween: 30
        },
        1024: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });
    
    // Enhanced event handling for swiper navigation
    const prevBtn = document.querySelector('.custom-prev-btn');
    const nextBtn = document.querySelector('.custom-next-btn');
    
    // Direct click handlers
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            schoolsSwiper.slidePrev();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            schoolsSwiper.slideNext();
        });
    }
    
    // Ensure buttons are working on all browsers
    console.log('Swiper navigation initialized');

// Populate categories
const categories = [
    { title: 'Программирование', count: 1250 },
    { title: 'Маркетинг', count: 850 },
    { title: 'Дизайн', count: 720 },
    { title: 'Аналитика', count: 430 },
    { title: 'Финансы', count: 380 },
    { title: 'Управление', count: 290 },
    { title: 'Контент-маркетинг', count: 260 },
    { title: 'Иностранные языки', count: 240 }
];

const categoriesGrid = document.querySelector('.categories-grid');
    if (categoriesGrid) {
categoriesGrid.innerHTML = categories.map(category => `
    <div class="category-card">
        <h3>${category.title}</h3>
        <p>${category.count} курсов</p>
    </div>
`).join('');
    }
    
    // Course filtering
const coursesFilters = document.querySelector('.courses-filters');
    const courseCards = document.querySelectorAll('.course-card');
let activeFilter = 'Программирование';

    // Function to filter courses based on category
    function filterCourses(category) {
        
        // First hide all cards with animation
        courseCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
        });
        
        // Then show them after a small delay (simulating filtering)
        setTimeout(() => {
            courseCards.forEach(card => {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            });
        }, 300);
    }

    // Add click event to filter buttons
coursesFilters.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const newFilter = e.target.textContent;
        if (newFilter !== activeFilter) {
                // Update active button
            document.querySelector('.courses-filters button.active').classList.remove('active');
            e.target.classList.add('active');
            activeFilter = newFilter;
                
                // Filter courses
                filterCourses(activeFilter);
            }
        }
    });

    // Show More Button functionality
    const showMoreBtn = document.querySelector('.show-more');
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', () => {
            alert('В реальном приложении здесь будут загружены дополнительные курсы');
        });
    }

    // Course direction categories
    const directionCategories = document.querySelectorAll('.direction-categories li');
    directionCategories.forEach(category => {
        category.addEventListener('click', () => {
            document.querySelector('.direction-categories li.active').classList.remove('active');
            category.classList.add('active');
        });
    });

    // Course Filters
    const courseFilters = document.querySelectorAll('.courses-filters button');
    courseFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            document.querySelector('.courses-filters button.active').classList.remove('active');
            filter.classList.add('active');
        });
    });

    // Helper function to format price
    function formatPrice(price) {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    }

    // Helper function to format rating
    function formatRating(rating) {
        return rating.toFixed(1);
    }

    // Course card template
    function createCourseCard(course) {
        return `
            <div class="course-card">
                <div class="course-header">
                    <h3>${course.title}</h3>
                    <div class="school-info">
                        <img src="${course.schoolLogo}" alt="${course.schoolName}" class="school-logo">
                        <span class="school-name">${course.schoolName}</span>
                        <div class="rating">
                            <span class="stars">★★★★★</span>
                            <span class="rating-value">${formatRating(course.rating)}</span>
                        </div>
                    </div>
                    <div class="reviews">
                        <a href="#">Отзывы о школе ${course.reviewCount}</a>
                    </div>
                </div>
                <div class="course-details">
                    <div class="price-block">
                        <div class="old-price">${formatPrice(course.oldPrice)}</div>
                        <div class="current-price">${formatPrice(course.currentPrice)}</div>
                        <div class="monthly-payment">от ${formatPrice(course.monthlyPayment)}/месяц</div>
                    </div>
                    <div class="course-features">
                        <div class="feature">
                            <img src="assets/icons/time.svg" alt="Duration">
                            <span>${course.duration}</span>
                        </div>
                        <div class="feature">
                            <img src="assets/icons/schedule.svg" alt="Schedule">
                            <span>${course.schedule}</span>
                        </div>
                        <div class="feature">
                            <img src="assets/icons/level.svg" alt="Level">
                            <span>${course.level}</span>
                        </div>
                        <div class="feature">
                            <img src="assets/icons/internship.svg" alt="Internship">
                            <span>${course.internship ? 'Стажировка' : 'Без стажировки'}</span>
                        </div>
                        <div class="feature">
                            <img src="assets/icons/diploma.svg" alt="Diploma">
                            <span>${course.diploma ? 'Диплом' : 'Сертификат'}</span>
            </div>
        </div>
    </div>
                <div class="course-actions">
                    <a href="${course.url}" class="btn btn-primary">На сайт курса</a>
                    <a href="${course.detailsUrl}" class="btn btn-outline">Подробнее</a>
                    <a href="#" class="compare-link">
                        <img src="assets/icons/compare.svg" alt="Compare">
                        Добавить к сравнению
                    </a>
                </div>
            </div>
        `;
    }

    // Sample course data
    const sampleCourse = {
        title: 'Профессия веб-разработчик',
        schoolName: 'Skillbox',
        schoolLogo: 'assets/logos/skillbox.svg',
        rating: 4.5,
        reviewCount: 58,
        oldPrice: 85000,
        currentPrice: 66800,
        monthlyPayment: 4745,
        duration: '3 месяца',
        schedule: 'В любое время',
        level: 'Начальный',
        internship: true,
        diploma: true,
        url: '#',
        detailsUrl: '#'
    };

    // Initialize course grid with sample data
    for (let i = 0; i < 5; i++) {
        coursesGrid.innerHTML += createCourseCard(sampleCourse);
    }
}); 