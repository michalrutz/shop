"use client"
import { ButtonThemeOption } from "@stripe/stripe-js";
import React, { useState, useEffect } from "react";

const handleSubscription = async (e:React.MouseEvent<HTMLButtonElement>, priceId:number) => {
  e.preventDefault();
  
  
  const response = await fetch('/api/checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priceId,
    }),
  });
  const data = await response.json();

  window.location.assign(data)
}

export default function ProductDisplay (props){
  const {priceId} = props;
  return(
    <form className="flex flex-col">
      <h1 className="flex bg-slate-100 text-red-400 font-bold pt-2 pb-2 pl-4" >ProductDisplay Component</h1>
      <button className="
        flex w-full justify-center
        bg-[#f1592a] py-2 px-4
        text-sm font-medium text-white
        rounded-md border border-transparen
        shadow-sm"
        onClick={ (e) => handleSubscription(e, priceId) }
      >
        Rent This Dumpster {JSON.stringify(priceId)}
      </button>
    </form>
  );
} 


