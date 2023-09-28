import Stripe from "stripe";
import { NextResponse } from "next/server"
import { Price } from "@/type";

export async function POST(request: Request) {
  let data = await request.json()
  console.log("DATA:"+JSON.stringify(data.items))

  const stripe = await new Stripe(process.env.STRIPE_TEST_SECRET as string, { apiVersion: "2022-11-15" })
  
  let session = await stripe.checkout.sessions.create({
    line_items: data.items.map( (item:Price) => { return { price: item.priceID, quantity: item.quantity }}),
    mode: 'payment',
    success_url: "/shop/cart/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: `${"/shop/cart"}`, //return to
  });


  return NextResponse.json( session )
}
