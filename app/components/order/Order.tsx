"use client"

import { state } from "@/valtio/store"
import { useSnapshot } from "valtio"
import OrderSimpleProductView from "./OrderSimpleProductView";

export function Order () {
  const snap = useSnapshot(state);
  return(
   <div className="flex flex-col justify-between w-full max-w-[512px]" >
    { snap.cartItems.map(
        item => { return (
          <OrderSimpleProductView item={ item } key={item.priceID} />
        )})
    }
  </div>
  )  
}