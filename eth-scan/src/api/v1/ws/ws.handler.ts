import { FastifyInstance } from 'fastify'
import { ROUTES } from '../../../util/constants'
import { txEmitter } from './events'

export const wsRoutes = async (app: FastifyInstance) => {
  app.get(ROUTES.WS, { websocket: true }, (socket, req) => {
    const cb = (tx: any) => {
      console.log('✅ ❌ New tx', tx)
      socket.send(JSON.stringify(tx))
    }

    txEmitter.onNewTx(cb)

    socket.on('close', () => {
      console.log('😴 WebSocket connection closed')
      txEmitter.unregister(cb)
    })
  })
}
