import { FilterSelect } from '../../src/db/schema/filter'
import { TransactionInsert } from '../../src/db/schema/transaction'

export const filterValueGte50 = {
  id: 'ayy',
  configuration: { property: 'value', comparator: 'gte', value: '50' },
  enabled: true,
  createdAt: new Date()
} satisfies FilterSelect

export const filterGasEq60000 = {
  id: 'lamao',
  configuration: { property: 'gas', comparator: 'eq', value: '60000' },
  enabled: true,
  createdAt: new Date()
} satisfies FilterSelect

export const txMatch = {
  id: '1',
  value: '100',
  gas: '60000',
  hash: 'kekeroni',
  from: '0x1233',
  to: '0x1244',
  filterId: 'someFilterId'
} satisfies TransactionInsert

export const txNoMatch = {
  id: '1',
  value: '49',
  gas: '60001',
  hash: 'kekeroni',
  from: '0x1233',
  to: '0x1244',
  filterId: 'someFilterId'
} satisfies TransactionInsert
