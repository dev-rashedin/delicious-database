import {integer, pgTable, uuid, serial} from "drizzle-orm/pg-core"

export const userTable = pgTable("users", {
   id: uuid("id").primaryKey().defaultRandom(),
   id2: serial("id2").primaryKey(),
})