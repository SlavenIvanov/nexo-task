import Fastify from 'fastify'
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'
import { API_PREFIX, API_VERSION } from '../../util/constants'
import { handleHttpError } from './error.handlers'
import { filtersRoutes } from './filters/filters.routes'

export async function buildApp() {
  const app = Fastify().withTypeProvider<ZodTypeProvider>()

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  app.setErrorHandler(handleHttpError)

  app.register(filtersRoutes, { prefix: API_PREFIX + API_VERSION })

  return app
}
