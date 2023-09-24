import Link from "next/link";
import CardButton from "./CardButton";
import { getServerSession } from 'next-auth/next'
import { authOptions } from "../../api/auth/[...nextauth]/route";
import Image from "next/image";
import HoverMenu from "./HoverMenu";


export default async function Navigation() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex w-full justify-center bg-slate-100 ">
    <div className="bg-transparent flex flex-row gap-2 justify-between items-center pt-2 pb-1 text-slate-600 w-full max-w-screen-xl xl:absolute">
      
      <div className="flex flex-row items-center gap-3 pl-4 text-lg">
        <Link href="/shop/products">Gallery</Link>
      </div>

      <div className="flex flex-row gap-3 justify-between items-center border pl-1 pr-3 rounded-full">
        { session && session.user ?
         <HoverMenu user={session.user}/> : 
         <Link href="/api/auth/signin" className="pl-4">Sign In</Link>
        }
        <CardButton />
      </div>
    </div>
    </div>
  );
}