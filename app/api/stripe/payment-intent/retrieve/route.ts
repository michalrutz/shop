import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../../../auth/[...nextauth]/options";

const stripe = new Stripe(process.env.STRIPE_TEST_SECRET as string, { apiVersion:"2022-11-15" })

export async function POST(request:NextRequest, response:NextResponse) {

  const body = await request.json()
  console.log(body.paymentIntentsID)

  const session = await getServerSession(options)
  if (session === null) {
    return NextResponse.json({
      message: "please log in"
    }) 
  }

  const oldPaymentIntent = await stripe.paymentIntents.retrieve(
    body.paymentIntentsID
  );
  console.log("old id "+oldPaymentIntent.id)

  return NextResponse.json({
    secret:oldPaymentIntent.client_secret,
    paymentIntentsID: oldPaymentIntent.id,
    message:"order retrieved"
  })
}
