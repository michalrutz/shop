import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(request: Request) {
  const stripe = await new Stripe( process.env.STRIPE_TEST_SECRET as string, { apiVersion: "2022-11-15"} )
  const prices = await stripe.prices.list({
    limit:2
  })

  return NextResponse.json( prices )
}