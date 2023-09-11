import Stripe from "stripe";
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  let data = await request.json()
  let priceID = data.priceId

  const stripe = await new Stripe(process.env.STRIPE_TEST_SECRET as string, { apiVersion: "2022-11-15" })
  
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        // You can map all prices too!
        price: priceID,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${"http://localhost:3000/"}`,
    cancel_url: `${"http://localhost:3000/"}`,
  });

  return NextResponse.json(session.url)
}
