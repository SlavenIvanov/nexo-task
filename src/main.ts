import { getEnabledFilters, saveFilter, saveTransaction } from './db/db'
import { EthClient } from './eth/eth-client'
import { EthFilter } from './eth/eth-filter'
import { env } from './util/env'

console.log('🤖 Starting Project')

console.log({ env })

// await saveFilter({
//   property: 'gas',
//   comparator: 'lte',
//   value: '50000'
// })
// await saveFilter({
//   property: 'value',
//   comparator: 'eq',
//   value: '0'
// })

const enabledFilters = await getEnabledFilters()

const client = new EthClient(env.ETH_PROVIDER)

const filter = new EthFilter(enabledFilters)

client.onNewTransaction(async (tx) => {
  const matchingFilters = filter.getMatchingFilters(tx)
  console.log(`🔍 Matching filters for tx: ${tx.hash}`, matchingFilters.length)

  for (const filter of matchingFilters) {
    await saveTransaction({
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: tx.value,
      gas: tx.gas,
      filterId: filter.id
    })
  }
})

// setTimeout(() => {
//   // console.log('✅ New Filters')
//   // filter.setFilters([])
//   process.exit(0)
// }, 10_000)
