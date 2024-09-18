import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { transactions } from '../../../../db/schema'

export const GetTransactionsFilterResponse = z.array(createSelectSchema(transactions))
