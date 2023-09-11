import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

const stripe = new Stripe(process.env.STRIPE_TEST_SECRET as string, { apiVersion:"2022-11-15" })

export async function POST(request:NextRequest, response:NextResponse) {
  let cart= []
  //1. check if user is logged
  const session = await getServerSession(authOptions)
  
  if (session === null) {
    return NextResponse.json({
      message: "please log in"
    }) 
  }


  //2. get the order
  const body = await request.json()
  cart.push(body)
  
  //Check if the payment intent exists just update the order

  //3 check if a payment intent already exists
  //3.1 create a payment intent
    // 3.2 save the order data with Prisma
  const paymentIntents = await stripe.paymentIntents.create({
    amount: body.amount,
    currency: "eur"
  })


  return NextResponse.json({
    secret:paymentIntents.client_secret,
    paymentIntentsID: paymentIntents.id,
    message: "submision successful"
  })
}