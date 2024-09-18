import Web3, { FMT_BYTES, FMT_NUMBER } from 'web3'
import { RegisteredSubscription } from 'web3/lib/commonjs/eth.exports'
import { TransactionInsert } from '../db/schema/transaction'

const RETURN_FORMAT = { number: FMT_NUMBER.STR, bytes: FMT_BYTES.HEX }

export class EthClient {
  #web3: Web3<RegisteredSubscription>

  constructor(providerUrl: string) {
    this.#web3 = new Web3(providerUrl)
    console.log('💡 EthClient initialized')
  }

  onNewTransaction(callback: (data: TransactionInsert) => any) {
    this.#web3.eth.subscribe('newPendingTransactions', undefined, RETURN_FORMAT).then((subscription) => {
      subscription.on('error', (err) => {
        console.error('❌ Error in subscription', err)
      })

      subscription.on('data', async (txId: string) => {
        const transaction = await this.#web3.eth.getTransaction(txId, RETURN_FORMAT).catch((e) => {
          console.error(`❌ There was an error fetching the transaction with id : '${txId}'`, e)
        })

        if (!transaction) return

        return callback(transaction)
      })
    })
  }
}
