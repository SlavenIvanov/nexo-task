import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { filterEmitter } from '../../../eth/events/filterEmitter'
import { ROUTES } from '../../../util/constants'
import {
  handleCreateFilter,
  handleDeleteFilter,
  handleGetFilters,
  handleGetTransactionsByFilter,
  handleUpdateFilter
} from './filters.handlers'
import { CreateFilterRequest, CreateFilterResponse } from './schema/createFilter'
import { GetFiltersResponse } from './schema/getFilters'
import { UpdateFilterParams, UpdateFilterRequest, UpdateFilterResponse } from './schema/updateFilter'
import {
  GetTransactionsFilterParams,
  GetTransactionsFilterQuery,
  GetTransactionsFilterResponse
} from './schema/getTransactionsFilter'
import { DeleteFilterParams, DeleteFilterResponse } from './schema/deleteFilter'

export const filtersRoutes = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: ROUTES.FILTERS,
    schema: {
      body: CreateFilterRequest,
      response: {
        201: CreateFilterResponse
      }
    },
    handler: async (request, reply) => {
      const configuration = request.body

      await handleCreateFilter(configuration)

      filterEmitter.emitFilterChange()

      return reply.code(201).send({ message: 'Filter created' })
    }
  })

  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: ROUTES.FILTERS,
    schema: {
      response: {
        200: GetFiltersResponse
      }
    },
    handler: handleGetFilters
  })

  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: ROUTES.FILTERS + '/:id',
    schema: {
      params: UpdateFilterParams,
      body: UpdateFilterRequest,
      response: {
        200: UpdateFilterResponse
      }
    },
    handler: async (request, reply) => {
      const { id } = request.params
      const { enabled } = request.body

      await handleUpdateFilter(id, enabled)
      filterEmitter.emitFilterChange()

      return reply.code(200).send({ message: 'Filter updated' })
    }
  })

  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'DELETE',
    url: ROUTES.FILTERS + '/:id',
    schema: {
      params: DeleteFilterParams,
      response: {
        200: DeleteFilterResponse
      }
    },
    handler: async (request, reply) => {
      const { id } = request.params

      console.log('Deleting filter', id)

      filterEmitter.emitFilterChange(id)
      await handleDeleteFilter(id)

      return reply.code(200).send({ message: 'Filter deleted' })
    }
  })

  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: ROUTES.FILTERS + '/:id/transactions',
    schema: {
      params: GetTransactionsFilterParams,
      query: GetTransactionsFilterQuery,
      response: {
        200: GetTransactionsFilterResponse
      }
    },
    handler: (request, reply) => {
      const { id } = request.params
      const { limit } = request.query

      return handleGetTransactionsByFilter(id, limit)
    }
  })
}
