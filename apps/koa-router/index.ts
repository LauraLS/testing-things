import Koa from 'koa'
import { AddressInfo } from 'node:net'
import indexRouter from './router/index'

const app = new Koa()

app.use(indexRouter.routes())
app.use(indexRouter.allowedMethods())

const server = app.listen(4567, () => {
  const { port, address } = server.address() as AddressInfo
  console.log(`Server listening on ${address}:${port}`)
})
