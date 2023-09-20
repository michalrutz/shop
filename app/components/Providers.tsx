'use client'

import { SessionProvider } from 'next-auth/react'
import HydrationZustand from './HydrationZustand';


export default function Provider({ children }: { children: React.ReactNode }) {

  return (
  <HydrationZustand>
      <SessionProvider>
        {children}
      </SessionProvider>
  </HydrationZustand>
  )
}

