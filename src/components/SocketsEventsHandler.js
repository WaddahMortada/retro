import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Dashboard from './Dashboard'

const SocketsEventsHandler = props => {
  const [join, setJoin] = useState()
  const [adminData, setAdminData] = useState()
  const [actionsData, setActionsData] = useState()
  const [resetBoard, setResetBoard] = useState()
  const [templateData, setTemplateData] = useState()
  const [votesData, setVotesData] = useState()
  const [columnsData, setColumnsData] = useState()
  const [deleteCard, setDeleteCard] = useState()
  const [deleteColumn, setDeleteColumn] = useState()
  const [users, setUsers] = useState()

  useEffect(() => {
    props.socket.on('join', data => {
      console.log('join', data)
      setJoin(data)
    })

    props.socket.on('setAdmin', admin => {
      console.log('On Admin Data:', admin)
      setAdminData(admin)
    })

    props.socket.on('setActions', actions => {
      console.log('On Actions Data:', actions)
      setActionsData(actions)
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

    props.socket.on('deleteCard', data => {
      setDeleteCard(data)
    })

    props.socket.on('deleteColumn', data => {
      setDeleteColumn(data)
    })

    props.socket.on('updateUsers', data => {
      console.log('Users:', data)
    })
  }, [])

  return (
    <Dashboard
      socket={props.socket}
      join={join}
      adminData={adminData}
      setJoin={setJoin}
      actionsData={actionsData}
      resetBoard={resetBoard}
      setResetBoard={setResetBoard}
      templateData={templateData}
      votesData={votesData}
      columnsData={columnsData}
      deleteCard={deleteCard}
      deleteColumn={deleteColumn}
    />
  )
}

Dashboard.propTypes = {
  socket: PropTypes.any
}

export default SocketsEventsHandler
