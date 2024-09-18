export class FilterNotFoundError extends Error {
  constructor() {
    super('🤷 No such filter found')
  }
}
