import { desc, eq } from 'drizzle-orm'
import { db } from './dbClient'
import { filters } from './schema'
import { FilterConfiguration } from './schema/filter'
import { TransactionInsert, transactions } from './schema/transaction'

export async function saveFilter(configuration: FilterConfiguration) {
  return db.insert(filters).values({ configuration })
}

export async function updateFilter(id: string, enabled: boolean) {
  return db.update(filters).set({ enabled }).where(eq(filters.id, id))
}

export async function getFilter(id: string) {
  return db.query.filters.findFirst({
    where: eq(filters.id, id)
  })
}

export async function deleteFilter(id: string) {
  return db.delete(filters).where(eq(filters.id, id))
}

export async function getFilters() {
  return db.query.filters.findMany({ orderBy: desc(filters.createdAt) })
}

export async function getEnabledFilters() {
  return db.query.filters.findMany({
    where: eq(filters.enabled, true)
  })
}

export async function getTransactionsByFilter(filterId: string, limit: number = 100) {
  return db.query.transactions.findMany({
    where: eq(transactions.filterId, filterId),
    limit,
    orderBy: desc(transactions.createdAt)
  })
}

export async function saveTransaction(transaction: TransactionInsert) {
  return db
    .insert(transactions)
    .values(transaction)
    .catch((e) => {
      console.error('❌ Error saving transaction', transaction, e)
    })
}
