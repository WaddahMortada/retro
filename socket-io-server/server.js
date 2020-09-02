const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const port = process.env.PORT || 8080
const index = require('./routes/index')

const app = express()
app.use(index)

const server = http.createServer(app)
const io = socketIo(server)

let templateState
let votesState
let columnsState

io.on('connection', (socket) => {
  console.log('New client connected')
  // if (templateState) socket.emit('templateState', templateState)
  // if (votesState) socket.emit('votesState', votesState)
  // if (columnsState) socket.emit('columnsState', columnsState)

  socket.on('disconnect', () => {
    console.log('Client disconnected')
    socket.removeAllListeners()
    templateState = votesState = columnsState = null
  })

  socket.on('setTemplate', template => {
    console.log(template)
    socket.broadcast.emit('setTemplate', template)
    templateState = template
  })

  socket.on('setVotes', votes => {
    console.log(votes)
    socket.broadcast.emit('setVotes', votes)
    votesState = votes
  })

  socket.on('setColumns', columns => {
    console.log(columns)
    socket.broadcast.emit('setColumns', columns)
    columnsState = columns
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))
