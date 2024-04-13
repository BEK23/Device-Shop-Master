const path = require('node:path')
const jsonServer = require('json-server')
// const chokidar = require('chokidar')

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))

// Watch for changes in db.json file
// const watcher = chokidar.watch(path.join(__dirname, 'db.json'))

// watcher.on('change', () => {
//   console.log('db.json has changed. Reloading routes...')
//   router.db.read()
//   router.db.setState(router.db.getState())
// })

// Rest of the code...
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use((req, res, next) => {
  console.log('GET request received at:', new Date().toLocaleTimeString())

  // Continue to JSON Server router
  next()
})

server.get('/devices', (req, res) => {
  const devices = router.db.get('devices').value()

  const page = Number.parseInt(req.query.page) || 1
  const limit = Number.parseInt(req.query.limit) || 10
  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const paginatedDevices = devices.slice(startIndex, endIndex)

  const response = {
    data: paginatedDevices,
    meta: {
      length: paginatedDevices.length,
      total: devices.length,
      totalPages: Math.ceil(devices.length / limit),
      currentPage: page,
    },
  }

  res.json(response)
})

server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})
