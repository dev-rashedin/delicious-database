import {pgTable} from "drizzle-orm/pg-core"

export const userTable = pgTable("users", {
   id: integer().primaryKey().generatedAlwaysAsIdentity(),
})