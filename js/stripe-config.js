/**
 * Stripe client config.
 * Replace publishableKey with your pk_test_... or pk_live_... key from the Stripe Dashboard.
 * checkoutApiUrl points at the server endpoint that creates Checkout Sessions.
 */
window.HSIAH_STRIPE = {
  publishableKey: 'pk_test_REPLACE_ME',
  checkoutApiUrl: '/api/create-checkout-session',
};
