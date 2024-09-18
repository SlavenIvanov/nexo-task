import EventEmitter from 'node:events'

export class FilterEmitter {
  #FILTER_CHANGE = 'FILTER_CHANGE'

  #emitter = new EventEmitter()

  emitFilterChange(excludeFilterId?: string) {
    this.#emitter.emit(this.#FILTER_CHANGE, excludeFilterId)
  }

  onFilterChange(cb: (excludeFilterId?: string) => void) {
    this.#emitter.on(this.#FILTER_CHANGE, cb)
  }

  unregister(cb: (excludeFilterId?: string) => void) {
    this.#emitter.removeListener(this.#FILTER_CHANGE, cb)
  }
}

export const filterEmitter = new FilterEmitter()
