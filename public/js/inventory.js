// Inventory management dashboard
class InventoryDashboard extends Dashboard {
    constructor() {
        super();
    }

    // Fetch inventory data
    async fetchData() {
        try {
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            const platform = userData.platform || 'dev'; // Default to 'dev' if platform not specified
            const response = await apiRequest(`${platform}/inventory`);
            this.data = response;
        } catch (error) {
            console.error('Error fetching inventory data:', error);
            throw error;
        }
    }

    // Update metrics
    updateMetrics() {
        const { metrics } = this.data;
        document.getElementById('totalValue').textContent = formatCurrency(metrics.totalValue);
        document.getElementById('turnoverRate').textContent = `${metrics.stockTurnover.toFixed(2)}x`;
        document.getElementById('lowStockCount').textContent = metrics.lowStockCount;
        document.getElementById('avgAge').textContent = `${metrics.avgInventoryAge} days`;
    }

    // Update charts
    updateCharts() {
        // Stock Levels Chart
        this.createChart('stockLevelsChart', {
            type: 'line',
            data: {
                labels: this.data.stockLevels.labels,
                datasets: this.data.stockLevels.datasets.map(dataset => ({
                    label: dataset.name,
                    data: dataset.data,
                    borderColor: getChartColors().primary,
                    tension: 0.4
                }))
            }
        });

        // Value Breakdown Chart
        this.createChart('valueBreakdownChart', {
            type: 'doughnut',
            data: {
                labels: this.data.valueBreakdown.map(item => item.category),
                datasets: [{
                    data: this.data.valueBreakdown.map(item => item.value),
                    backgroundColor: [
                        getChartColors().primary,
                        getChartColors().secondary,
                        getChartColors().warning,
                        getChartColors().error
                    ]
                }]
            },
            options: {
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }

    // Update tables
    updateTables() {
        const tbody = document.getElementById('inventoryTableBody');
        tbody.innerHTML = '';

        this.data.items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.sku}</td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${formatNumber(item.quantity)}</td>
                <td>${formatNumber(item.reorderPoint)}</td>
                <td>${formatCurrency(item.costPerUnit)}</td>
                <td>
                    <span class="status-badge status-${item.status.toLowerCase()}">
                        ${item.status}
                    </span>
                </td>
                <td>${item.inventoryAge} days</td>
                <td>
                    <button class="btn-secondary" onclick="inventoryDashboard.handleItemAction('${item.sku}')">
                        Actions
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // Handle search
    handleSearch(query) {
        const tbody = document.getElementById('inventoryTableBody');
        const rows = tbody.getElementsByTagName('tr');

        for (const row of rows) {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
        }
    }

    // Handle filter
    handleFilter(value) {
        const tbody = document.getElementById('inventoryTableBody');
        const rows = tbody.getElementsByTagName('tr');

        for (const row of rows) {
            const status = row.querySelector('.status-badge').textContent.toLowerCase();
            row.style.display = value === 'all' || status === value ? '' : 'none';
        }
    }

    // Handle item action
    handleItemAction(sku) {
        // Implement item action logic
        console.log('Item action:', sku);
    }

    // Get export type
    getExportType() {
        return 'inventory';
    }
}

// Initialize dashboard
const inventoryDashboard = new InventoryDashboard();
inventoryDashboard.init(); 