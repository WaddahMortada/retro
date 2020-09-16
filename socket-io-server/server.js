const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const port = process.env.PORT || 8080
const index = require('./routes/index')

const app = express()
app.use(index)

const server = http.createServer(app)
const io = socketIo(server)

const state = {
  template: null,
  votes: null,
  columns: null
}

const ids = []

io.on('connection', (socket) => {
  // const address = socket.handshake.address
  // const clientIp = socket.request.connection.remoteAddress
  console.info(`New client connected [id=${socket.id}]`)
  ids.push(socket.id)

  // io.emit('join', socket.id)
  console.log('emit state: ', state)
  socket.emit('join', { id: socket.id, state: state })

  socket.on('disconnect', () => {
    console.log(`Client disconnected  [id=${socket.id}]`)
    socket.removeAllListeners()
    const index = ids.indexOf(socket.id)
    if (index > -1) ids.splice(index, 1)
  })

  // Set App State
  socket.on('setTemplate', template => {
    console.log('template: ', template)
    socket.broadcast.emit('setTemplate', template)
    state.template = template
    console.log('state: ', state)
  })

  socket.on('setVotes', votes => {
    console.log('votes: ', votes)
    socket.broadcast.emit('setVotes', votes)
    state.votes = votes
    console.log('state: ', state)
  })

  socket.on('setColumns', columns => {
    console.log('columns: ', columns)
    // socket.broadcast.emit('setColumns', columns)
    state.columns = columns
    console.log('state: ', state)
  })

  // Column Actions
  socket.on('AddColumn', column => {
    socket.broadcast.emit('AddColumn', column)
  })

  socket.on('updateColummnTitle', column => {
    socket.broadcast.emit('updateColummnTitle', column)
  })

  socket.on('deleteColumn', index => {
    socket.broadcast.emit('deleteColumn', index)
  })

  // Card Actions
  socket.on('addCard', data => {
    socket.broadcast.emit('addCard', data)
  })

  socket.on('updateCard', data => {
    socket.broadcast.emit('updateCard', data)
  })

  socket.on('deleteCard', data => {
    socket.broadcast.emit('deleteCard', data)
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))
