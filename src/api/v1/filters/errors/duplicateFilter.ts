export class DuplicateFilterError extends Error {
  constructor() {
    super('😷 Filter already exists')
  }
}
