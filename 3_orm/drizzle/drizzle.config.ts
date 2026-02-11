import 'dotenv/config'
import {defineConfig} from 'drizzle-kit'


export default defineConfig({
  schema: "./src/dirzzle/schema.ts",
  out: "./src/dirzzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string
  },
  verbose: true,
  strict: true
})