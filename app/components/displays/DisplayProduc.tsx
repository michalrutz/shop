export function DisplayProduct({product, price}) {

  return(<>
      <div className="max-w-sm p-4 pt-0">
        <h1 className="font-semibold text-3xl">
          {product.name}
        </h1>
        <div>
          {product.metadata?.date}
          {product.metadata?.technique}
        </div>
      </div>
  </>)
}