import { PrismaClient, Prisma } from './generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter: pool })


async function seed () {
  
}