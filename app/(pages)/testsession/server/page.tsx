import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from 'next-auth/next'
import Image from "next/image"

export default async function Page() {
  const session = await getServerSession(authOptions)


  return (
    <div className="bg-slate-400 h-screen   flex flex-col justify-center items-center">
      <div className="bg-red-400 sm:container sm:mx-auto m-4 p-4 flex flex-col justify-center items-center shadow"
      >
        <p className="pt-8" >{session?.user?.email}</p>
        <p className="pt-8">{session?.user?.name}</p>
      <Image src={session?.user?.image as string}
        width={100}
        height={100}
        alt="Picture of the author"
      />
      </div>
    </div>
  );
}
