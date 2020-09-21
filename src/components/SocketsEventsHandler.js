import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Dashboard from './Dashboard'

const SocketsEventsHandler = props => {
  const [join, setJoin] = useState()
  const [resetBoard, setResetBoard] = useState()
  const [templateData, setTemplateData] = useState()
  const [votesData, setVotesData] = useState()
  const [columnsData, setColumnsData] = useState()

  useEffect(() => {
    props.socket.on('join', data => {
      console.log('join', data)
      setJoin(data)
    })

    props.socket.on('resetBoard', resetBoard => {
      setResetBoard(resetBoard)
    })

    props.socket.on('setTemplate', template => {
      setTemplateData(template)
    })

    props.socket.on('setVotes', votes => {
      setVotesData(votes)
    })

    props.socket.on('setColumns', columns => {
      setColumnsData(columns)
    })
  }, [])

  return (
    <Dashboard
      socket={props.socket}
      join={join}
      setJoin={setJoin}
      resetBoard={resetBoard}
      setResetBoard={setResetBoard}
      templateData={templateData}
      votesData={votesData}
      columnsData={columnsData}
    />
  )
}

Dashboard.propTypes = {
  socket: PropTypes.any
}

export default SocketsEventsHandler
