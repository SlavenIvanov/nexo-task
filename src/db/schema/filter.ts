import { boolean, jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { nanoid } from 'nanoid'

export const filters = pgTable('filters', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  enabled: boolean('enabled').notNull().default(true),
  configuration: jsonb('configuration').notNull().$type<FilterConfiguration>(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow()
})

export type Filter = typeof filters.$inferSelect

export type FilterConfiguration = ValueFilter | GasFilter

// todo extract and  more filter types
export type ValueFilter = {
  property: 'value'
  comparator: NumberStringComparator
  value: string
}

export type GasFilter = {
  property: 'gas'
  comparator: NumberStringComparator
  value: string
}

export type NumberStringComparator = 'gt' | 'lt' | 'eq' | 'gte' | 'lte'
