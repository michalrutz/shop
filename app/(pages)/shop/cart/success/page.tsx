import { Order } from "@/app/components/order/Order";
import Stripe from "stripe";

export default async function SuccessPage (params:any) {
  const stripe = new Stripe( process.env.STRIPE_TEST_SECRET as string , {apiVersion:"2022-11-15"});
  const session = await stripe.checkout.sessions.retrieve(params.searchParams.session_id);

  //1. save the order from the valtio to prisma
  //2. clear the valtio

  return (<div className="w-full flex flex-col items-center gap-2">
    <p className="text-lg text-slate-600 p-2 pt-3" >Your payment was successful</p>
    <Order />
  </div>)
}