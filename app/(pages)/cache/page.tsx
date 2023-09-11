
"use client"

import CheckoutForm from '@/app/components/CheckoutForm';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const [randomNumber, setRandomNumber] = useState(0);
  const [num, setNum] = useState(0);


  useEffect(() => {
    setRandomNumber(Math.random());
  }, []);

  return (
    <div>
      <h1>Cache Page</h1>
      <p>{randomNumber}</p>
      <h1>Custom Checkout</h1>
      <CheckoutForm/>
      <button onClick={()=>{setNum(num+1)}}>+</button>{num}
    </div>
  );
}
