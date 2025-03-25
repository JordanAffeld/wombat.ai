// Pricing strategy dashboard
class PricingDashboard extends Dashboard {
    constructor() {
        super();
    }

    // Fetch pricing data
    async fetchData() {
        try {
            const response = await apiRequest('pricing');
            this.data = response;
        } catch (error) {
            console.error('Error fetching pricing data:', error);
            throw error;
        }
    }

    // Update metrics
    updateMetrics() {
        const { metrics } = this.data;
        document.getElementById('averagePrice').textContent = formatCurrency(metrics.averagePrice);
        document.getElementById('competitiveness').textContent = `${metrics.competitiveness}/100`;
        document.getElementById('profitMargin').textContent = formatPercentage(metrics.profitMargin);
        document.getElementById('priceElasticity').textContent = metrics.priceElasticity.toFixed(2);
    }

    // Update charts
    updateCharts() {
        // Price Trends Chart
        this.createChart('priceTrendsChart', {
            type: 'line',
            data: {
                labels: this.data.priceHistory.map(item => item.date),
                datasets: [
                    {
                        label: 'Our Price',
                        data: this.data.priceHistory.map(item => item.averagePrice),
                        borderColor: getChartColors().primary,
                        tension: 0.4
                    },
                    {
                        label: 'Market Average',
                        data: this.data.priceHistory.map(item => item.marketAverage),
                        borderColor: getChartColors().secondary,
                        tension: 0.4
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        ticks: {
                            callback: value => formatCurrency(value)
                        }
                    }
                }
            }
        });

        // Margin Analysis Chart
        this.createChart('marginAnalysisChart', {
            type: 'bar',
            data: {
                labels: this.data.products.map(product => product.name),
                datasets: [{
                    label: 'Margin',
                    data: this.data.products.map(product => product.margin),
                    backgroundColor: this.data.products.map(product => 
                        product.margin >= 30 ? getChartColors().success :
                        product.margin >= 20 ? getChartColors().warning :
                        getChartColors().error
                    )
                }]
            },
            options: {
                scales: {
                    y: {
                        ticks: {
                            callback: value => formatPercentage(value)
                        }
                    }
                }
            }
        });
    }

    // Update tables
    updateTables() {
        // Product Pricing Table
        const pricingTbody = document.getElementById('pricingTableBody');
        pricingTbody.innerHTML = '';

        this.data.products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${formatCurrency(product.currentPrice)}</td>
                <td>${formatCurrency(product.marketAverage)}</td>
                <td>
                    <span class="trend-indicator trend-${product.trend.toLowerCase()}">
                        ${product.trend}
                    </span>
                </td>
                <td>${formatPercentage(product.margin)}</td>
                <td>${product.elasticity.toFixed(2)}</td>
                <td>
                    <button class="btn-secondary" onclick="pricingDashboard.handleProductAction('${product.name}')">
                        Actions
                    </button>
                </td>
            `;
            pricingTbody.appendChild(row);
        });

        // Competitor Table
        const competitorTbody = document.getElementById('competitorTableBody');
        competitorTbody.innerHTML = '';

        this.data.competitorPrices.forEach(competitor => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${competitor.competitor}</td>
                <td>${formatCurrency(competitor.price)}</td>
                <td>${formatPercentage(competitor.marketShare)}</td>
                <td>${new Date(competitor.lastUpdated).toLocaleDateString()}</td>
            `;
            competitorTbody.appendChild(row);
        });
    }

    // Handle search
    handleSearch(query) {
        const tbody = document.getElementById('pricingTableBody');
        const rows = tbody.getElementsByTagName('tr');

        for (const row of rows) {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
        }
    }

    // Handle filter
    handleFilter(value) {
        const tbody = document.getElementById('pricingTableBody');
        const rows = tbody.getElementsByTagName('tr');

        for (const row of rows) {
            const margin = parseFloat(row.querySelector('td:nth-child(5)').textContent);
            row.style.display = value === 'all' ||
                (value === 'high-margin' && margin >= 30) ||
                (value === 'low-margin' && margin < 20) ? '' : 'none';
        }
    }

    // Handle product action
    handleProductAction(productName) {
        // Implement product action logic
        console.log('Product action:', productName);
    }

    // Get export type
    getExportType() {
        return 'pricing';
    }
}

// Initialize dashboard
const pricingDashboard = new PricingDashboard();
pricingDashboard.init(); 