import React, { useEffect } from 'react'
import SocketsEventsHandler from './SocketsEventsHandler'
import socketIOClient from 'socket.io-client'

const App = props => {
  const socket = socketIOClient('http://localhost:8080', {
    transports: ['websocket'],
    upgrade: false
  })

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected')
    })
  }, [])

  return (
    <SocketsEventsHandler socket={socket} />
  )
}

export default App
