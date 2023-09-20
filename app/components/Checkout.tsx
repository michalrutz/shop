"use client"

import { useShopStore } from '@/store';
import {Elements, PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';

const stripePromise = loadStripe( 
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string, 
  { apiVersion: "2022-11-15" }
  )

export default function CheckoutForm() {
  const {cartItems, paymentIntentsID, setPaymentIntentsID } = useShopStore()
  const [clientSecret, setSecret] = useState("")
  const [msg, setSMsg] = useState("")


  //a hard-coded order example
  const order = { amount:1000, paymentIntentsID }

  useEffect( () => {
    console.log("useEffect")
    fetchPaymentIntentSecret()
  }, [])

  async function fetchPaymentIntentSecret() {
    console.log("FETCH SECRET")

    let data = {
      secret: clientSecret,
      paymentIntentsID: paymentIntentsID,
      message: msg
    };

    //check if paymentIntentsID already exists if it does't CREATE a
    if(paymentIntentsID===""){
      data = await(
        await fetch(
          "http://localhost:3000/api/stripe/payment-intent/create",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            //add the Products in the cart here
            body: JSON.stringify( order )
          }
        )
      ).json()
    }
    //retrieve the existing payment intent
    else {
      data = await(
        await fetch(
          "http://localhost:3000/api/stripe/payment-intent/retrieve",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify( {paymentIntentsID} )
          }
        )
      ).json()
    }

    if( data.secret!=="" ){
      setSecret( data.secret )
      setPaymentIntentsID( data.paymentIntentsID )
      setSMsg( data.message )
    }else{
      setSMsg( data.message )
    }  
  }


  async function cancelPaymentIntent(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {

    e.preventDefault()

    const cancel = await (await fetch("http://localhost:3000/api/stripe/payment-intent/cancel",{
      method:"POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({paymentIntentsID})
    })).json()

    setPaymentIntentsID("")
    setSecret("")
    setSMsg(cancel.message)
  }

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  }

  return (
    <>
    { clientSecret && (
      <Elements options={options} stripe={stripePromise}>
        <CheckoutForm />
      </Elements>)}
    </>
  );
};

