import { Price, Product } from "@/type";

export function DisplayProduct( props: { product:Product, price:Price } ) {
  const {product, price} = props

  return(<>
      <div className="w-full p-5 pt-0 font-thin font-sans text-slate-800">
        <h1 className="text-3xl italic border-b">
          {product.name}
        </h1>
        <h2 className="text-xl font-light ">Michael Rutz</h2>
        <div className="pt-2 text-sm font-normal text-slate-600">
          <p className="">21.6 W x 29.5 H x 0.3 D cm</p>
          {product.metadata?.date}
          {product.metadata?.technique}
        </div>
      </div>
  </>)
}