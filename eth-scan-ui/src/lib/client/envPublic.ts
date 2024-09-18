import { z } from 'zod'
import * as environment from '$env/static/public'

const PublicEnvSchema = z.object({
	// API
	PUBLIC_API_URL: z.string().url(),
	PUBLIC_API_WS_URL: z.string().url()
})

export const envPublic = PublicEnvSchema.parse(environment)
