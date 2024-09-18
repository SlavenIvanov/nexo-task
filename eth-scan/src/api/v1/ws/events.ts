import EventEmitter from 'node:events'

//todo rename
export class TxEmitter {
  #NEW_TX_EVENT = 'NEW_TX'

  #emitter = new EventEmitter()

  emitNewTx(tx: any) {
    this.#emitter.emit(this.#NEW_TX_EVENT, tx)
  }

  onNewTx(cb: (tx: any) => void) {
    this.#emitter.on(this.#NEW_TX_EVENT, cb)
  }

  unregister(cb: (tx: any) => void) {
    this.#emitter.removeListener(this.#NEW_TX_EVENT, cb)
  }
}

export const txEmitter = new TxEmitter()
