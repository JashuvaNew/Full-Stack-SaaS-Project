const express = require('express');
const router = express.Router();
const stripe = require('../../config/stripe');
const {User} = require('../../models');


router.post(
  '/',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    console.log('🔥 Stripe webhook received');

    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('❌ Webhook signature failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      const userId = session.metadata?.userId;
      const plan = session.metadata?.plan;

      console.log('Webhook metadata:', session.metadata);

      if (!userId || !plan) {
        console.error('❌ Missing userId or plan');
        return res.status(400).send('Missing metadata');
      }

      let role = 'FREE';
      if (plan === 'PRO') role = 'PRO';
      if (plan === 'PRO_PLUS') role = 'PRO_PLUS';
     
         const [updatedRows] = await User.update(
        { role },
        { where: { id: userId } }
      );
      
      console.log(`✅ User ${userId} upgraded to ${role}`);
      console.log('Rows updated:', updatedRows);
    }

    return res.status(200).json({ received: true });
  }
);
module.exports = router;