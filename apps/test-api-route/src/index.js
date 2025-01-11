import { apiRouter } from 'api-route'

const app = apiRouter()

app.add('GET', '/', ({ request }) => {
  const { url } = request
  return new Response(`Hello World from ${url}`)
})

app.add('GET', '/:id', ({ request, params }) => {
  const { url } = request
  const { id } = params
  return new Response(`Hello World from: ${url}, with param id: ${id}`)
})

app.run(4221, () => {
  console.log(`🫶 Server is running on http://localhost:4221`)
})
