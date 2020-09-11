import React, { useState, useEffect } from 'react'
import Dashboard from './Dashboard'
import socketIOClient from 'socket.io-client'

const App = props => {
  const socket = socketIOClient('http://localhost:8080')

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected')
    })
  }, [])

  return (
    <Dashboard socket={socket} />
  )
}

export default App
