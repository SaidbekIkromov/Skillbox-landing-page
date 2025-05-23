// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 
                  (prefersDarkScheme.matches ? 'dark' : 'light');
setTheme(savedTheme);

// Search functionality
const searchBtn = document.querySelector('.search-btn');
let searchModal = null;

function createSearchModal() {
    const modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.innerHTML = `
        <div class="search-modal-content">
            <div class="search-header">
                <input type="text" placeholder="Поиск курсов..." class="search-input">
                <button class="search-close">×</button>
            </div>
            <div class="search-results"></div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

function toggleSearchModal() {
    if (!searchModal) {
        searchModal = createSearchModal();
        const closeBtn = searchModal.querySelector('.search-close');
        const searchInput = searchModal.querySelector('.search-input');

        closeBtn.addEventListener('click', () => {
            searchModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        });

        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }

    searchModal.classList.toggle('active');
    document.body.classList.toggle('modal-open');
    
    if (searchModal.classList.contains('active')) {
        searchModal.querySelector('.search-input').focus();
    }
}

searchBtn.addEventListener('click', toggleSearchModal);

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

async function handleSearch(e) {
    const query = e.target.value.trim();
    const resultsContainer = searchModal.querySelector('.search-results');

    if (query.length < 3) {
        resultsContainer.innerHTML = '<p class="search-message">Введите минимум 3 символа для поиска</p>';
        return;
    }

    resultsContainer.innerHTML = '<p class="search-message">Поиск...</p>';

    try {
        await new Promise(resolve => setTimeout(resolve, 500));

        const results = [
            {
                title: 'Профессия веб-разработчик',
                school: 'Skillbox',
                price: '66 800 ₽',
                rating: 4.5
            },
            {
                title: 'JavaScript с нуля',
                school: 'GeekBrains',
                price: '45 000 ₽',
                rating: 4.3
            }
        ];

        if (results.length === 0) {
            resultsContainer.innerHTML = '<p class="search-message">Ничего не найдено</p>';
            return;
        }

        resultsContainer.innerHTML = results.map(result => `
            <div class="search-result-item">
                <h3>${result.title}</h3>
                <div class="result-meta">
                    <span>${result.school}</span>
                    <span>${result.price}</span>
                    <span>★ ${result.rating}</span>
                </div>
            </div>
        `).join('');
    } catch (error) {
        resultsContainer.innerHTML = '<p class="search-message error">Произошла ошибка при поиске</p>';
    }
}

// Styles for search modal
const style = document.createElement('style');
style.textContent = `
    .search-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: none;
        z-index: 1000;
    }

    .search-modal.active {
        display: block;
    }

    .search-modal-content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        background-color: var(--white);
        padding: 1rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .search-header {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .search-input {
        flex: 1;
        padding: 0.75rem;
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        font-size: 1rem;
    }

    .search-close {
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: #666666;
    }

    .search-results {
        max-height: 400px;
        overflow-y: auto;
    }

    .search-message {
        text-align: center;
        padding: 2rem;
        color: #666666;
    }

    .search-result-item {
        padding: 1rem;
        border-bottom: 1px solid var(--border-color);
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .search-result-item:hover {
        background-color: var(--light-gray);
    }

    .search-result-item h3 {
        margin-bottom: 0.5rem;
    }

    .result-meta {
        display: flex;
        gap: 1rem;
        color: #666666;
        font-size: 0.875rem;
    }

    body.modal-open {
        overflow: hidden;
    }
`;
document.head.appendChild(style);
