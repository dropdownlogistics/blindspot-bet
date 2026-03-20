import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import * as dotenv from "dotenv"

dotenv.config()

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  const users = [
    { id: "user_3BBYQbEbybvqRoFV7jnulBoOEW5", email: "flammond2014@yahoo.com" },
    { id: "user_3BABrUWnEhNrwfz1LgMwpD0B7qP", email: "mark.j.kitchens@gmail.com" },
    { id: "user_3B6NYpJTOsdk5O61DmwtYHInfZW", email: "dkitchens31@gmail.com" },
    { id: "user_3AwO5bj4gUput25DjPQyCHIQrIQ", email: "dropdownlogistics@gmail.com" },
  ]

  for (const user of users) {
    const result = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        id: user.id,
        email: user.email,
        tokenBalance: 1000,
      },
    })
    console.log("Seeded:", result.email)
  }
}

main()
  .then(() => { console.log("Done"); process.exit(0) })
  .catch((e) => { console.error(e); process.exit(1) })