const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { getDevData } = require('../controllers/devData');

// Platform-specific dashboard data
router.get('/:platform/dashboard', auth, async (req, res) => {
    try {
        const { platform } = req.params;
        const data = await getDevData(platform, 'dashboard');
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard data' });
    }
});

// Platform-specific inventory data
router.get('/:platform/inventory', auth, async (req, res) => {
    try {
        const { platform } = req.params;
        const data = await getDevData(platform, 'inventory');
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching inventory data' });
    }
});

// Platform-specific pricing data
router.get('/:platform/pricing', auth, async (req, res) => {
    try {
        const { platform } = req.params;
        const data = await getDevData(platform, 'pricing');
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pricing data' });
    }
});

// Platform-specific analytics data
router.get('/:platform/analytics', auth, async (req, res) => {
    try {
        const { platform } = req.params;
        const data = await getDevData(platform, 'analytics');
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching analytics data' });
    }
});

// Export inventory data
router.get('/:platform/inventory/export', auth, async (req, res) => {
    try {
        const { platform } = req.params;
        const data = await getDevData(platform, 'inventory');
        
        // Convert data to CSV format
        const csvData = data.items.map(item => 
            `${item.name},${item.sku},${item.quantity},${item.reorderPoint},${item.costPerUnit},${item.status},${item.inventoryAge}`
        ).join('\n');
        
        const headers = 'Name,SKU,Quantity,Reorder Point,Cost Per Unit,Status,Inventory Age\n';
        
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=inventory.csv');
        res.send(headers + csvData);
    } catch (error) {
        res.status(500).json({ message: 'Error exporting inventory data' });
    }
});

// Export pricing data
router.get('/:platform/pricing/export', auth, async (req, res) => {
    try {
        const { platform } = req.params;
        const data = await getDevData(platform, 'pricing');
        
        // Convert data to CSV format
        const csvData = data.products.map(product => 
            `${product.name},${product.currentPrice},${product.marketAverage},${product.trend},${product.margin},${product.elasticity}`
        ).join('\n');
        
        const headers = 'Name,Current Price,Market Average,Trend,Margin,Elasticity\n';
        
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=pricing.csv');
        res.send(headers + csvData);
    } catch (error) {
        res.status(500).json({ message: 'Error exporting pricing data' });
    }
});

// Export analytics data
router.get('/:platform/analytics/export', auth, async (req, res) => {
    try {
        const { platform } = req.params;
        const data = await getDevData(platform, 'analytics');
        
        // Convert data to CSV format
        const csvData = data.keyMetrics.map(metric => 
            `${metric.name},${metric.currentValue},${metric.previousValue},${metric.change}%,${metric.impact}`
        ).join('\n');
        
        const headers = 'Metric,Current Value,Previous Value,Change,Impact\n';
        
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=analytics.csv');
        res.send(headers + csvData);
    } catch (error) {
        res.status(500).json({ message: 'Error exporting analytics data' });
    }
});

// Upload competitor data
router.post('/:platform/pricing/competitors', auth, async (req, res) => {
    try {
        // In a real implementation, this would process and store the uploaded data
        res.json({ message: 'Competitor data uploaded successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading competitor data' });
    }
});

// Set custom alerts
router.post('/:platform/alerts', auth, async (req, res) => {
    try {
        const { metric, threshold, type } = req.body;
        // In a real implementation, this would store the alert settings
        res.json({ message: 'Alert settings saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving alert settings' });
    }
});

module.exports = router; 