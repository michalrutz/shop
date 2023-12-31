import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET() {
  const stripe = await new Stripe( process.env.STRIPE_TEST_SECRET as string, { apiVersion: "2022-11-15"} )

  const products = await stripe.products.list({
    limit:10
  })

  let productWithPrices;
  if (products?.data){
    productWithPrices = await Promise.all(
    products.data.map(async (product) => {
      const price = await stripe.prices.retrieve( product.default_price as string)
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
  } 

  return NextResponse.json( productWithPrices )
}