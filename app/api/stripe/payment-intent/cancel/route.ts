import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

const stripe = new Stripe(process.env.STRIPE_TEST_SECRET as string, { apiVersion:"2022-11-15" })

export async function POST(request:NextRequest, response:NextResponse) {

  const {paymentIntentsID} = await request.json()
  console.log("CANCEL paymentIntent")

  const canceledPaymentIntent = await stripe.paymentIntents.cancel(
    paymentIntentsID
  );

  return NextResponse.json({
    secret:canceledPaymentIntent.client_secret,
    paymentIntentsID: canceledPaymentIntent.id,
    message: "order canceled successfuly"
  })
}