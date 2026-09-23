// lib/stripe.ts
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10' as any,
});

/**
 * Create a checkout session for subscription
 * Placeholder: in production, this would create a real Stripe session
 */
export async function createSubscriptionCheckout(
  userId: string,
  email: string,
  months: number = 1,
  successUrl: string,
  cancelUrl: string
): Promise<string | null> {
  try {
    // TODO: Implement real Stripe Checkout
    // For now, return a placeholder
    console.log(
      `[PLACEHOLDER] Creating Stripe session for user ${userId}, ${months} month(s)`
    );

    // In production:
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   customer_email: email,
    //   line_items: [
    //     {
    //       price_data: {
    //         currency: 'eur',
    //         product_data: {
    //           name: `CTC Santé Subscription (${months} month${months > 1 ? 's' : ''})`,
    //         },
    //         unit_amount: months * 2999, // €29.99 per month
    //       },
    //       quantity: 1,
    //     },
    //   ],
    //   mode: 'payment',
    //   success_url: successUrl,
    //   cancel_url: cancelUrl,
    //   metadata: {
    //     userId,
    //     months,
    //   },
    // });
    // return session.id;

    // Placeholder: return fake session ID for testing
    return `session_fake_${Date.now()}`;
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return null;
  }
}

/**
 * Handle Stripe webhook (payment success)
 * Placeholder: would activate subscription on successful payment
 */
export async function handleCheckoutCompleted(
  sessionId: string,
  metadata: any
): Promise<boolean> {
  try {
    console.log(
      `[PLACEHOLDER] Webhook: Checkout completed for session ${sessionId}`
    );
    // TODO: Update user subscription status to ACTIVE
    // subscription.subscriptionStatus = 'ACTIVE'
    // subscription.subscriptionEndAt = now + 30 days

    return true;
  } catch (error) {
    console.error('Webhook processing error:', error);
    return false;
  }
}
