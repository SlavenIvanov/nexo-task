import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'
import { FilterNotFoundError } from './filters/errors/filterNotFound'
import { DuplicateFilterError } from './filters/errors/duplicateFilter'

export function handleHttpError(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      issues: error.issues
    })
  } else if (error instanceof FilterNotFoundError) {
    return reply.status(404).send({
      statusCode: 404,
      error: 'Not Found',
      message: error.message
    })
  } else if (error instanceof DuplicateFilterError) {
    return reply.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      message: error.message
    })
  }

  reply.send(error)
}
