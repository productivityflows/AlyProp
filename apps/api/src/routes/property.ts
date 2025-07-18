import express from 'express';
import { body, validationResult } from 'express-validator';
import { PropertyAnalysisService } from '../services/propertyAnalysis';
import { AnalyticsService } from '../services/analyticsService';
import { logger } from '../utils/logger';

const router = express.Router();
const propertyService = new PropertyAnalysisService();
const analyticsService = new AnalyticsService();

// POST /api/property/analyze
router.post('/analyze', [
  body('address').isString().isLength({ min: 5 }).withMessage('Valid address is required'),
  body('strategy').isIn(['rental', 'flip', 'brrrr', 'wholesale']).withMessage('Valid strategy is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    const { address, strategy } = req.body;
    
    logger.info(`Analyzing property: ${address} with strategy: ${strategy}`);
    
    // Track the address search
    await analyticsService.trackAddressSearch({
      address,
      strategy,
      userAgent: req.get('User-Agent'),
      ipAddress: req.ip
    });
    
    const result = await propertyService.analyzeProperty({ address, strategy });
    
    res.json(result);
  } catch (error) {
    logger.error('Property analysis error:', error);
    res.status(500).json({ 
      error: 'Analysis failed', 
      message: error.message 
    });
  }
});

// GET /api/property/popular - Get popular addresses/areas for community features
router.get('/popular', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const popularAddresses = await analyticsService.getPopularAddresses(limit);
    
    res.json({
      success: true,
      data: popularAddresses
    });
  } catch (error) {
    logger.error('Popular addresses error:', error);
    res.status(500).json({ 
      error: 'Failed to get popular addresses'
    });
  }
});

// GET /api/property/trending - Get trending areas
router.get('/trending', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 5;
    const trendingAreas = await analyticsService.getTrendingAreas(limit);
    
    res.json({
      success: true,
      data: trendingAreas
    });
  } catch (error) {
    logger.error('Trending areas error:', error);
    res.status(500).json({ 
      error: 'Failed to get trending areas'
    });
  }
});

// GET /api/property/insights - Get marketing insights (admin only)
router.get('/insights', async (req, res) => {
  try {
    const insights = await analyticsService.generateMarketingInsights();
    
    res.json({
      success: true,
      data: insights
    });
  } catch (error) {
    logger.error('Marketing insights error:', error);
    res.status(500).json({ 
      error: 'Failed to generate insights'
    });
  }
});

export default router;