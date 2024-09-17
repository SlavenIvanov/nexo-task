import { txEmitter } from '../api/v1/ws/events'
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

    let transaction = {
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: tx.value,
      gas: tx.gas,
      //TODO bad
      filterId: ''
    }

    for (const filter of matchingFilters) {
      transaction.filterId = filter.id
      await saveTransaction(transaction)
    }
    txEmitter.emitNewTx(transaction)
  })

  console.log('✅ Eth App started')
}
