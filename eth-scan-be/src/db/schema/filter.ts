import { boolean, jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { nanoid } from 'nanoid'

export const filters = pgTable('filters', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  enabled: boolean('enabled').notNull().default(true),
  configuration: jsonb('configuration').unique().notNull().$type<NumberStringFilters>(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow()
})

export type FilterSelect = typeof filters.$inferSelect

type NumberStringFilters = {
  property: (typeof NumberStringProperties)[number]
  comparator: (typeof NumberStringComparators)[number]
  value: string
}

export const NumberStringComparators = ['gt', 'lt', 'eq', 'gte', 'lte'] as const
export const NumberStringProperties = ['value', 'gas'] as const

export type NumberStringComparator = (typeof NumberStringComparators)[number]
