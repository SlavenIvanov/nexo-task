import EventEmitter from 'node:events'

export class FilterEmitter {
  #FILTER_CHANGE = 'FILTER_CHANGE'

  #emitter = new EventEmitter()

  emitFilterChange() {
    this.#emitter.emit(this.#FILTER_CHANGE)
  }

  onFilterChange(cb: () => void) {
    this.#emitter.on(this.#FILTER_CHANGE, cb)
  }

  unregister(cb: () => void) {
    this.#emitter.removeListener(this.#FILTER_CHANGE, cb)
  }
}

export const filterEmitter = new FilterEmitter()
