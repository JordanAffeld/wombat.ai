// Function to determine the correct base URL
function getBaseUrl() {
    // For local development with Python server
    return window.location.port === '3000' ? '' : '';
}

// Load header
fetch(getBaseUrl() + '/public/pages/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
        // After loading header, fix the navigation paths
        fixNavigationPaths();
    })
    .catch(error => console.error('Error loading header:', error));

// Load footer
fetch(getBaseUrl() + '/public/pages/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
        // After loading footer, fix the navigation paths
        fixNavigationPaths();
    })
    .catch(error => console.error('Error loading footer:', error));

// Function to fix navigation paths based on current location
function fixNavigationPaths() {
    const isServicePage = window.location.pathname.includes('/services/');
    if (isServicePage) {
        document.querySelectorAll('a[href^="/"]').forEach(link => {
            link.href = '.' + link.getAttribute('href');
        });
    }
} 