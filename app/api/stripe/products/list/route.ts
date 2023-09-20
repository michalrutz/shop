import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(request: Request) {
  const stripe = await new Stripe( process.env.STRIPE_TEST_SECRET as string, { apiVersion: "2022-11-15"} )

  const products = await stripe.products.list({
    limit:10
  })


  const productWithPrices = await Promise.all(
    products.data.map(async (product) => {
      const price = await stripe.prices.retrieve( product.default_price )
      return {
        id: product.id,
        name: product.name,
        unit_amount: price.unit_amount,
        images: product.images,
        currency: price.currency,
        priceID: price.id,
        description: product.description,
        metadata: product.metadata
      }
    })
  )

  return NextResponse.json( productWithPrices )
}