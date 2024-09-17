import { EthClient } from './eth/eth-client'
import { EthFilter } from './eth/eth-filter'
import { env } from './util/env'

console.log('🤖 Starting Project')

const client = new EthClient(env.ETH_PROVIDER)

const filter = new EthFilter([
  { id: '1', enabled: true, property: 'value', operator: 'eq', value: 0n },
  { id: '1', enabled: true, property: 'value', operator: 'lte', value: 100n },
  { id: '1', enabled: true, property: 'value', operator: 'lte', value: 1000000n },
  { id: '1', enabled: true, property: 'value', operator: 'eq', value: 1n }
])

client.onNewTransaction((tx) => {
  console.log('🔍 New transaction', tx.hash)
  const matchingFilters = filter.getMatchingFilters(tx)
  console.log('🦫 Matching filters', matchingFilters.length)
})

setTimeout(() => {
  console.log('✅ New Filters')
  filter.setFilters([])
}, 10_000)
