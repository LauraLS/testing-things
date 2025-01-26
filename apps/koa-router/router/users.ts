import Router from '@koa/router'

const router = new Router()

const userMiddleware = (ctx: any, next: any) => {
  console.log('Middleware start')
  next()
  console.log('Middleware end')
}

router.get('/', (ctx) => {
  return (ctx.body = [{ id: 1, name: 'David' }])
})

router.get('/:id', userMiddleware, (ctx) => {
  const id = ctx.params.id
  return (ctx.body = [{ id: parseInt(id), name: 'David' }])
})

export default router
