import path from 'path'
import { apiRouter } from 'api-route'
import * as fs from 'node:fs'
import Stripe from 'stripe'

const stripeSecretKey =
  'sk_test_51KsNaFK5jvkJ3LGPod0kj11lXHBb6c38V5M2XMoXA5zyoTpoUCuSTS40wLjt1yHtDRm3HDVctuuTGpvOmfaxQ1bY00WbKYcti7'

const app = apiRouter()

app.add('GET', '/', () => {
  const pathFile = path.join(__dirname, 'views', 'home.html')
  const contentFile = fs.readFileSync(pathFile, 'utf8')

  return new Response(contentFile, { status: 200, headers: { 'Content-Type': 'text/html' } })
})

app.add('GET', '/check', async ({ request }) => {
  const query = new URL(request.url).searchParams
  const sessionId = query.get('session_id')

  const stripe = new Stripe(stripeSecretKey)

  const session = await stripe.checkout.sessions.retrieve(sessionId as string)

  return new Response(JSON.stringify(session))
})

app.add('POST', '/init', async () => {
  const stripe = new Stripe(stripeSecretKey)

  const session = await stripe.checkout.sessions.create({
    success_url: 'http://localhost:3000/check?session_id={CHECKOUT_SESSION_ID}',
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Example Product',
            description: 'Example Product Description',
            images: []
          },
          unit_amount: 1000
        },
        quantity: 1
      }
    ],
    mode: 'payment'
  })

  return new Response(JSON.stringify(session))
})

app.run(3000, () => {
  console.log('Server running on port 3000')
})
