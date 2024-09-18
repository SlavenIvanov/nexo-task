import EventEmitter from 'node:events'
import { NewTransactionEvent } from '../../db/schema/transaction'

export class TxEmitter {
  #NEW_TX_EVENT = 'NEW_TX'

  #emitter = new EventEmitter()

  emitNewTx(tx: NewTransactionEvent) {
    this.#emitter.emit(this.#NEW_TX_EVENT, tx)
  }

  onNewTx(cb: (tx: NewTransactionEvent) => void) {
    this.#emitter.on(this.#NEW_TX_EVENT, cb)
  }

  unregister(cb: (tx: NewTransactionEvent) => void) {
    this.#emitter.removeListener(this.#NEW_TX_EVENT, cb)
  }
}

export const txEmitter = new TxEmitter()
