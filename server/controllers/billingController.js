import Stripe from 'stripe';
import userModel from '../models/userModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Server-side source of truth for plans to prevent client tampering
const PLANS = {
  Basic: { priceCents: 1000, credits: 100, currency: 'usd', name: 'Basic' },
  Advanced: { priceCents: 5000, credits: 500, currency: 'usd', name: 'Advanced' },
  Business: { priceCents: 25000, credits: 5000, currency: 'usd', name: 'Business' }
};

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.userId;
    const { planId } = req.body;

    const plan = PLANS[planId];
    if (!plan) {
      return res.status(400).json({ success: false, message: 'Invalid plan selected' });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: plan.currency,
            unit_amount: plan.priceCents,
            product_data: { name: `${plan.name} Credits (${plan.credits})` }
          }
        }
      ],
      metadata: {
        userId,
        planId,
        credits: String(plan.credits)
      },
      success_url: `${process.env.FRONTEND_URL}/result?payment=success`,
      cancel_url: `${process.env.FRONTEND_URL}/buy?payment=cancelled`
    });

    return res.json({ success: true, url: session.url });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const userId = session.metadata?.userId;
      const credits = Number(session.metadata?.credits || 0);
      if (userId && credits > 0) {
        await userModel.findByIdAndUpdate(userId, { $inc: { creditBalance: credits } });
      }
    }
    return res.json({ received: true });
  } catch (e) {
    console.log('Webhook handling error', e.message);
    return res.status(500).json({ received: false });
  }
};

export default { createCheckoutSession, stripeWebhook };


