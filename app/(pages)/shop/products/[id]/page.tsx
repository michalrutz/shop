import SetOrder from "@/app/components/SingleProduct/SetOrder";
import Stripe from "stripe";
import Image from 'next/image';
import { DisplayProduct } from "@/app/components/SingleProduct/DisplayProduct";
import { Price, Product } from "@/type";


export default async function SingleProduct( {params}:{params:{id:string}} ) {
  const {id} = params; //get the query [id]
  //get Price and the Priduct from Stripe
  
  const stripe = await new Stripe( process.env.STRIPE_TEST_SECRET as string, { apiVersion: "2022-11-15"} )
  const price = await stripe.prices.retrieve(
    id
  );
  const product:any = await stripe.products.retrieve(
    price.product.toString()
  )
  const { id:priceID, unit_amount, currency } = price

  return (<>
    <div className="flex flex-col flex-wrap g-4 w-full sm:flex-row justify-center align-middle">
      <Image className="max-h-[700px]  w-[512px] col-span-2"
        src={product.images[0]} // Route of the image file
        height={144} // Desired size with correct aspect ratio
        width={512} // Desired size with correct aspect ratio
        alt={product.name}
        style={{objectFit: "contain"}}
      />
      <div className="flex flex-col pt-4 min-w-[256px] justify-start align-top m-2">
        <DisplayProduct product={product} />
        <SetOrder priceID={priceID} unit_amount={unit_amount} currency={currency}/>
      </div>
    </div>
  </>)
}