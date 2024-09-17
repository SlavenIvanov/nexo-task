import { config } from 'dotenv'
import { expand } from 'dotenv-expand'

import { z } from 'zod'

const envSchema = z.object({
  ETH_PROVIDER: z.string().url(),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_PORT: z.coerce.number(),
  DATABASE_URL: z.string().url()
})

expand(config())

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  let errorMessage = '❌ Missing required values in .env:\n'

  parsedEnv.error.issues.forEach((issue) => {
    errorMessage += issue.path[0] + '\n'
  })

  const error = new Error(errorMessage)
  error.stack = ''

  throw error
}

export const env = parsedEnv.data
