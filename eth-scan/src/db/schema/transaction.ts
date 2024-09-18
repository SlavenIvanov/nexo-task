import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { nanoid } from 'nanoid'
import { filters } from './filter'

export const transactions = pgTable('transactions', {
  id: text('id')
    .primaryKey()
    .$default(() => nanoid()),
  hash: text('hash').notNull(),
  from: text('from').notNull(),
  to: text('to'),
  value: text('value').notNull(),
  gas: text('gas').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  filterId: text('filter_id')
    .references(() => filters.id, { onDelete: 'cascade', onUpdate: 'cascade' })
    .notNull()
})

//todo possibly rename?
export type TransactionInsert = typeof transactions.$inferInsert

export type NewTransactionEvent = Pick<TransactionInsert, 'hash' | 'from' | 'to' | 'value' | 'gas'> & {
  matchingFilters: string[]
}
