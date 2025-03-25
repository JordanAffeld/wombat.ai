// Dashboard utilities
class Dashboard {
    constructor() {
        this.charts = new Map();
        this.data = null;
    }

    // Initialize dashboard
    async init() {
        try {
            await this.fetchData();
            this.updateMetrics();
            this.updateCharts();
            this.updateTables();
            this.setupEventListeners();
        } catch (error) {
            console.error('Dashboard initialization error:', error);
            this.showError('Failed to initialize dashboard');
        }
    }

    // Fetch dashboard data
    async fetchData() {
        try {
            console.log('Fetching dashboard data...');
            const response = await apiRequest('dashboard');
            console.log('Raw dashboard response:', response);
            this.data = response;
            if (!this.data) {
                console.error('Dashboard data is null or undefined');
                return;
            }
            if (!this.data.metrics) {
                console.error('No metrics data found in response:', this.data);
                return;
            }
            if (!this.data.charts) {
                console.error('No charts data found in response:', this.data);
                return;
            }
            if (!this.data.sales) {
                console.error('No sales data found in response:', this.data);
                return;
            }
            console.log('Dashboard data processed successfully:', this.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    }

    // Update metrics
    updateMetrics() {
        console.log('Updating metrics...');
        if (!this.data || !this.data.metrics) {
            console.error('No metrics data available');
            return;
        }
        
        try {
            const { metrics } = this.data;
            console.log('Metrics data:', metrics);
            
            document.getElementById('averagePrice').textContent = formatCurrency(metrics.averagePrice);
            document.getElementById('competitiveness').textContent = `${metrics.competitivenessScore}/100`;
            document.getElementById('profitMargin').textContent = `${metrics.profitMargin}%`;
            document.getElementById('priceElasticity').textContent = metrics.priceElasticity.toFixed(2);
            
            console.log('Metrics updated successfully');
        } catch (error) {
            console.error('Error updating metrics:', error);
        }
    }

    // Update charts
    updateCharts() {
        console.log('Updating charts...');
        if (!this.data || !this.data.charts) {
            console.error('No charts data available');
            return;
        }

        try {
            // Price Trends Chart
            const priceTrendsCtx = document.getElementById('priceTrendsChart');
            if (!priceTrendsCtx) {
                console.error('Price trends chart canvas not found');
                return;
            }

            console.log('Revenue trend data:', this.data.charts.revenueTrend);
            
            this.createChart('priceTrendsChart', {
                type: 'line',
                data: {
                    labels: this.data.charts.revenueTrend[0]?.data.map(d => d.month) || [],
                    datasets: this.data.charts.revenueTrend.map(product => ({
                        label: product.product,
                        data: product.data.map(d => d.revenue),
                        borderColor: getChartColors().primary,
                        backgroundColor: getChartColors().background,
                        tension: 0.4
                    }))
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Revenue Trends'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: value => formatCurrency(value)
                            }
                        }
                    }
                }
            });

            console.log('Market share data:', this.data.charts.marketShare);
            
            // Market Share Chart
            this.createChart('marginAnalysisChart', {
                type: 'bar',
                data: {
                    labels: this.data.charts.marketShare.map(d => d.product),
                    datasets: [{
                        label: 'Market Share',
                        data: this.data.charts.marketShare.map(d => 
                            d.competitors.reduce((acc, comp) => acc + comp.marketShare, 0) / d.competitors.length
                        ),
                        backgroundColor: getChartColors().secondary
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Market Share Analysis'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                callback: value => `${value}%`
                            }
                        }
                    }
                }
            });
            
            console.log('Charts updated successfully');
        } catch (error) {
            console.error('Error updating charts:', error);
        }
    }

    // Update tables
    updateTables() {
        console.log('Updating tables...');
        if (!this.data || !this.data.sales) {
            console.error('No sales data available');
            return;
        }

        try {
            // Update pricing table
            const pricingTableBody = document.getElementById('pricingTableBody');
            if (!pricingTableBody) {
                console.error('Pricing table body not found');
                return;
            }

            console.log('Sales data for tables:', this.data.sales);
            
            pricingTableBody.innerHTML = this.data.sales.map(sale => `
                <tr>
                    <td>${sale.productName}</td>
                    <td>${formatCurrency(sale.currentPrice)}</td>
                    <td>${formatCurrency(sale.marketAverage)}</td>
                    <td>
                        <span class="trend-${sale.trend >= 0 ? 'up' : 'down'}">
                            ${sale.trend >= 0 ? '↑' : '↓'} ${Math.abs(sale.trend)}%
                        </span>
                    </td>
                    <td>${sale.margin}%</td>
                    <td>${sale.elasticity.toFixed(2)}</td>
                    <td>
                        <button class="btn-small" onclick="dashboard.editPrice('${sale._id}')">Edit</button>
                    </td>
                </tr>
            `).join('');

            // Update competitor table
            const competitorTableBody = document.getElementById('competitorTableBody');
            if (!competitorTableBody) {
                console.error('Competitor table body not found');
                return;
            }

            const allCompetitors = this.data.sales.flatMap(sale => 
                sale.competitors.map(comp => ({
                    name: comp.name,
                    price: comp.price,
                    marketShare: comp.marketShare,
                    lastUpdated: new Date().toLocaleDateString()
                }))
            );

            console.log('Competitor data:', allCompetitors);
            
            competitorTableBody.innerHTML = allCompetitors.map(comp => `
                <tr>
                    <td>${comp.name}</td>
                    <td>${formatCurrency(comp.price)}</td>
                    <td>${comp.marketShare}%</td>
                    <td>${comp.lastUpdated}</td>
                </tr>
            `).join('');
            
            console.log('Tables updated successfully');
        } catch (error) {
            console.error('Error updating tables:', error);
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Refresh button
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.init();
        });

        // Export button
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportData();
        });

        // Search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Filter select
        const filterSelect = document.getElementById('filterSelect');
        if (filterSelect) {
            filterSelect.addEventListener('change', (e) => {
                this.handleFilter(e.target.value);
            });
        }
    }

    // Handle search
    handleSearch(query) {
        // Override in child classes
    }

    // Handle filter
    handleFilter(value) {
        // Override in child classes
    }

    // Export data
    async exportData() {
        try {
            const response = await apiRequest('export', {
                method: 'POST',
                body: JSON.stringify({
                    type: this.getExportType(),
                    data: this.data
                })
            });

            // Create and download file
            const blob = new Blob([JSON.stringify(response, null, 2)], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${this.getExportType()}_${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error exporting data:', error);
            this.showError('Failed to export data');
        }
    }

    // Get export type
    getExportType() {
        // Override in child classes
        return 'data';
    }

    // Show error message
    showError(message) {
        // Create error element
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;

        // Add to page
        document.body.appendChild(error);

        // Remove after 3 seconds
        setTimeout(() => {
            error.remove();
        }, 3000);
    }

    // Create chart
    createChart(canvasId, config) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        const chart = new Chart(ctx, {
            ...config,
            options: {
                ...getChartOptions(),
                ...config.options
            }
        });

        // Store chart instance
        this.charts.set(canvasId, chart);

        return chart;
    }

    // Update chart
    updateChart(canvasId, data) {
        const chart = this.charts.get(canvasId);
        if (chart) {
            chart.data = data;
            chart.update();
        }
    }

    // Destroy chart
    destroyChart(canvasId) {
        const chart = this.charts.get(canvasId);
        if (chart) {
            chart.destroy();
            this.charts.delete(canvasId);
        }
    }
} 