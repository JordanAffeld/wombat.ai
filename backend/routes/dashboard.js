const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Sales = require('../models/Sales');

// Get all dashboard data for a user
router.get('/', auth, async (req, res) => {
  try {
    const salesData = await Sales.find({ userId: req.user._id });
    
    // Calculate metrics
    const metrics = {
      totalRevenue: 0,
      totalUnits: 0,
      averagePrice: 0,
      competitivenessScore: 0,
      profitMargin: 0,
      priceElasticity: 0
    };

    // Calculate totals
    salesData.forEach(sale => {
      sale.monthlySales.forEach(month => {
        metrics.totalRevenue += month.revenue;
        metrics.totalUnits += month.units;
      });
    });

    // Calculate average price
    if (metrics.totalUnits > 0) {
      metrics.averagePrice = metrics.totalRevenue / metrics.totalUnits;
    }

    // Calculate competitiveness score (average market share)
    let totalMarketShare = 0;
    let competitorCount = 0;
    salesData.forEach(sale => {
      sale.competitors.forEach(comp => {
        totalMarketShare += comp.marketShare;
        competitorCount++;
      });
    });
    if (competitorCount > 0) {
      metrics.competitivenessScore = totalMarketShare / competitorCount;
    }

    // Calculate profit margin (assuming 30% margin)
    metrics.profitMargin = 30;

    // Calculate price elasticity (dummy value for now)
    metrics.priceElasticity = -1.5;

    // Prepare response
    const response = {
      metrics,
      sales: salesData,
      charts: {
        revenueTrend: salesData.map(sale => ({
          product: sale.productName,
          data: sale.monthlySales.map(month => ({
            month: month.month,
            revenue: month.revenue
          }))
        })),
        marketShare: salesData.map(sale => ({
          product: sale.productName,
          competitors: sale.competitors
        }))
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Dashboard data error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get data by category
router.get('/:category', auth, async (req, res) => {
  try {
    const data = await ScrapedData.find({
      userId: req.user._id,
      category: req.params.category,
      'metadata.status': 'active'
    }).sort({ 'metadata.scrapedAt': -1 });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new scraped data
router.post('/', auth, async (req, res) => {
  try {
    const { category, source, data } = req.body;

    const scrapedData = new ScrapedData({
      category,
      source,
      data,
      userId: req.user._id
    });

    await scrapedData.save();
    res.status(201).json(scrapedData);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update scraped data
router.put('/:id', auth, async (req, res) => {
  try {
    const { data } = req.body;
    const scrapedData = await ScrapedData.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { 
        $set: { 
          data,
          'metadata.lastUpdated': new Date()
        }
      },
      { new: true }
    );

    if (!scrapedData) {
      return res.status(404).json({ message: 'Data not found' });
    }

    res.json(scrapedData);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Archive scraped data
router.delete('/:id', auth, async (req, res) => {
  try {
    const scrapedData = await ScrapedData.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { $set: { 'metadata.status': 'archived' } },
      { new: true }
    );

    if (!scrapedData) {
      return res.status(404).json({ message: 'Data not found' });
    }

    res.json({ message: 'Data archived successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 