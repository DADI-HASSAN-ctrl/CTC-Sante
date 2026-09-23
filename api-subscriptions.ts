// app/api/subscriptions/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/lib-auth';
import { prisma } from '@/lib/lib-prisma';
import { createSubscriptionCheckout } from '@/lib/lib-stripe';
import { UserRole } from '@/types';
import { z } from 'zod';

const checkoutSchema = z.object({
  months: z.number().min(1).max(12),
  callbackUrl: z.string().url(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (session?.user?.role !== UserRole.TAXI) {
      return NextResponse.json(
        { error: 'Only taxis can subscribe' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { months, callbackUrl } = checkoutSchema.parse(body);

    // Create subscription payment record
    const payment = await prisma.subscriptionPayment.create({
      data: {
        userId: session.user.id,
        amount: months * 2999, // €29.99 per month
        status: 'PENDING',
      },
    });

    // Create Stripe session
    const successUrl = `${callbackUrl}?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = callbackUrl;

    const sessionId = await createSubscriptionCheckout(
      session.user.id,
      session.user.email,
      months,
      successUrl,
      cancelUrl
    );

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Failed to create checkout session' },
        { status: 500 }
      );
    }

    // Update payment with session ID
    await prisma.subscriptionPayment.update({
      where: { id: payment.id },
      data: { stripeSessionId: sessionId },
    });

    return NextResponse.json({
      sessionId,
      checkoutUrl: `https://checkout.stripe.com/pay/${sessionId}`,
      amount: payment.amount,
    });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Checkout failed' },
      { status: 400 }
    );
  }
}

// ─────────────────────────────────────────────────
// app/api/subscriptions/status/route.ts
// ─────────────────────────────────────────────────

export async function GET_STATUS(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const subscriptionEndAt = user.subscriptionEndAt
      ? new Date(user.subscriptionEndAt)
      : null;
    const daysRemaining =
      subscriptionEndAt && subscriptionEndAt > new Date()
        ? Math.ceil(
            (subscriptionEndAt.getTime() - new Date().getTime()) /
              (1000 * 60 * 60 * 24)
          )
        : 0;

    return NextResponse.json({
      status: user.subscriptionStatus,
      endAt: subscriptionEndAt,
      daysRemaining,
      isExpired:
        subscriptionEndAt && subscriptionEndAt < new Date() ? true : false,
    });
  } catch (error: any) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { error: 'Failed to check status' },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────────
// app/api/subscriptions/activate/route.ts (ADMIN)
// ─────────────────────────────────────────────────

const activateSchema = z.object({
  userId: z.string(),
  months: z.number().min(1),
});

export async function POST_ACTIVATE(request: NextRequest) {
  try {
    const session = await auth();

    if (session?.user?.role !== UserRole.ADMIN) {
      return NextResponse.json(
        { error: 'Only admins can activate subscriptions' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { userId, months } = activateSchema.parse(body);

    const subscriptionEndAt = new Date();
    subscriptionEndAt.setDate(subscriptionEndAt.getDate() + months * 30);

    await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionStatus: 'ACTIVE',
        subscriptionEndAt,
      },
    });

    return NextResponse.json({
      message: 'Subscription activated',
      subscriptionEndAt,
    });
  } catch (error: any) {
    console.error('Activation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to activate' },
      { status: 400 }
    );
  }
}
