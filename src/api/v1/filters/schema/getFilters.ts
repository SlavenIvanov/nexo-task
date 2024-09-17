import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { filters } from '../../../../db/schema'

export const GetFiltersResponse = z.array(createSelectSchema(filters))
