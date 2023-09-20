'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import {PaymentElement} from '@stripe/react-stripe-js';
import CheckoutForm from '@/app/components/Checkout';
import { useOnlineStatus } from '@/app/components/useOnlineStatus';
import { useEffect } from 'react';

const ClientProtectPage = () => {
  const { data: session } = useSession({
    required: true
  })
  const isOnline = useOnlineStatus()


  return (
    <section className='py-24'>
      {JSON.stringify(isOnline)}
      <button disabled={!isOnline}>
      {isOnline ? 'online' : 'offline'}
      </button>
      <div className='container'>
        <h1 className='text-2xl font-bold'>
          This is a <span className='text-emerald-500'>client-side</span>{' '}
          protected page
        </h1>
        <h2 className='mt-4 font-medium'>You are logged in as:</h2>
        <p className='mt-4'>{session?.user?.name}</p>
      </div>
    </section>
  )
}

export default ClientProtectPage