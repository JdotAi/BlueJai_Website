# Payment System Setup Guide

This guide will help you set up multiple payment options for your BlueJai website, including credit cards, PayPal, Apple Pay, and Google Pay.

## Overview

The payment system includes:
- **Credit Card Processing** via Stripe
- **PayPal** integration
- **Apple Pay** for iOS/Safari users
- **Google Pay** for Android/Chrome users
- **Buy Me a Coffee** as a backup option

## Required Accounts and API Keys

### 1. Stripe Account Setup
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Replace the following in `payment.html`:
   - `STRIPE_PUBLISHABLE_KEY` (starts with `pk_`)
4. Replace in `payment-backend.js`:
   - `sk_test_YOUR_STRIPE_SECRET_KEY` (starts with `sk_test_`)

### 2. PayPal Developer Account
1. Create a PayPal Developer account at [developer.paypal.com](https://developer.paypal.com)
2. Create a new app to get your Client ID
3. Replace `YOUR_PAYPAL_CLIENT_ID` in both `payment.html` and the PayPal script tag

### 3. Apple Pay Setup (Optional)
1. You need an Apple Developer account ($99/year)
2. Set up Apple Pay merchant ID
3. Configure your domain with Apple
4. Update the merchant validation endpoint in the code

### 4. Google Pay Setup (Optional)
1. Create a Google Pay Business Console account
2. Get your merchant ID
3. Update the Google Pay configuration in `payment.html`

## Backend Setup

### Prerequisites
- Node.js installed on your server
- A web server that can run Node.js applications

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   Create a `.env` file:
   ```env
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   PAYPAL_CLIENT_ID=your_paypal_client_id
   PAYPAL_CLIENT_SECRET=your_paypal_client_secret
   ```

3. **Update Configuration**
   In `payment-backend.js`, replace:
   - `sk_test_YOUR_STRIPE_SECRET_KEY` with your actual Stripe secret key
   - `whsec_YOUR_WEBHOOK_SECRET` with your webhook endpoint secret

4. **Start the Server**
   ```bash
   npm start
   ```
   
   For development:
   ```bash
   npm run dev
   ```

## Frontend Configuration

### Update payment.html
1. Replace `STRIPE_PUBLISHABLE_KEY` with your actual Stripe publishable key
2. Replace `YOUR_PAYPAL_CLIENT_ID` with your PayPal client ID
3. Update the backend endpoint URL if deploying to a different domain

### Test the Payment Flow
1. Use Stripe test card numbers:
   - Success: `4242424242424242`
   - Decline: `4000000000000002`
   - CVV: Any 3 digits
   - Expiry: Any future date

## Deployment Considerations

### Security
- Never expose secret keys in frontend code
- Use HTTPS for all payment pages
- Implement proper CORS settings
- Validate all payments on the server side

### Webhook Setup
1. In your Stripe dashboard, add a webhook endpoint pointing to your server
2. Subscribe to `payment_intent.succeeded` events
3. Use the webhook secret to verify incoming events

### Domain Verification
- For Apple Pay: Add domain verification files to your server
- For Google Pay: Configure your domain in Google Pay Business Console

## Testing

### Test Credit Cards (Stripe)
- **Visa**: 4242424242424242
- **Visa (debit)**: 4000056655665556
- **Mastercard**: 5555555555554444
- **American Express**: 378282246310005
- **Declined card**: 4000000000000002

### PayPal Testing
- Use PayPal sandbox credentials
- Test with sandbox buyer accounts

## Fallback Options

The system includes multiple fallback options:
1. If Stripe fails → Show PayPal option
2. If both fail → Redirect to Buy Me a Coffee
3. If JavaScript is disabled → Show static Buy Me a Coffee link

## Customization

### Styling
- All payment forms use CSS custom properties for easy theming
- Update colors in the `:root` selector in `payment.html`
- The design matches your existing BlueJai website theme

### Payment Amounts
- Default amounts are $5, $10, $20, $50, $100
- Users can enter custom amounts
- Modify the amount buttons in `payment.html` as needed

## Monitoring and Analytics

### Stripe Dashboard
- Monitor payments, refunds, and disputes
- Set up email notifications for important events
- Use Stripe's built-in analytics

### PayPal Dashboard
- Track PayPal transactions
- Monitor fees and settlements
- Configure dispute handling

## Troubleshooting

### Common Issues

1. **"Stripe is not defined" error**
   - Check that the Stripe script is loading properly
   - Verify your publishable key is correct

2. **PayPal button not appearing**
   - Verify your PayPal client ID
   - Check browser console for errors
   - Ensure PayPal script is loading

3. **Apple Pay not showing**
   - Only works on Safari/iOS
   - Requires proper merchant setup
   - Domain must be verified with Apple

4. **Backend connection errors**
   - Verify your server is running
   - Check CORS configuration
   - Ensure endpoints match your deployment

### Support

For issues specific to:
- **Stripe**: Check [Stripe documentation](https://stripe.com/docs)
- **PayPal**: Visit [PayPal Developer docs](https://developer.paypal.com/docs/)
- **Apple Pay**: See [Apple Pay documentation](https://developer.apple.com/apple-pay/)
- **Google Pay**: Check [Google Pay guides](https://developers.google.com/pay)

## Next Steps

1. Set up your payment provider accounts
2. Configure the API keys
3. Deploy the backend server
4. Test all payment methods
5. Set up webhook monitoring
6. Go live!

Remember to switch from test/sandbox mode to production when you're ready to accept real payments. 