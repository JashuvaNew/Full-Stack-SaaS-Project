const express = require('express');
const router = express.Router();
const stripe = require('../../config/stripe');
const {User} = require('../../models');


router.post('/',
express.raw({type: 'application/json'}),
async (req, res) => {
    console.log('🔥 Stripe webhook received');

    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET); 
    }
    catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if(event.type === 'checkout.session.completed') {
        const session = event.data.object;

        const userId = session.metadata.userId;
        const plan = session.metadata.plan;

        if(!userId || !plan) {
            console.error('Missing userId or plan in session metadata');
            return res.status(400).send('Missing metadata');
        }

        let role = 'FREE';
        if(plan === 'PRO') role = 'PRO';
        if(plan === 'PRO_PLUS') role = 'PRO_PLUS';

      const [updatedRows] = await User.update(
        { role },
        { where: { id: userId } }
      );

      console.log('Rows updated:', updatedRows);
    }
   res.json({ received: true });
}
);
module.exports = router;