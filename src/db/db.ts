import { eq } from 'drizzle-orm'
import { db } from './db-client'
import { filters } from './schema'
import { FilterConfiguration } from './schema/filter'
import { Transaction, transactions } from './schema/transaction'

export async function saveFilter(configuration: FilterConfiguration) {
  return db.insert(filters).values({ configuration })
}

export async function getEnabledFilters() {
  return db.query.filters.findMany({
    where: eq(filters.enabled, true)
  })
}

export async function saveTransaction(transaction: Transaction) {
  return db.insert(transactions).values(transaction)
}
