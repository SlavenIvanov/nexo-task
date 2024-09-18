import { txEmitter } from './events/transactionEmitter'
import { getEnabledFilters, saveTransaction } from '../db/db'
import { env } from '../util/env'
import { EthClient } from './ethClient'
import { ethFilter } from './ethFilter'
import { filterEmitter } from './events/filterEmitter'

export async function startEthApp() {
  console.log('🤖 Starting Eth App')

  const enabledFilters = await getEnabledFilters()

  ethFilter.setFilters(enabledFilters)

  filterEmitter.onFilterChange(async (excludeFilterId) => {
    let enabledFilters = await getEnabledFilters()

    console.log('💡Updating filters', { excludeFilterId })

    if (excludeFilterId) {
      enabledFilters = enabledFilters.filter((f) => f.id !== excludeFilterId)
    }

    console.log('💡Setting filters', { enabledFilters })
    ethFilter.setFilters(enabledFilters)
  })

  const ethClient = new EthClient(env.ETH_PROVIDER)

  ethClient.onNewTransaction(async (tx) => {
    const matchingFilters = ethFilter.getMatchingFilters(tx)

    console.log(`🔍 tx: ${tx.hash} matches with ${matchingFilters.map((f) => f.id)}`)

    let transaction = {
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: tx.value,
      gas: tx.gas
    }

    for (const filter of matchingFilters) {
      const transactionWithFilter = {
        ...transaction,
        filterId: filter.id
      }
      await saveTransaction(transactionWithFilter)
    }

    txEmitter.emitNewTx({ ...transaction, matchingFilters: matchingFilters.map((f) => f.id) })
  })

  console.log('✅ Eth App started')
}
