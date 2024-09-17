import { getEnabledFilters, saveTransaction } from '../db/db'
import { env } from '../util/env'
import { EthClient } from './ethClient'
import { ethFilter } from './ethFilter'

export async function startEthApp() {
  console.log('🤖 Starting Eth App')

  const enabledFilters = await getEnabledFilters()

  ethFilter.setFilters(enabledFilters)

  const ethClient = new EthClient(env.ETH_PROVIDER)

  ethClient.onNewTransaction(async (tx) => {
    const matchingFilters = ethFilter.getMatchingFilters(tx)

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

  console.log('✅ Eth App started')
}
