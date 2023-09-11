"use client"

import { useShopStore } from '@/store';
import {PaymentElement} from '@stripe/react-stripe-js';
import React, { useState } from 'react';

export default function CheckoutForm() {
  const {cartItems, paymentIntentsID, setPaymentIntentsID } = useShopStore()
  const [secret, setSecret] = useState("")
  const [msg, setSMsg] = useState("")


  //a hard-coded order example
  const order = { amount:1000, paymentIntentsID }

  async function fetchSecret(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {

    e.preventDefault()
    console.log("FETCH SECRET")

    let data = {
      secret: secret,
      paymentIntentsID: paymentIntentsID,
      message: msg
    };

    //check if paymentIntentsID already exists
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

  async function fetchCancel(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {

    e.preventDefault()

    const cancel = await (await fetch("http://localhost:3000/api/stripe/payment-intent/cancel",{
      method:"POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({paymentIntentsID})
    })).json()

    console.log(cancel)

    setPaymentIntentsID("")
    setSecret("")
    setSMsg(cancel.message)
  }

  return (
    <form className=
    'flex flex-col justify-center bg-slate-500 m-auto md:max-w-3xl p-3 pt-4 pb-6'>
      <p>post the order, server creates payment-intent, returns the client secret</p>
      <button onClick={ (e)=>{ fetchSecret(e) } }>Submit</button>
      { paymentIntentsID && <button onClick={ (e)=>{ fetchCancel(e) } }>Cancel</button>}
      {msg}
      <p><span className='font-bold'>Client Secret: </span>{secret}</p>
      <p><span className='font-bold'>paymentIntentsID: </span>{paymentIntentsID}</p>
    </form>
  );
};

