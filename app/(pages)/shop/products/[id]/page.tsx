import SetOrder from "@/app/components/SetOrder";
import Stripe from "stripe";
import Image from 'next/image';
import { DisplayProduct } from "@/app/components/displays/DisplayProduc";

export default async function SingleProduct( {params} ) {
  const {id} = params; //get the query [id]
  //get Price and the Priduct from Stripe
  const stripe = await new Stripe( process.env.STRIPE_TEST_SECRET as string, { apiVersion: "2022-11-15"} )
  const price = await stripe.prices.retrieve(
    id
  );
  const product = await stripe.products.retrieve(
    price.product
  )
  const { id:priceID, unit_amount, currency } = price

  return (<>
    <div className="min-w-full grid grid-cols-3 pt-4 m-auto">

      <Image className="mainImg col-span-2 m-auto"
        src={product.images[0]} // Route of the image file
        height={144} // Desired size with correct aspect ratio
        width={512} // Desired size with correct aspect ratio
        alt={product.name}
        style={{objectFit: "contain"}}
      />
      <div className="col-span-1 ">
        <DisplayProduct product={product} price={price}/>
        <SetOrder priceID={priceID} unit_amount={unit_amount} currency={currency}/>
      </div>
    </div>
  </>)
}