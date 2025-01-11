'use strict'

import { apiRouter } from 'api-route'

const app = apiRouter()

app.add('GET', '/', () => {
  const response = new Response(JSON.stringify({ hello: 'world' }))
  response.headers.set('content-type', 'application/json; charset=utf-8')
  return response
})

app.run(3000, () => {
  console.log('Server is running on port 3000')
})
