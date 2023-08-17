const express = require('express')
const landings = require('./api/configuracion_landings.json')

const app = express()

app.disable('x-powered-by')

app.get('/', (resquest, response) => {
  response.json({ message: 'hola mundo' })
})

app.get('/landings', (resquest, response) => {
  response.json(landings)
})

app.get('/landings/:hash', (resquest, response) => { // path to regex
  const { hash } = resquest.params
  const landing = landings.find(landing => landing.hash === hash)
  if (landing) return response.json(landing)

  response.status(404).json({ message: 'Landing not found'})
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT} http://localhost:${PORT}`)
})
