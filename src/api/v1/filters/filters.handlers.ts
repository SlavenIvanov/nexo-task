import { deleteFilter, getFilter, getFilters, saveFilter, updateFilter } from '../../../db/db'
import { DuplicateFilterError } from './errors/duplicateFilter'
import { FilterNotFoundError } from './errors/filterNotFound'
import { CreateFilter } from './schema/createFilter'

export async function handleGetFilters() {
  return getFilters()
}

export async function handleCreateFilter(configuration: CreateFilter) {
  try {
    await saveFilter(configuration)
  } catch (e: any) {
    // e.code 23505 is a postgres error code for duplicate key
    if (e.code === '23505') throw new DuplicateFilterError()
    else throw e
  }
}

export async function handleUpdateFilter(id: string, enabled: boolean) {
  const filter = await getFilter(id)

  if (!filter) {
    throw new FilterNotFoundError()
  }

  return updateFilter(id, enabled)
}

export async function handleDeleteFilter(id: string) {
  const filter = await getFilter(id)

  if (!filter) {
    throw new FilterNotFoundError()
  }

  return deleteFilter(id)
}
