import React, { useState, useEffect } from 'react'
import QueryString from 'query-string'
import PropTypes from 'prop-types'
import Dashboard from './Dashboard'

const SocketsEventsHandler = props => {
  // const [urlParams, setUrlParams] = useState(QueryString.parse(props.location.search))
  const [join, setJoin] = useState()
  const [stateByBoard, setStateByBoard] = useState()
  const [adminData, setAdminData] = useState()
  const [actionsData, setActionsData] = useState()
  const [groupsData, setGroupsData] = useState()
  const [resetBoard, setResetBoard] = useState()
  const [templateData, setTemplateData] = useState()
  const [votesData, setVotesData] = useState()
  const [columnsData, setColumnsData] = useState()
  const [deleteCard, setDeleteCard] = useState()
  const [deleteColumn, setDeleteColumn] = useState()
  const [onlineUsers, setOnlineUsers] = useState(0)

  const urlParams = QueryString.parse(props.location.search)

  // console.log(props.location)
  // console.log(props.history)
  // props.history.push({
  //   // pathname: `${process.env.PUBLIC_URL}/index.html`,
  //   search: '?test=test'
  // })
  // useEffect(() => {
  //   const params = QueryString.parse(props.location.search)
  //   if (params !== urlParams) setUrlParams(params)
  // }, [urlParams])

  useEffect(() => {
    props.socket.on('join', data => {
      console.log('join', data)
      setJoin(data)
    })

    props.socket.on('setStateByBoard', data => {
      console.log('setStateByBoard', data)
      setStateByBoard(data)
    })

    props.socket.on('setAdmin', admin => {
      console.log('On Admin Data:', admin)
      setAdminData(admin)
    })

    props.socket.on('setActions', actions => {
      console.log('On Actions Data:', actions)
      setActionsData(actions)
    })

    props.socket.on('setGroups', groups => {
      console.log('On Groups Data:', groups)
      setGroupsData(groups)
    })

    props.socket.on('resetBoard', reset => {
      console.log('On resetBoard Data:', reset)
      setResetBoard(reset)
    })

    props.socket.on('setTemplate', template => {
      console.log('On setTemplate Data:', template)
      setTemplateData(template)
    })

    props.socket.on('setVotes', votes => {
      console.log('On setVotes Data:', votes)
      setVotesData(votes)
    })

    props.socket.on('setColumns', columns => {
      console.log('On setColumns Data:', columns)
      setColumnsData(columns)
    })

    props.socket.on('deleteCard', data => {
      console.log('On deleteCard Data:', data)
      setDeleteCard(data)
    })

    props.socket.on('deleteColumn', data => {
      console.log('On deleteColumn Data:', data)
      setDeleteColumn(data)
    })

    props.socket.on('updateUsers', data => {
      console.log('OnlineUsers:', data)
      setOnlineUsers(data.totalUsers)
    })
  }, [])

  return (
    <Dashboard
      board={urlParams.board || null}
      socket={props.socket}
      join={join}
      stateByBoard={stateByBoard}
      setStateByBoard={setStateByBoard}
      adminData={adminData}
      setJoin={setJoin}
      actionsData={actionsData}
      groupsData={groupsData}
      resetBoard={resetBoard}
      setResetBoard={setResetBoard}
      templateData={templateData}
      votesData={votesData}
      columnsData={columnsData}
      deleteCard={deleteCard}
      deleteColumn={deleteColumn}
      onlineUsers={onlineUsers}
      routerHistroy={props.history}
    />
  )
}

Dashboard.propTypes = {
  socket: PropTypes.any
}

export default SocketsEventsHandler
