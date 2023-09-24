import Link from "next/link"
import Image from 'next/image'
import { useEffect, useState } from "react";
import { ProductWithPrice } from "@/type"
import { Price } from "@/type"

export default  function OrderSimpleProductView( props: { item: Price } ) {
  const { item } = props
  const [product, setProduct] = useState<ProductWithPrice>()


  async function fetchProduct( priceID:string ) {
    console.log("FETCH Product and Price of PriceID "+priceID)
    const product = await (await fetch("http://localhost:3000/api/stripe/products/retrieve", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify( {priceID} )
    }))
    .json()
    
    return product
  }

  useEffect( () => {
    (async () => { setProduct( await fetchProduct( item.priceID ) )  })();
	  return () => {"component UNMONTED"};
  }, []);


  return(
    
  <div key={item.priceID} className="flex flex-row shade">
    { product ? (
    <>
      <Link href={"/shop/products/"+item.priceID} className="min-w-[100px] flex flex-col " >
        <Image className="rounded-md max-h-full"
          src={product?.images[0]}
          // Route of the image file
          height={72} // Desired size with correct aspect ratio
          width={72} // Desired size with correct aspect ratio
          alt="Image of the product" 
        />
      </Link>
       {/* PRODICT DESCRIPTION */}

        <div className="flex flex-row justify-between w-full p-3 pl-5 pr-6 font-sans text-slate-700 font-normal text-sm" >
            <div className="flex flex-col items-start">
              <Link href={"http://localhost:3000/shop/products/"+item.priceID} className="flex flex-col">
                <h2 className="text-base font-semibold pb-1">{ product?.name }</h2>
              </Link>
              <p className="text-normal text-slate-400">Quantity {item.quantity}</p>
            </div>
            {/* PRICE COL */}
            <div className="flex flex-col items-end" >
              <span className="text-base font-semibold pb-1">{ Number.parseFloat((product?.unit_amount*item.quantity).toString().slice(0,-2)).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }) }</span>
              { item.quantity > 1 && <span className="text-slate-400 border-t">{ Number.parseFloat((product?.unit_amount).toString().slice(0,-2)).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }) } each</span>}
            </div>
        </div>
    </>
    ) : "loading..."}
  </div>
  )
  
}

