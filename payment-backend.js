// Simple Node.js backend for handling Stripe payments
// This is a basic example - you'll need to implement this on your server

const express = require('express');
const stripe = require('stripe')('sk_test_YOUR_STRIPE_SECRET_KEY'); // Replace with your secret key
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// Create payment intent endpoint
app.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency = 'usd' } = req.body;

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // Amount in cents
            currency: currency,
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                purpose: 'BlueJai Support'
            }
        });

        res.send({
            client_secret: paymentIntent.client_secret
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).send({ error: error.message });
    }
});

// Webhook to handle successful payments
app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = 'whsec_YOUR_WEBHOOK_SECRET'; // Replace with your webhook secret

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.log(`Webhook signature verification failed.`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('Payment succeeded:', paymentIntent.id);
            // Here you can send confirmation emails, update database, etc.
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({received: true});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app; 