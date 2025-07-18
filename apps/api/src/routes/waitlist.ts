import express from 'express';
import { body, validationResult } from 'express-validator';
import { logger } from '../utils/logger';

const router = express.Router();

// POST /api/waitlist/join
router.post('/join', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('name').isString().isLength({ min: 2 }).withMessage('Name is required'),
  body('investmentType').optional().isString(),
  body('experience').optional().isString(),
  body('interests').optional().isArray()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    const { email, name, investmentType, experience, interests } = req.body;

    // TODO: Save to database
    // TODO: Add to email marketing service (Mailchimp, SendGrid, etc.)
    
    logger.info(`New waitlist signup: ${email} (${name})`);

    // Mock successful response
    res.json({
      success: true,
      message: 'Successfully joined the waitlist',
      data: {
        email,
        name,
        joinedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    logger.error('Waitlist signup failed:', error);
    res.status(500).json({ 
      error: 'Signup failed',
      message: error.message 
    });
  }
});

// GET /api/waitlist/stats (admin only)
router.get('/stats', async (req, res) => {
  try {
    // TODO: Get actual stats from database
    
    res.json({
      totalSignups: 1247,
      todaySignups: 23,
      topInterests: [
        'Unlimited property searches',
        'Real-time deal alerts',
        'Portfolio management tools'
      ],
      topStrategies: [
        'Buy & Hold Rental',
        'Fix & Flip',
        'BRRRR Strategy'
      ]
    });
  } catch (error) {
    logger.error('Failed to get waitlist stats:', error);
    res.status(500).json({ 
      error: 'Failed to get stats',
      message: error.message 
    });
  }
});

export default router;