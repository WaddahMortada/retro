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
  console.info(`New client connected [id=${socket.id}]`)
  ids.push(socket.id)

  // io.emit('join', socket.id)
  console.log('emit state: ', state)
  socket.emit('join', { id: socket.id, state: state })

  socket.on('disconnect', () => {
    console.log(`Client disconnected  [id=${socket.id}]`)
    const index = ids.indexOf(socket.id)
    if (index > -1) ids.splice(index, 1)
    socket.removeAllListeners()
  })

  socket.on('resetBoard', resetBoard => {
    socket.broadcast.emit('resetBoard', resetBoard)
  })

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
    socket.broadcast.emit('setColumns', columns)
    state.columns = columns
    console.log('state: ', state)
  })

  socket.on('deleteCard', data => {
    console.log('deleteCard: ', data)
    socket.broadcast.emit('deleteCard', data)
  })

  socket.on('deleteColumn', column => {
    console.log('deleteColumn: ', column)
    socket.broadcast.emit('deleteColumn', column)
  })

  socket.on('updateColumns', columns => {
    console.log('updateColumns: ', columns)
    // socket.broadcast.emit('setColumns', columns)
    state.columns = columns
    console.log('state: ', state)
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))
