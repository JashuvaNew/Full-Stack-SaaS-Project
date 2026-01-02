const stripe = require('../../config/stripe');
const plans = require('../../config/plan');


exports.createCheckoutSession = async (req, res) => {
  try {
    const {plan} = req.body;

    const selectedPlan = plans[plan];

    if(!selectedPlan) {
      return res.status(400).json({ message: 'Invalid Plan' });
    }
    

    const session = await stripe.checkout.sessions.create({
        mode:'payment',
        payment_method_types: ['card'],
        line_items:[{
            price_data: {
                currency:'usd',
                product_data:{
                    name: selectedPlan.name,
                },
                unit_amount: selectedPlan.amount,
             },
            quantity:1,
        },
    ],

        metadata: {
            userId:req.user.id,
            plan: plan
        },
      
        success_url: 'http://localhost:5173/success',
cancel_url: 'http://localhost:5173/cancel',

    });
    return res.json({ checkouturl: session.url });

  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};