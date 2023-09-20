"use client"

import CartSingleProdcut from "@/app/components/displays/CartSingleProdcut";
import { state } from "@/valtio/store";
import { useRouter } from "next/navigation";
import { useSnapshot } from "valtio";

export default function Cart () {
  const snap = useSnapshot( state );
  const { cartItems } = state

  async function handleCheckout() {
    const session = await( await fetch("http://localhost:3000/api/checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartItems })
    })).json()
    console.log(session)

    window.location.assign(session)
  }

  return(
    <div className="flex flex-row w-full bg-green-100">
      {/* PRODUCTS IN THE CART */}
      <div className="flex flex-col gap-2 bg-red-100 " style={{}}>
      {
        snap.cartItems.map( item => { return (
          <CartSingleProdcut item={ item } key={item.priceID} />
        )})
      }
      </div>

      {/* CHECKOUT */}
      <div className="bg-white">
        Total:
        <button onClick={ (e) => { e.preventDefault(); handleCheckout(); }}>
          CHECKOUT
        </button>
      </div>

    </div>

  
  )
}