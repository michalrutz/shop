import Link from "next/link";
import CardButton from "./buttons/CardButton";
import { getServerSession } from 'next-auth/next'
import { authOptions } from "../api/auth/[...nextauth]/route";
import { SiCarthrottle } from "react-icons/si";
import { AiFillHome } from "react-icons/ai"; 
import Image from "next/image";


export default async function Navigation() {
  const session = await getServerSession(authOptions)

  return (
    <div className="bg-[rgb(22,24,40)] flex flex-row gap-2 justify-between items-center p-3 pl-5 pr-5 text-slate-100">
      <div className="flex flex-row items-center gap-3">
        <SiCarthrottle className="w-9 h-9"/>
        <Link href="http://localhost:3000/shop/products">products</Link>
      </div>
      <div className="flex flex-row gap-5 justify-between items-center ">
        <CardButton />
        { session && session.user ?
          <>
            <Link href="http://localhost:3000/protected/client" className="flex flex-row justify-between items-center">
              <Image
                className="w-8 h-8 rounded-full border-2 border-white"
                src={ session.user.image as string } // Route of the image file
                height={144} // Desired size with correct aspect ratio
                width={144} // Desired size with correct aspect ratio
                alt="Your Name"
              />
            </Link>
            <Link href="http://localhost:3000/api/auth/signout" >sign out</Link>
          </> :
            <Link href="http://localhost:3000/api/auth/signin" >sign in</Link>
        }
      </div>
    </div>
  );
}