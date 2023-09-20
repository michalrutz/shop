"use client"

import { useState, useEffect } from "react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import formatPrice from "../functions/formatPrice"
import { useShopStore } from "@/store"

export default function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()

  const shopStore = useShopStore()



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) {
      return
    }

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          //shopStore.setCheckout("success")
        }
      })
  }

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <h1 className="py-4 text-sm font-bold ">Total: {1000}</h1>
      <button
        className={`py-2 mt-4  w-full bg-primary rounded-md text-white disabled:opacity-25`}
        id="submit"
      >
        <span id="button-text">
         <span>Pay now 🔥</span>
        </span>
      </button>
    </form>
  )
}