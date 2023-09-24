"use client"

import Link from "next/link";
import { Price } from "@/type";
import { PiShoppingCartThin } from "react-icons/pi";
import { useSnapshot } from "valtio";
import { state } from "@/valtio/store";
import { useEffect, useState } from "react";



function calculateQuantity( array:Price[] ) {
  let temp = 0;
  for (let index = 0; index < array.length; index++) {
    temp = temp+array[index].quantity
  }
  return temp
}

export default function CardButton() {
  const snap = useSnapshot(state)

  const [quanity, setQ] = useState(0);
  useEffect( ()=> { setQ( calculateQuantity(state.cartItems) ) },[snap.cartItems]) 

  return(
    <Link href="http://localhost:3000/shop/cart" className="relative ">
      <PiShoppingCartThin className="w-10 h-10 text-slate-800
      "/> 
      { quanity ? 
        <span className="absolute -top-[3px] right-[8px] bg-teal-500 w-5 h-5 text-sm rounded-full flex justify-center items-center">
          { quanity } 
        </span> : ""
      }
    </Link>
  )
}