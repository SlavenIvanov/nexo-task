import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { filterEmitter } from '../../../eth/events/filterEmitter'
import { ROUTES } from '../../../util/constants'
import { handleCreateFilter, handleDeleteFilter, handleGetFilters, handleUpdateFilter } from './filters.handlers'
import { CreateFilterRequest } from './schema/createFilter'
import { GetFiltersResponse } from './schema/getFilters'
import { UpdateFilterRequest } from './schema/updateFilter'

export const filtersRoutes = async (app: FastifyInstance) => {
  // Create Filter
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: ROUTES.FILTERS,
    schema: {
      body: CreateFilterRequest,
      response: {
        201: z.object({
          message: z.string()
        })
      }
    },
    handler: async (request, reply) => {
      const configuration = request.body

      await handleCreateFilter(configuration)

      filterEmitter.emitFilterChange()

      return reply.code(201).send({ message: 'Filter created' })
    }
  })
  // Get Filters
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
  // Update Filter
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: ROUTES.FILTERS + '/:id',
    schema: {
      params: z.object({
        id: z.string()
      }),
      body: UpdateFilterRequest,
      response: {
        200: z.object({
          message: z.string()
        })
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
  // Delete Filter
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'DELETE',
    url: ROUTES.FILTERS + '/:id',
    schema: {
      params: z.object({
        id: z.string()
      }),
      response: {
        200: z.object({
          message: z.string()
        })
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
}
