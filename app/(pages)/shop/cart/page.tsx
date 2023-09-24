"use client"

import CartSingleProdcut from "@/app/components/displays/CartSingleProdcut";
import { state } from "@/valtio/store";
import { useSnapshot } from "valtio";

export default function Cart () {
  const snap = useSnapshot( state );
  const { cartItems } = state

  async function handleCheckout() {
    const session = await( await fetch("/api/checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartItems })
    })).json()
    console.log(session)

    window.location.assign(session.url)
  }


  return(
    <>
      {/* PRODUCTS IN THE CART */}
      { cartItems.length !== 0  ? (
        <div className="flex flex-row flex-wrap justify-center align-middle items-center ml-auto mr-auto w-[1024px] max-w-full max-h-screen lg:min-h-screen" >
          <div className="flex flex-col gap-3 bg-white w-full max-w-[512px]" >
          { snap.cartItems.map( item => { return (
              <CartSingleProdcut item={ item } key={item.priceID} />
            )})
          }
          </div>
      {/* CHECKOUT */}
          <div className="min-h-[144px] flex flex-col items-center justify-center max-w-full w-[256px] " >
            <button onClick={ (e) => { e.preventDefault(); handleCheckout(); }} className="callToAction Dom w-full max-w-[128px] ">
              Checkout
            </button>
          </div>
        </div>
        )
      : (
      <div className="flex flex-row justify-center items-center w-full min-h-[500px] ">
        <p>Your cart is  empty</p>
      </div> )
      }
    </>
  )
}