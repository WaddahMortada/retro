const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const socketIo = require('socket.io')
// const io = require('socket.io')(server, {
//   handlePreflightRequest: (req, res) => {
//     console.log(req.headers)
//     const headers = {
//       "Access-Control-Allow-Headers": "Content-Type, Authorization",
//       "Access-Control-Allow-Origin": 'http://0.0.0.0:3000', //req.headers.origin, //or the specific origin you want to give access to,
//       "Access-Control-Allow-Credentials": true
//     };
//     res.writeHead(200, headers);
//     res.end();
//   }
// })
const port = process.env.PORT || 8080
const index = require('./routes/index')


app.use(index)
// console.log(socketIo)
const io = socketIo(server)

const ids = []
const uniqueUsers = []
let admin

const boards = {}

io.sockets.on('connection', (socket) => {
  console.info(`New client connected [id=${socket.id}]`)
  ids.push(socket.id)
  console.info(`Total connected clients: ${ids.length}`)

  // let ip = (socket.handshake.address.address) ? socket.handshake.address.address : socket.handshake.address
  // console.log(`New Client IP Address: ${ip}`)

  // if (!uniqueUsers.includes(ip)) uniqueUsers.push(ip)
  // console.info(`Total unique connected clients: ${uniqueUsers.length}`)

  // if (ids.length === 1) admin = socket.id

  socket.on('createBoard', newBoard => {
    socket.join(newBoard)
    console.log('createBoard', newBoard)
    console.log('socket.id', socket.id)
    boards[newBoard] = {
      state: {
        template: null,
        votes: null,
        columns: null,
        actions: null
      },
      onlineClients: [
        socket.id
      ]
    }
    // add to online users
    io.in(newBoard).emit('updateUsers', { totalUsers: boards[newBoard].onlineClients.length })
    // console.log(boards)
  })

  socket.on('getStateByBoard', board => {
    console.log('getStateByBoard', board)
    socket.join(board)
    // console.log(boards[board])
    if (boards[board]) {
      // const clients = io.sockets.adapter.rooms[board].sockets;

      // //to get the number of clients
      // const numClients = (typeof clients !== 'undefined') ? Object.keys(clients).length : 0;
      // console.log('numClients: ', numClients)
      // console.log('clients', clients)

      io.in(board).clients((error, clients) => {
        if (error) throw error
        // Returns an array of client IDs like ["Anw2LatarvGVVXEIAAAD"]
        const numberOfClients = Object.keys(clients).length
        console.log('numberOfClients: ', numberOfClients)
        console.log(clients)
      })
      // add to online users
      boards[board].onlineClients.push(socket.id)
      io.in(board).emit('updateUsers', { totalUsers: boards[board].onlineClients.length })

      io.in(board).emit('setStateByBoard', boards[board].state)
    }
  })

  socket.emit('join', { id: socket.id, boards: Object.keys(boards) })
  // TODO Fix Admin connect and disconnect issues (Admin selector)
  // socket.emit('join', { id: socket.id, state: state, admin: ids.length === 1 })

  socket.on('disconnecting', reason => {
    console.log('disconnecting')
    Object.keys(socket.rooms).forEach(board => {
      if (boards[board]) {
        console.log('board', board)
        console.log('socket.id', socket.id)

        const index = boards[board].onlineClients.indexOf(socket.id)
        if (index > -1) boards[board].onlineClients.splice(index, 1)
        io.in(board).emit('updateUsers', { totalUsers: boards[board].onlineClients.length })
      }
    })
  })

  socket.on('disconnect', () => {
    console.log(`Client disconnected  [id=${socket.id}]`)
    const index = ids.indexOf(socket.id)
    if (index > -1) ids.splice(index, 1)
    // if (admin === socket.id) admin = ids[0]
    // io.to(admin).emit('setAdmin', true)
    socket.removeAllListeners()

    // let ip = (socket.handshake.address.address) ? socket.handshake.address.address : socket.handshake.address
    // const key = uniqueUsers.indexOf(ip)
    // if (key > -1) uniqueUsers.splice(key, 1)
    console.info(`Total connected clients: ${ids.length}`)
  })

  socket.on('resetBoard', data => {
    console.log('resetBoard', data)
    if (boards[data.board]) {
      socket.broadcast.to(data.board).emit('resetBoard', data.reset)
      console.log('state: ', boards[data.board].state)
    }
  })

  socket.on('setTemplate', data => {
    console.log('template: ', data)
    if (boards[data.board]) {
      socket.broadcast.to(data.board).emit('setTemplate', data.template)
      boards[data.board].state.template = data.template
      console.log('state: ', boards[data.board].state)
    }
  })

  socket.on('setVotes', data => {
    console.log('votes: ', data)
    if (boards[data.board]) {
      socket.broadcast.to(data.board).emit('setVotes', data.votes)
      boards[data.board].state.votes = data.votes
      console.log('state: ', boards[data.board].state)
    }
  })

  socket.on('setColumns', data => {
    console.log('columns: ', data)
    if (boards[data.board]) {
      socket.broadcast.to(data.board).emit('setColumns', data.columns)
      boards[data.board].state.columns = data.columns
      console.log('state: ', boards[data.board].state)
    }
  })

  socket.on('updateSocketColumnState', data => {
    console.log('columns: ', data)
    if (boards[data.board]) {
      boards[data.board].state.columns = data.columns
      console.log('state: ', boards[data.board].state)
    }
  })

  socket.on('setActions', data => {
    console.log('actions', data)
    if (boards[data.board]) {
      socket.broadcast.to(data.board).emit('setActions', data.actions)
      boards[data.board].state.actions = data.actions
      console.log('state: ', boards[data.board].state)
    }
  })

  socket.on('deleteCard', data => {
    console.log('deleteCard: ', data)
    if (boards[data.board]) {
      socket.broadcast.to(data.board).emit('deleteCard', data)
    }
  })

  socket.on('deleteColumn', data => {
    console.log('deleteColumn: ', data)
    if (boards[data.board]) {
      socket.broadcast.to(data.board).emit('deleteColumn', data)
    }
  })

  socket.on('updateColumns', data => {
    console.log('updateColumns: ', data)
    if (boards[data.board]) {
      boards[data.board].state.columns = data.columns
      console.log('state: ', boards[data.board].state)
    }
  })
})

server.listen(port, '0.0.0.0', () => console.log(`Listening on port ${port}`))
