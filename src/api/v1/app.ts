import Fastify from 'fastify'
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'
import { API_PREFIX, API_VERSION, ROUTES } from '../../util/constants'
import { handleHttpError } from './error.handlers'
import { filtersRoutes } from './filters/filters.routes'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import fastifyWebsocket from '@fastify/websocket'
import { wsRoutes } from './ws/ws.handler'

export async function buildApp() {
  const app = Fastify().withTypeProvider<ZodTypeProvider>()

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  app.register(fastifySwagger, { transform: jsonSchemaTransform })

  app.register(fastifySwaggerUI, {
    routePrefix: '/documentation'
  })

  app.setErrorHandler(handleHttpError)

  app.register(filtersRoutes, { prefix: API_PREFIX + API_VERSION })

  app.register(fastifyWebsocket)
  app.register(wsRoutes, { prefix: API_PREFIX + API_VERSION })

  return app
}
