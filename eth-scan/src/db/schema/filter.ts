import { boolean, jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { nanoid } from 'nanoid'

export const filters = pgTable('filters', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  enabled: boolean('enabled').notNull().default(true),
  configuration: jsonb('configuration').unique().notNull().$type<FilterConfiguration>(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow()
})

//todo possibly rename?
export type FilterSelect = typeof filters.$inferSelect

export type FilterConfiguration = NumberStringFilters

// todo extract and  more filter types
type NumberStringFilters = {
  property: (typeof NumberStringProperties)[number]
  comparator: (typeof NumberStringComparators)[number]
  value: string
}

//todo cleanup???
export const NumberStringComparators = ['gt', 'lt', 'eq', 'gte', 'lte'] as const
export const NumberStringProperties = ['value', 'gas'] as const

export type NumberStringComparator = (typeof NumberStringComparators)[number]
