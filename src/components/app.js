import React, { useEffect } from 'react'
import SocketsEventsHandler from './SocketsEventsHandler'
import socketIOClient from 'socket.io-client'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

const App = props => {
  // http://54.229.181.64:8080
  const socket = socketIOClient('http://localhost:8080', {
    forceNew: false
    // path: '/myownpath'
    // transports: ['websocket'],
    // upgrade: false
  })

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected')
    })
  }, [])

  return (
    <Router>
      <Switch>
        <Route
          render={(routeProps) => (
            <SocketsEventsHandler {...routeProps} socket={socket} />
          )}
        />
      </Switch>
    </Router>
  )
}

export default App
