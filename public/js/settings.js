// Settings page functionality
class Settings {
    constructor() {
        this.settings = null;
        this.init();
    }

    async init() {
        try {
            await this.loadSettings();
            this.setupEventListeners();
            this.populateForm();
        } catch (error) {
            console.error('Error initializing settings:', error);
            this.showError('Failed to load settings');
        }
    }

    async loadSettings() {
        try {
            const response = await apiRequest('settings');
            this.settings = response;
        } catch (error) {
            console.error('Error loading settings:', error);
            throw error;
        }
    }

    setupEventListeners() {
        // Save button
        document.getElementById('saveBtn').addEventListener('click', () => {
            this.saveSettings();
        });

        // Show/Hide API Key
        const showApiKeyBtn = document.getElementById('showApiKey');
        const apiKeyInput = document.getElementById('apiKey');
        showApiKeyBtn.addEventListener('click', () => {
            const type = apiKeyInput.type === 'password' ? 'text' : 'password';
            apiKeyInput.type = type;
            showApiKeyBtn.textContent = type === 'password' ? 'Show' : 'Hide';
        });
    }

    populateForm() {
        if (!this.settings) return;

        // User Profile
        document.getElementById('name').value = this.settings.name || '';
        document.getElementById('email').value = this.settings.email || '';
        document.getElementById('company').value = this.settings.company || '';

        // Notification Settings
        document.getElementById('lowStockAlert').checked = this.settings.notifications.lowStock || false;
        document.getElementById('priceChangeAlert').checked = this.settings.notifications.priceChange || false;
        document.getElementById('competitorAlert').checked = this.settings.notifications.competitor || false;
        document.getElementById('salesReport').checked = this.settings.notifications.salesReport || false;

        // API Configuration
        document.getElementById('apiKey').value = this.settings.api.key || '';
        document.getElementById('webhookUrl').value = this.settings.api.webhookUrl || '';
        document.getElementById('enableWebhook').checked = this.settings.api.webhookEnabled || false;

        // Data Export Settings
        document.getElementById('exportFormat').value = this.settings.export.format || 'csv';
        document.getElementById('autoExport').checked = this.settings.export.autoExport || false;
        document.getElementById('exportTime').value = this.settings.export.time || '00:00';
    }

    async saveSettings() {
        try {
            const settings = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                company: document.getElementById('company').value,
                notifications: {
                    lowStock: document.getElementById('lowStockAlert').checked,
                    priceChange: document.getElementById('priceChangeAlert').checked,
                    competitor: document.getElementById('competitorAlert').checked,
                    salesReport: document.getElementById('salesReport').checked
                },
                api: {
                    key: document.getElementById('apiKey').value,
                    webhookUrl: document.getElementById('webhookUrl').value,
                    webhookEnabled: document.getElementById('enableWebhook').checked
                },
                export: {
                    format: document.getElementById('exportFormat').value,
                    autoExport: document.getElementById('autoExport').checked,
                    time: document.getElementById('exportTime').value
                }
            };

            await apiRequest('settings', {
                method: 'POST',
                body: JSON.stringify(settings)
            });

            this.showSuccess('Settings saved successfully');
        } catch (error) {
            console.error('Error saving settings:', error);
            this.showError('Failed to save settings');
        }
    }

    showSuccess(message) {
        const success = document.createElement('div');
        success.className = 'success-message';
        success.textContent = message;

        document.body.appendChild(success);

        setTimeout(() => {
            success.remove();
        }, 3000);
    }

    showError(message) {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;

        document.body.appendChild(error);

        setTimeout(() => {
            error.remove();
        }, 3000);
    }
}

// Initialize settings
const settings = new Settings(); 