import Web3 from 'web3'
import { RegisteredSubscription } from 'web3/lib/commonjs/eth.exports'
import { Transaction } from '../types/transaction'

export class EthClient {
  #web3: Web3<RegisteredSubscription>

  constructor(providerUrl: string) {
    this.#web3 = new Web3(providerUrl)
    console.log('💡 EthClient initialized')
  }

  //   TODO find a way to extract Awaited<ReturnType<typeof this.web3.eth.getTransaction>> outside of the class to get full type
  onNewTransaction(callback: (data: Transaction) => any) {
    this.#web3.eth.subscribe('newPendingTransactions').then((subscription) => {
      subscription.on('error', (err) => {
        console.error('❌ Error in subscription', err)
      })

      subscription.on('data', async (txId: string) => {
        // console.log(`🔍 Fetching transaction with id: '${txId}'`)

        const transaction = await this.#web3.eth.getTransaction(txId).catch((e) => {
          console.error(`❌ There was an error fetching the transaction with id : '${txId}'`, e)
        })

        if (!transaction) return

        return callback(transaction)
      })
    })
  }
}
