import { pgTable, text, serial } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

import { users } from '@/server/schema/users'

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: text('name').notNull()
})

export const rolesRelations = relations(roles, ({ many }) => ({ users: many(users) }))

export type InsertRole = typeof roles.$inferInsert
export type SelectRole = typeof roles.$inferSelect