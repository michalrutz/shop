import Link from "next/link";
import CardButton from "./CardButton";
import { getServerSession } from 'next-auth/next'
import { Options } from "../../api/auth/[...nextauth]/route";
import HoverMenu from "./HoverMenu";
import MaxWrapper from "../MaxWrapper";


export default async function Navigation() {
  const session = await getServerSession(Options)

  return (
    <MaxWrapper>

      <div className="bg-transparent flex flex-row justify-between items-center pt-1 pb-1 text-slate-600 w-full border-b text-lg">
      
        <div className="flex flex-row items-center  border rounded-full p-1.5 pl-3 pr-3 shade">
          <Link href="/">Gallery</Link>
        </div>

        <div className="flex flex-row gap-3 justify-between items-center border pl-1 pr-3 rounded-full shade">
          { session && session.user ?
          <HoverMenu user={session.user}/> : 
          <Link href="/api/auth/signin" className="pl-4">Sign In</Link>
          }
          <CardButton />
        </div>
      </div>
      </MaxWrapper>

  );
}