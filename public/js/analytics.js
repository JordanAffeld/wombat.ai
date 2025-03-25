// Advanced analytics dashboard
class AnalyticsDashboard extends Dashboard {
    constructor() {
        super();
    }

    // Fetch analytics data
    async fetchData() {
        try {
            const response = await apiRequest('analytics');
            this.data = response;
        } catch (error) {
            console.error('Error fetching analytics data:', error);
            throw error;
        }
    }

    // Update metrics
    updateMetrics() {
        const { metrics } = this.data;
        document.getElementById('dataPoints').textContent = formatNumber(metrics.dataPoints);
        document.getElementById('predictionAccuracy').textContent = formatPercentage(metrics.predictionAccuracy);
        document.getElementById('insightsGenerated').textContent = formatNumber(metrics.insightsGenerated);
        document.getElementById('marketShare').textContent = formatPercentage(metrics.marketShare);
    }

    // Update charts
    updateCharts() {
        // Performance Trends Chart
        this.createChart('performanceTrendsChart', {
            type: 'line',
            data: {
                labels: this.data.performanceTrends.map(item => item.date),
                datasets: [
                    {
                        label: 'Revenue',
                        data: this.data.performanceTrends.map(item => item.metrics.revenue),
                        borderColor: getChartColors().primary,
                        tension: 0.4,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Units Sold',
                        data: this.data.performanceTrends.map(item => item.metrics.unitsSold),
                        borderColor: getChartColors().secondary,
                        tension: 0.4,
                        yAxisID: 'y1'
                    },
                    {
                        label: 'Market Share',
                        data: this.data.performanceTrends.map(item => item.metrics.marketShare),
                        borderColor: getChartColors().warning,
                        tension: 0.4,
                        yAxisID: 'y2'
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        ticks: {
                            callback: value => formatCurrency(value)
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        grid: {
                            drawOnChartArea: false
                        }
                    },
                    y2: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        grid: {
                            drawOnChartArea: false
                        },
                        ticks: {
                            callback: value => formatPercentage(value)
                        }
                    }
                }
            }
        });

        // Sales Forecast Chart
        this.createChart('salesForecastChart', {
            type: 'bar',
            data: {
                labels: this.data.salesForecast.topProducts.map(product => product.name),
                datasets: [
                    {
                        label: 'Predicted Units',
                        data: this.data.salesForecast.topProducts.map(product => product.predictedUnits),
                        backgroundColor: getChartColors().primary
                    },
                    {
                        label: 'Predicted Revenue',
                        data: this.data.salesForecast.topProducts.map(product => product.predictedRevenue),
                        backgroundColor: getChartColors().secondary
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        ticks: {
                            callback: value => formatNumber(value)
                        }
                    },
                    y1: {
                        position: 'right',
                        grid: {
                            drawOnChartArea: false
                        },
                        ticks: {
                            callback: value => formatCurrency(value)
                        }
                    }
                }
            }
        });
    }

    // Update tables
    updateTables() {
        // Key Metrics Table
        const metricsTbody = document.getElementById('metricsTableBody');
        metricsTbody.innerHTML = '';

        this.data.metrics.forEach(metric => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${metric.name}</td>
                <td>${metric.currentValue}</td>
                <td>${metric.previousValue}</td>
                <td>
                    <span class="trend-indicator trend-${metric.change >= 0 ? 'up' : 'down'}">
                        ${metric.change >= 0 ? '+' : ''}${formatPercentage(metric.change)}
                    </span>
                </td>
                <td>${metric.impact}</td>
            `;
            metricsTbody.appendChild(row);
        });

        // Customer Segments Table
        const segmentsTbody = document.getElementById('customerSegmentsTableBody');
        segmentsTbody.innerHTML = '';

        this.data.customerInsights.forEach(segment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${segment.segment}</td>
                <td>${formatCurrency(segment.revenue)}</td>
                <td>
                    <span class="trend-indicator trend-${segment.growth >= 0 ? 'up' : 'down'}">
                        ${segment.growth >= 0 ? '+' : ''}${formatPercentage(segment.growth)}
                    </span>
                </td>
                <td>${formatPercentage(segment.retention)}</td>
            `;
            segmentsTbody.appendChild(row);
        });

        // Top Products Table
        const productsTbody = document.getElementById('topProductsTableBody');
        productsTbody.innerHTML = '';

        this.data.salesForecast.topProducts.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${formatNumber(product.predictedUnits)}</td>
                <td>${formatCurrency(product.predictedRevenue)}</td>
            `;
            productsTbody.appendChild(row);
        });
    }

    // Handle search
    handleSearch(query) {
        const tbody = document.getElementById('metricsTableBody');
        const rows = tbody.getElementsByTagName('tr');

        for (const row of rows) {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
        }
    }

    // Handle filter
    handleFilter(value) {
        const tbody = document.getElementById('metricsTableBody');
        const rows = tbody.getElementsByTagName('tr');

        for (const row of rows) {
            const impact = row.querySelector('td:last-child').textContent.toLowerCase();
            row.style.display = value === 'all' || impact === value ? '' : 'none';
        }
    }

    // Get export type
    getExportType() {
        return 'analytics';
    }
}

// Initialize dashboard
const analyticsDashboard = new AnalyticsDashboard();
analyticsDashboard.init(); 