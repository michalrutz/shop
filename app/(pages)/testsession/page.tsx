'use client';
import { useSession } from "next-auth/react"
import Image from "next/image"

export default function Page() {
  const {data: session} = useSession()

  return (
    <div>
      <h1>Client Component</h1>
      {session && session.user && 
        Object.entries(session.user).map(([key, value]) => (
        <div key={key}>
          {`${key}: ${value}`}
        </div>
      ))}
      {session && session?.user?.image &&
        <div>
          <Image
            src={session.user.image}
            width={100}
            height={100}
            alt="Picture of the author"
          />
        </div>
      }
    </div>
  );
}