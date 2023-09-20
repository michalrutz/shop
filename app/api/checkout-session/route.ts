import Stripe from "stripe";
import { NextResponse } from "next/server"
import { Price } from "@/type";

export async function POST(request: Request) {
  let data = await request.json()
  console.log("DATA:"+JSON.stringify(data.items))

  const stripe = await new Stripe(process.env.STRIPE_TEST_SECRET as string, { apiVersion: "2022-11-15" })
  
  const session = await stripe.checkout.sessions.create({
    line_items: data.items.map( (item:Price) => { return { price: item.priceID, quantity: item.quantity }}),
    mode: 'payment',
    success_url: `${"http://localhost:3000/"}`,
    cancel_url: `${"http://localhost:3000/"}`,
  });

  return NextResponse.json(session.url)
}
