'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image';

const ClientProtectPage = () => {
  const { data: session } = useSession({
    required: true
  })

  return (
    <section className='flex flex-col md:flex-row justify-center items-center w-full h-full m-auto'>
      <aside className=' w-full md:max-w-[144px] max-w-[512px]'>
        <ul className='w-ful flex felx-row md:flex-col justify-start items-start gap-3 p-4'>
          <li >Accouct</li>
          <li >Order</li>
        </ul>
      </aside>
      <div className='flex flex-col justify-center w-full max-w-[512px] p-4 pt-10  min-h-screen' >
        <Image className="rounded-full"
          src={session?.user?.image} // Route of the image file
          height={64} // Desired size with correct aspect ratio
          width={64} // Desired size with correct aspect ratio
          alt={"user photo"}
          style={{objectFit: "contain"}}
        />
        <div className='container text-slate-600'>
          <h2 className='mt-4 font-medium'>Name: {session?.user?.name}</h2>
          <h2 className='mt-4 font-medium'>Email: {session?.user?.email}</h2>
        </div>
      </div>

    </section>
  )
}

export default ClientProtectPage