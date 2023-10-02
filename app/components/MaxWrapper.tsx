import { ReactNode } from "react";

export default function MaxWrapper(
  {children}:
  {children: ReactNode}) {
  return(
    <div className="mx-auto w-full max-w-[1380px] px-2 md:px-10">
       {children}
    </div>
  )
}