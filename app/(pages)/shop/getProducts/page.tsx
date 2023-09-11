import CheckoutForm from "@/app/components/CheckoutForm";
import ProductDisplay from "@/app/components/ProductDisplay";

export default async function GetProductsPage() {
  
  const {data} =
      await fetch("http://localhost:3000/api/stripe/auto-checkout")
        .then( response => response.json() );

  console.log(data)

  return (
    <div>
      <h1>Hello Page</h1>
      {data.map((price: {id:number}) => { return(<>
          <ProductDisplay priceId={price.id}/>
        </>
      )} )}
    </div>
  );
}