import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.json();

  const stripe = await new Stripe( process.env.STRIPE_TEST_SECRET as string, { apiVersion: "2022-11-15"} )
  const price = await stripe.prices.retrieve( body.priceID )
  const product = await stripe.products.retrieve( price.product as string )

  const productWithPrice = {
      id: product.id,
      name: product.name,
      unit_amount: price.unit_amount,
      images: product.images,
      currency: price.currency,
      priceID: price.id,
      description: product.description,
      metadata: product.metadata
  }
  
  console.log(productWithPrice)

  return NextResponse.json( productWithPrice )
}