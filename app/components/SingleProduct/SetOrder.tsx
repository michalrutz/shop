"use client"
import React, { useState } from "react";
import { AdjustQuantity } from '../buttons/AdjustQuantity';
import { useSnapshot } from 'valtio';
import { state } from '@/valtio/store';
import PriceTag from './PriceTag';

const handleBuyNow = async (e:React.MouseEvent<HTMLButtonElement>, priceID:string, quantity:number) => {
  e.preventDefault();
  
  const response = await fetch('/api/checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      { items: [{priceID: priceID, quantity: quantity}] }
      // add priceID and quantity of each Product (from Zustand) { items: [{priceID, quantity}] }
      // add -> add to Cart Zustand
      ),
  })
  let j = await response.json()
  window.location.assign(j.url)
}

interface PropsSetOrder {
  priceID:string,
  unit_amount: number,
  currency: string
}

export default function SetOrder ({ priceID, unit_amount, currency }: PropsSetOrder ){
  //Valtio
  const snap = useSnapshot(state)
  //States
  const [ quantity, setQuantity ] = useState(1);
  //Handlers

  function addToCart(e:React.MouseEvent<HTMLButtonElement, MouseEvent>, priceID:string, quantity:number) {
    e.preventDefault()
    console.log("add to cart")
    //Check whether the product is already in your shopping cart
    const index = snap.cartItems.findIndex( item => item.priceID === priceID)
    if ( index >= 0 ){
      console.log("product already in the cart, update the quantity")
      state.cartItems[index].quantity += quantity
    }
    else{
      state.cartItems = [...state.cartItems, {priceID, quantity}]
    }
  }


  return(
    <>
    <form
      style={{ boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)' }}
      className="w-[256px] flex flex-col gap-3 p-6
        bg-white rounded-lg m-auto
      ">
      <h1 className="text-slate-900 font-semibold text-lg border-b " >Set Order</h1>
      {/*QUANTITY*/}
      <div className='flex flex-row items-center justify-between pt-2'>
      <span className='text-teal-500 font-medium text-md'>In Stock</span>
      <AdjustQuantity setQuantity={setQuantity} quantity={quantity} />
      </div>
      
      {/*PRICE*/}
      <div className='flex flex-row justify-between items-center pt-3 pb-6 border-b'>
        <span className='text-slate-500 font-medium text-md'>Total Price:</span>
        <PriceTag quantity={quantity} unit_amount={unit_amount} />
      </div>     
      {/*BUY NOW*/}
      <button className="callToAction Dom" onClick={ (e) => handleBuyNow(e, priceID, quantity) }>Buy Now</button>
      <button className="callToAction Sub" onClick={ (e) => addToCart( e, priceID, quantity ) }>Add to Basket</button>
    </form>
    </>
  );  
} 


