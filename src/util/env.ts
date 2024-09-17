import { z } from 'zod'

const envSchema = z.object({
  ETH_PROVIDER: z.string().url()
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error(parsedEnv.error)
  throw new Error('❌ Invalid environment variables')
}

export const env = parsedEnv.data
