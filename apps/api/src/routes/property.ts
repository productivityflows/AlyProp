import express from 'express';
import { body, validationResult } from 'express-validator';
import { PropertyAnalysisService } from '../services/propertyAnalysis';
import { logger } from '../utils/logger';

const router = express.Router();
const propertyService = new PropertyAnalysisService();

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

export default router;