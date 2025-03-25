// Dummy data for development account
const devData = {
    dashboard: {
        inventory: {
            totalValue: 125000,
            turnoverRate: 4.2,
            lowStockCount: 3
        },
        pricing: {
            competitiveness: 92,
            profitMargin: 35,
            averagePrice: 49.99
        },
        analytics: {
            dataPoints: 2400000,
            accuracy: 94,
            insights: 15
        }
    },
    inventory: {
        metrics: {
            totalValue: 125000,
            stockTurnover: 4.2,
            lowStockItems: 3
        },
        stockLevels: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    name: 'Fahoozle Classic',
                    data: [420, 380, 350, 400, 420, 400]
                },
                {
                    name: 'Fahoozle Pro',
                    data: [220, 200, 180, 210, 200, 190]
                },
                {
                    name: 'Fahoozle Mini',
                    data: [150, 140, 120, 100, 90, 85]
                }
            ]
        },
        valueBreakdown: [
            { category: 'Classic', value: 42000 },
            { category: 'Pro', value: 57000 },
            { category: 'Mini', value: 26000 }
        ],
        items: [
            {
                name: 'Fahoozle Classic',
                sku: 'FHOZ-CLASSIC',
                quantity: 400,
                reorderPoint: 150,
                costPerUnit: 100,
                status: 'High',
                inventoryAge: 15
            },
            {
                name: 'Fahoozle Pro',
                sku: 'FHOZ-PRO',
                quantity: 190,
                reorderPoint: 100,
                costPerUnit: 300,
                status: 'High',
                inventoryAge: 12
            },
            {
                name: 'Fahoozle Mini',
                sku: 'FHOZ-MINI',
                quantity: 85,
                reorderPoint: 100,
                costPerUnit: 50,
                status: 'Low',
                inventoryAge: 8
            }
        ]
    },
    pricing: {
        metrics: {
            averagePrice: 49.99,
            competitiveness: 92,
            profitMargin: 35
        },
        trends: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    name: 'Our Average',
                    data: [49.99, 49.99, 49.99, 49.99, 49.99, 49.99]
                },
                {
                    name: 'Market Average',
                    data: [52.99, 51.99, 50.99, 49.99, 48.99, 47.99]
                }
            ]
        },
        marginAnalysis: {
            labels: ['Classic', 'Pro', 'Mini'],
            prices: [49.99, 79.99, 29.99],
            margins: [35, 38, 32]
        },
        products: [
            {
                name: 'Fahoozle Classic',
                currentPrice: 49.99,
                marketAverage: 52.99,
                trend: 'Stable',
                margin: 35,
                elasticity: 1.2
            },
            {
                name: 'Fahoozle Pro',
                currentPrice: 79.99,
                marketAverage: 82.99,
                trend: 'Up',
                margin: 38,
                elasticity: 0.9
            },
            {
                name: 'Fahoozle Mini',
                currentPrice: 29.99,
                marketAverage: 32.99,
                trend: 'Down',
                margin: 32,
                elasticity: 1.5
            }
        ],
        competitors: [
            {
                name: 'Fahoodlebugs',
                price: 52.99,
                marketShare: 25,
                lastUpdated: new Date()
            },
            {
                name: 'Fahugaloons',
                price: 54.99,
                marketShare: 20,
                lastUpdated: new Date()
            },
            {
                name: 'Fahoodlets',
                price: 47.99,
                marketShare: 15,
                lastUpdated: new Date()
            }
        ]
    },
    analytics: {
        metrics: {
            dataPoints: 2400000,
            accuracy: 94,
            insightsGenerated: 15
        },
        performanceTrends: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    name: 'Revenue',
                    data: [280000, 300000, 320000, 310000, 340000, 360000]
                },
                {
                    name: 'Units Sold',
                    data: [2800, 3000, 3200, 3100, 3400, 3600]
                },
                {
                    name: 'Market Share',
                    data: [28, 29, 30, 30, 31, 32]
                }
            ]
        },
        keyMetrics: [
            {
                name: 'Revenue',
                currentValue: '$360,000',
                previousValue: '$340,000',
                change: 5.9,
                impact: 'High'
            },
            {
                name: 'Units Sold',
                currentValue: '3,600',
                previousValue: '3,400',
                change: 5.9,
                impact: 'High'
            },
            {
                name: 'Market Share',
                currentValue: '32%',
                previousValue: '31%',
                change: 3.2,
                impact: 'Medium'
            }
        ],
        forecast: {
            nextThirtyDays: {
                revenue: 380000,
                units: 3800,
                confidence: 92
            },
            topProducts: [
                {
                    name: 'Fahoozle Classic',
                    predictedUnits: 1800,
                    predictedRevenue: 180000
                },
                {
                    name: 'Fahoozle Pro',
                    predictedUnits: 1200,
                    predictedRevenue: 150000
                },
                {
                    name: 'Fahoozle Mini',
                    predictedUnits: 800,
                    predictedRevenue: 50000
                }
            ]
        },
        customerSegments: [
            {
                segment: 'Enterprise',
                revenue: 180000,
                growth: 12,
                retention: 95
            },
            {
                segment: 'SMB',
                revenue: 120000,
                growth: 8,
                retention: 85
            },
            {
                segment: 'Consumer',
                revenue: 60000,
                growth: 15,
                retention: 75
            }
        ]
    }
};

// Function to get platform-specific data
const getDevData = async (platform, dataType) => {
    // In a real implementation, this would fetch data from the specific platform
    // For now, we'll return the dummy data
    return devData[dataType];
};

module.exports = {
    getDevData
}; 