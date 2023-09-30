import Link from "next/link";
import { SingleProductWithPrice } from "@/type"
import Stripe from "stripe";

export default async function GetProductsPage() {
  
 async function getProductsList() {
  const stripe = await new Stripe( process.env.STRIPE_TEST_SECRET as string, { apiVersion: "2022-11-15"} )

  const products = await stripe.products.list({
    limit:10
  })

  let productWithPrices: SingleProductWithPrice[];
  if (products?.data){
      productWithPrices = await Promise.all(
      products.data.map(async (product) => {
        const price = await stripe.prices.retrieve( product.default_price as string)
        return {
          id: product.id as string,
          name: product.name as string,
          unit_amount: price.unit_amount as number,
          images: product.images as string[],
          currency: price.currency as string,
          priceID: price.id as string,
          description: product.description as (string | undefined),
          metadata: product.metadata as {}
        }
      })
    )
    return productWithPrices
    }
  }
  let products = await getProductsList();

  return (
    <div className="flex flex-row flex-wrap justify-center gap-1.5 pt-1.5 pb-1.5">
      {products && products.map(
        (product:SingleProductWithPrice) => { return (
          <Link href={"/shop/products/"+product.priceID} className="bg-white shade">
            {/*IMAGE*/}
            <div className="max-w-full min-w-[255px] h-[255px]" style={{ backgroundImage: `url(${product.images[0]})`, backgroundSize:"cover", backgroundPosition: "center" }}></div>
            {/*DESCRIPTION*/}
            <div className="p-1 pl-4 pr-4 pb-3 ">
              <h3 className="font-light text-lg border-b ">{product.name.slice(0,1).toUpperCase()}{product.name.slice(1)}</h3>
              <p className="font-light text-xs p-1">21.6 W x 29.5 H x 0.3 D cm</p>
              <div className='flex flex-row justify-between items-center p-1'>
                <div className='flex relative'>
                  <span className='text-md self-start items-start'>€</span>
                  <span className='text-md font-md'>
                    { product.unit_amount.toString().slice( 0, product.unit_amount.toString().length-2 ) }
                  </span>
                  <span className='text-xs self-start items-start relative top-[3px] left-0.5'>{ product.unit_amount.toString().slice(-2) }</span>
                </div>
              </div>
            </div>     
          </Link>
          )}
      )}
    </div>
  );
}