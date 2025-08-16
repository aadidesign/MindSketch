import express from 'express';
import userAuth from '../middlewares/auth.js';
import { createCheckoutSession, stripeWebhook } from '../controllers/billingController.js';

const billingRouter = express.Router();

// Must be raw for Stripe signature verification; configured in server.js for this path
billingRouter.post('/webhook', stripeWebhook);

// Authenticated endpoint to create a checkout session
billingRouter.post('/create-checkout-session', userAuth, createCheckoutSession);

export default billingRouter;


