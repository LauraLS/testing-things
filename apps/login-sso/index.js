import express from 'express'
import { IdentityProvider, ServiceProvider } from 'saml2-js'
import path from 'path'
import { fileURLToPath } from 'url'
import axios from 'axios'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const {
  SAML_URL,
  PUBLIC_KEY,
  ASSERT_ENDPOINT,
  TENANT_ID,
  CLIENT_ID,
  CLIENT_SECRET,
} = process.env

const LOGIN_URL = 'https://login.microsoftonline.com/common/saml2'
const LOGOUT_URL = 'https://login.microsoftonline.com/common/saml2'

const app = express()
const port = 4001

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/init-login', async (req, res) => {
  const idpOptions = {
    sso_login_url: LOGIN_URL,
    sso_logout_url: LOGOUT_URL,
    certificates: [Buffer.from(PUBLIC_KEY, 'base64').toString()],
    allow_unencrypted_assertion: true,
  }
  const idp = new IdentityProvider(idpOptions)

  const spOptions = {
    entity_id: `${SAML_URL}`,
    private_key: '',
    certificate: Buffer.from(PUBLIC_KEY, 'base64').toString(),
    assert_endpoint: ASSERT_ENDPOINT,
    allow_unencrypted_assertion: true,
  }
  const sp = new ServiceProvider(spOptions)

  sp.create_login_request_url(
    idp,
    { relay_state: app },
    function (err, loginUrl) {
      if (err) return res.json({ error: err }).status(500)
      return res.redirect(loginUrl)
    }
  )
})

app.post('/callback', async (req, res) => {
  const idpOptions = {
    sso_login_url: LOGIN_URL,
    sso_logout_url: LOGOUT_URL,
    certificates: [Buffer.from(PUBLIC_KEY, 'base64').toString()],
    allow_unencrypted_assertion: true,
  }
  const idp = new IdentityProvider(idpOptions)

  const spOptions = {
    entity_id: `${SAML_URL}`,
    private_key: '',
    certificate: Buffer.from(PUBLIC_KEY, 'base64').toString(),
    assert_endpoint: ASSERT_ENDPOINT,
    allow_unencrypted_assertion: true,
  }

  const sp = new ServiceProvider(spOptions)
  const options = {
    request_body: { ...req.body },
    require_session_index: false,
  }

  sp.post_assert(idp, options, async function (err, samlResponse) {
    if (err !== null) return res.send(err).status(500)
    const token = await getGraphToken(req.body)
    res.json({ samlResponse, token })
  })
})

async function getGraphToken(samlResponse) {
  try {
    const samlToken = samlResponse.SAMLResponse

    console.log('TENANT_ID', TENANT_ID)
    const tokenResponse = await axios.post(
      `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`,
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        scope: 'https://graph.microsoft.com/.default',
        grant_type: 'urn:ietf:params:oauth:grant-type:saml2-bearer',
        assertion: samlToken,
        // requested_token_use: 'on_behalf_of',
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )

    console.log('TOKEN RESPONSE:', tokenResponse)

    return tokenResponse.data.access_token
  } catch (error) {
    console.error('Error obteniendo token para Microsoft Graph:', error)
    throw error
  }
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
