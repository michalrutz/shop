import Link from "next/link";

export default function Navigation() {
  return (
    <div className="bg-love flex flex-row gap-2">
      <Link href="http://localhost:3000" >HOME</Link>
      <Link href="http://localhost:3000/api/auth/signin" >sign in</Link>
      <Link href="http://localhost:3000/api/auth/signout" >sign out</Link>
      <Link href="http://localhost:3000/protected/client">client</Link>
      <Link href="http://localhost:3000/testsession">session</Link>
      <Link href="http://localhost:3000/cache">cache</Link>
      <Link href="http://localhost:3000/shop/getProducts">products</Link>
    </div>
  );
}