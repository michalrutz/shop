import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

const prisma = new PrismaClient()

export const Options = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // ...add more providers here
  ],
  events: {
    createUser: async ( data: any ) => {
      const user = data.user
      console.log("CREATE STRIPE USER")
      const stripe = await new Stripe( process.env.STRIPE_TEST_SECRET as string, {
        apiVersion: "2022-11-15"
      } )
      //create a stripe cusomer
      if(user.name && user.email){
        const { email, name } = user;
        const cusomer = await stripe.customers.create({ email, name })

        await prisma.user.update( {
          where:  { id: user.id },
          data:   { stripeCustomerId: cusomer.id }
        } )
      }
    }
  }
}
const handler = NextAuth( Options )

export { handler as GET, handler as POST }