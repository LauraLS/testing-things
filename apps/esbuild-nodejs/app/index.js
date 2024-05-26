import express from 'express'
import UserSearcher from '../src/user/application/UserSearcher.js'
import {ContainerBuilder, YamlFileLoader} from "node-dependency-injection";

const app = express()

app.use(async (req, res, next) => {
  const container = new ContainerBuilder()
  const loader = new YamlFileLoader(container)
  await loader.load('./services.yaml')

  req.container = container
  next()
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/users/:id', (req, res) => {
  const id = req.params.id
  const userSearcher = new UserSearcher()
  const user = userSearcher.find(id)

  return res.json(user)
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
