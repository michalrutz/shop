import Link from "next/link";
import { ProductWithPrice } from "@/type"

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://shop-7czobjnlo-michalrutz.vercel.app/"
    : "http://localhost:3000";

export default async function GetProductsPage() {
  
  const products =
      await fetch(`${baseUrl}/api/stripe/products/list`)
        .then( response => response.json() );


  return (  
    <div className="flex flex-row flex-wrap justify-center gap-4 pt-4 m-auto">
      {products.map(
        (product:ProductWithPrice) => { return (
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