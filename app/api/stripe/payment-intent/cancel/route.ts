import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

const stripe = new Stripe(process.env.STRIPE_TEST_SECRET as string, { apiVersion:"2022-11-15" })

export async function POST(request:NextRequest, response:NextResponse) {

  const body = await request.json()

  const canceledPaymentIntent = await stripe.paymentIntents.cancel(
    body.paymentIntentsID
  );

  return NextResponse.json({
    secret:canceledPaymentIntent.client_secret,
    paymentIntentsID: canceledPaymentIntent.id,
    message: "order canceled successfuly"
  })
}