'use client'

import { SessionProvider } from 'next-auth/react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import HydrationZustand from './HydrationZustand';

const stripePromise = loadStripe( 
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string, 
  { apiVersion: "2022-11-15" }
  )

const options = {
  mode: 'payment',
  currency: 'usd',
  amount: 1099,
};


export default function Provider({ children }: { children: React.ReactNode }) {

  return (
  <HydrationZustand>
    <Elements stripe={stripePromise} options={options}>
      <SessionProvider>
        {children}
      </SessionProvider>
    </Elements>
  </HydrationZustand>
  )
}

