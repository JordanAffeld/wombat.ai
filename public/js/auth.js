// API Configuration
const API_CONFIG = {
    baseUrl: window.location.hostname === 'localhost' 
        ? 'http://localhost:8080'
        : `https://${window.location.hostname}`,
    apiPath: '/api'
};

// Check authentication
const token = localStorage.getItem('token');
if (!token && !window.location.pathname.includes('login.html')) {
    window.location.href = '/pages/login.html';
}

// Get user data
const userData = JSON.parse(localStorage.getItem('userData') || '{}');
document.getElementById('userEmail').textContent = userData.email || 'User';

// Handle logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    window.location.href = '/pages/login.html';
});

// API request utility
async function apiRequest(endpoint, options = {}) {
    try {
        const url = `${API_CONFIG.baseUrl}${API_CONFIG.apiPath}/${endpoint}`;
        const response = await fetch(url, {
            ...options,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                ...options.headers
            }
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `API request failed: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API request error:', error);
        if (error.message.includes('Failed to fetch')) {
            throw new Error('Unable to connect to the server. Please check your connection and try again.');
        }
        throw error;
    }
}

// Format utilities
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

function formatNumber(value) {
    return new Intl.NumberFormat('en-US').format(value);
}

function formatPercentage(value) {
    return `${value.toFixed(1)}%`;
}

// Chart utilities
function getChartColors() {
    return {
        primary: '#2196F3',
        secondary: '#00C853',
        warning: '#FFC107',
        error: '#FF1744',
        background: 'rgba(33, 150, 243, 0.1)',
        border: '#2196F3'
    };
}

function getChartOptions() {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };
} 