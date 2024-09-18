import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '../util/env'
import * as schema from './schema'

export const connection = postgres(env.DATABASE_URL)

export const db = drizzle(connection, {
  schema,
  //todo env?
  // Todo cleanup migrations
  logger: true
})
