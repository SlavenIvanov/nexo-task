import { buildApp } from './api/v1/app'
import { startEthApp } from './eth/app'
import { env } from './util/env'

console.log('🤖 Starting Project')

const app = await buildApp()

app.listen({ port: env.PORT }, (err, address) => {
  if (err) throw err
  console.log(`✅ API Server is running on ${address}`)
})

startEthApp().catch((err) => {
  console.error('❌ Error in eth app ', err)
})
