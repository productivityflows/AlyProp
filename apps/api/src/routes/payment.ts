import express from 'express';
import Stripe from 'stripe';
import { body, validationResult } from 'express-validator';
import { logger } from '../utils/logger';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

// POST /api/payment/create-payment-intent
router.post('/create-payment-intent', [
  body('amount').isInt({ min: 500 }).withMessage('Amount must be at least $5.00'),
  body('address').isString().withMessage('Property address is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    const { amount, address } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency: 'usd',
      metadata: {
        property_address: address,
        service: 'property_analysis'
      }
    });

    logger.info(`Payment intent created: ${paymentIntent.id} for ${address}`);

    res.json({
      client_secret: paymentIntent.client_secret,
      payment_intent_id: paymentIntent.id
    });
  } catch (error) {
    logger.error('Payment intent creation failed:', error);
    res.status(500).json({ 
      error: 'Payment processing failed',
      message: error.message 
    });
  }
});

// POST /api/payment/confirm-payment
router.post('/confirm-payment', [
  body('payment_intent_id').isString().withMessage('Payment intent ID is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    const { payment_intent_id } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);

    if (paymentIntent.status === 'succeeded') {
      // Payment successful - you could store this in database
      logger.info(`Payment confirmed: ${payment_intent_id}`);
      
      res.json({
        success: true,
        payment_status: paymentIntent.status,
        amount_received: paymentIntent.amount_received
      });
    } else {
      res.status(400).json({
        error: 'Payment not successful',
        status: paymentIntent.status
      });
    }
  } catch (error) {
    logger.error('Payment confirmation failed:', error);
    res.status(500).json({ 
      error: 'Payment confirmation failed',
      message: error.message 
    });
  }
});

export default router;