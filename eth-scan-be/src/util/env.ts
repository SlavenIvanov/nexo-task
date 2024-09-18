import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import { z } from 'zod'

const EnvSchema = z.object({
  // web3
  ETH_PROVIDER: z.string().url(),
  // db
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_PORT: z.coerce.number(),
  DATABASE_URL: z.string().url(),
  // Fastify API
  PORT: z.coerce.number()
})

expand(config())

const parsedEnv = EnvSchema.safeParse(process.env)

if (!parsedEnv.success) {
  let errorMessage = '❌ Missing required values in .env:\n'

  parsedEnv.error.issues.forEach((issue) => {
    errorMessage += issue.path[0] + '\n'
  })

  const error = new Error(errorMessage)
  error.stack = ''

  throw error
}

// todo delete
console.log('✅ Using env:', parsedEnv.data)

export const env = parsedEnv.data
