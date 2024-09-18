import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { transactions } from '../../../../db/schema'

export const GetTransactionsFilterParams = z.object({
  id: z.string()
})

export const GetTransactionsFilterQuery = z.object({
  limit: z.coerce.number().optional()
})

export const GetTransactionsFilterResponse = z.array(createSelectSchema(transactions))
