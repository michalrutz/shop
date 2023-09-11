import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()



async function main() {
        const newUser = await prisma.user.create({data: {name:"Mike"}})
        console.log(newUser)   
}

main()
        .catch( (e: Error)=> { console.error(e.message) } )
        .finally( async ()=> { await prisma.$disconnect() } )