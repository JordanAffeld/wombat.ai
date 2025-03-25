// Cache the header content
let cachedHeader = null;

// Preload the header content
async function preloadHeader() {
    try {
        const response = await fetch('./dashboard-header.html');
        cachedHeader = await response.text();
        return cachedHeader;
    } catch (error) {
        console.error('Error preloading header:', error);
        return null;
    }
}

async function loadDashboardHeader() {
    try {
        // Use cached header if available
        if (cachedHeader) {
            insertHeader(cachedHeader);
            return;
        }

        // If not cached, preload it
        const headerContent = await preloadHeader();
        if (headerContent) {
            insertHeader(headerContent);
        }
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

function insertHeader(headerContent) {
    const placeholder = document.getElementById('dashboard-header-placeholder');
    if (placeholder) {
        // Create a temporary container
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = headerContent;
        
        // Get the nav element
        const navElement = tempContainer.querySelector('.dashboard-nav');
        if (navElement) {
            // Replace the placeholder content
            placeholder.innerHTML = '';
            placeholder.appendChild(navElement);
            
            // Set active state for current page
            const currentPage = window.location.pathname.split('/').pop();
            const navLinks = document.querySelectorAll('.nav-links a');
            navLinks.forEach(link => {
                if (link.getAttribute('href') === currentPage) {
                    link.classList.add('active');
                }
            });

            // Set user email
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            const userEmailElement = document.getElementById('userEmail');
            if (userEmailElement) {
                userEmailElement.textContent = userData.email || '';
            }

            // Add loaded class after a small delay to ensure the transition works
            requestAnimationFrame(() => {
                placeholder.classList.add('loaded');
            });
        }
    }
}

// Start preloading the header as soon as possible
preloadHeader();

// Load header when DOM is ready
document.addEventListener('DOMContentLoaded', loadDashboardHeader); 