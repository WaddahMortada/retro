import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import TemplateSelector from './TempleteSelector'
import Board from './Board'
import { toTitleCase, didUserVote } from '../lib/helpers'
import { Container, Row, Col } from 'react-bootstrap'
import '../assets/warrimoo.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/style.css'

// const isEmpty = obj => {
//   return Object.keys(obj).length === 0
// }

const Dashboard = props => {
  const defaultVotes = { limit: 5, total: 0, disable: false }
  const defaultColumns = [{ title: '', cards: [{ value: '', totalVotes: 0, id: '', votes: {} }] }] // votes: { [userId]: 0 }

  // const [board, setBoard] = useState(isEmpty(props.urlParams.board) ? '' : props.urlParams.board)
  const [board, setBoard] = useState(props.board)
  const [boards, setBoards] = useState()
  const [id, setId] = useState()
  const [admin, setAdmin] = useState(true)
  const [template, setTemplate] = useState('')
  const [votes, setVotes] = useState(defaultVotes)
  const [columns, setColumns] = useState(defaultColumns)
  const [actions, setActions] = useState()

  console.log(props.board)

  // Handling Socket Join Events
  useEffect(() => {
    console.log('join', props.join)
    if (props.join) {
      const data = props.join

      setId(data.id)
      setBoards(data.boards)
      console.log(board, data.boards)
      if (data.boards.includes(board)) props.socket.emit('getStateByBoard', board)
    }
  }, [props.join])

  useEffect(() => {
    console.log('stateByBoard', props.stateByBoard)
    if (props.stateByBoard) {
      const data = props.stateByBoard
      // setAdmin(data.admin)

      // Getting state from server
      if (data.template && data.template !== template) {
        setTemplate(data.template)
      }

      if (data.votes && data.votes.limit !== votes.limit) {
        data.votes.total = votes.total
        setVotes(data.votes)
      }

      if (data.columns && data.columns !== columns) {
        setColumns(data.columns)
      }

      if (data.actions && data.actions !== actions) {
        setActions(data.actions)
      }

      // Sending current state to server
      if (!data.template && template) {
        props.socket.emit('setTemplate', { board: board, template: template })
        props.socket.emit('setVotes', { board: board, votes: votes })
      }
    }
  }, [props.stateByBoard])

  // Dashboard Functions
  const resetBoard = () => {
    setTemplate('')
    setVotes(defaultVotes)
    setActions()
  }

  const upVote = () => {
    if (votes.total < votes.limit) {
      votes.total += 1
      setVotes({ ...votes })
    }
  }

  const downVote = () => {
    if (votes.total > 0) {
      votes.total -= 1
      setVotes({ ...votes })
    }
  }

  // Handling Votes Changes
  useEffect(() => {
    votes.disable = votes.total >= votes.limit
    setVotes({ ...votes })
  }, [votes.total, votes.limit]) // eslint-disable-line react-hooks/exhaustive-deps

  // Handling Templates Changes
  useEffect(() => {
    const columnsTitle = template !== 'blank_board' ? template.split('_') : []
    const isJoinColumn = props.stateByBoard && props.stateByBoard.columns
    const reset = (props.resetBoard === undefined) ? false : props.resetBoard
    console.log('Dashboard (Template.useEffect)')
    console.log((template && !isJoinColumn) || (template && reset))
    console.log((template && !isJoinColumn))
    console.log((template && reset))
    console.log(template)
    console.log(isJoinColumn)
    console.log(reset)
    if ((template && !isJoinColumn) || (template && reset)) {
      console.log('yup')
      const columnsObjects = []
      columnsTitle.forEach(title => {
        columnsObjects.push({ title: toTitleCase(title), cards: [] })
      })
      setColumns(columnsObjects)
      console.log('template Board Effect', board)
      props.socket.emit('setColumns', { board: board, columns: columnsObjects })
    } else {
      props.setJoin()
      props.setStateByBoard()
    }
  }, [template])

  // Handling Socket Events //
  ////////////////////////////
  useEffect(() => {
    if (props.templateData) {
      setTemplate('')
      setTemplate(props.templateData)
    }
  }, [props.templateData])

  useEffect(() => {
    if (props.votesData && (props.votesData !== votes)) {
      setVotes(props.votesData)
    }
  }, [props.votesData])

  useEffect(() => {
    if (props.columnsData && (props.columnsData !== columns)) {
      setColumns(props.columnsData)
    }
  }, [props.columnsData])

  useEffect(() => {
    console.log('useEffect Actions')
    // if ((props.actionsData && (props.actionsData !== actions)) || props.resetBoard) {
    if (props.actionsData !== actions) {
      console.log(props.actionsData)
      console.log(actions)
      setActions(props.actionsData)
    }
    // console.log(props.resetBoard)
    // if (props.resetBoard) props.setResetBoard(false)
  }, [props.actionsData])

  // useEffect(() => {
  //   if (props.adminData !== admin) {
  //     setAdmin(props.adminData)
  //   }
  // }, [props.adminData])

  useEffect(() => {
    if (props.deleteCard) {
      const data = props.deleteCard
      const column = columns[data.column]
      if (column) {
        const card = column.cards[data.card]
        if (card && card.id === data.id) {
          if (didUserVote(id, card.votes)) {
            votes.total--
            setVotes({ ...votes })
          }
          column.cards.splice(data.card, 1)
          columns[data.column] = column
          setColumns([...columns])
          props.socket.emit('updateColumns', { board: board, columns: columns })
        }
      }
    }
  }, [props.deleteCard])

  useEffect(() => {
    if (props.deleteColumn) {
      const data = props.deleteColumn
      const column = columns[data.id]
      if (column && column.title === data.title) {
        let count = 0
        column.cards.forEach(card => {
          if (didUserVote(id, card.votes)) count++
        })
        votes.total -= count
        setVotes({ ...votes })
        columns.splice(data.id, 1)
        const updatedColumns = [...columns]
        setColumns(updatedColumns)
        props.socket.emit('updateColumns', { board: board, columns: updatedColumns })
      }
    }
  }, [props.deleteColumn])

  const BoardComponent = <Board
    type={template}
    votes={votes}
    voteFunctions={{ upVote: upVote, downVote: downVote }}
    resetBoard={resetBoard}
    socket={props.socket}
    actionsData={props.actionsData}
    actions={actions}
    setActions={setActions}
    columns={columns}
    setColumns={setColumns}
    id={id}
    admin={admin}
    setAdmin={setAdmin}
    deleteColumn={props.deleteColumn}
    onlineUsers={props.onlineUsers}
    board={board}
  />

  const TemplateSelectorComponent = <TemplateSelector
    setTemplate={setTemplate}
    votes={votes}
    setVotes={setVotes}
    socket={props.socket}
    admin={admin}
    setAdmin={setAdmin}
    onlineUsers={props.onlineUsers}
    board={board}
    boards={boards}
    routerHistroy={props.routerHistroy}
  />

  return (
    <Container fluid className="appContainer">
      {!template ? TemplateSelectorComponent : BoardComponent}
    </Container>
  )
}

Dashboard.propTypes = {
  board: PropTypes.any,
  socket: PropTypes.any,
  join: PropTypes.any,
  stateByBoard: PropTypes.any,
  setStateByBoard: PropTypes.any,
  adminData: PropTypes.any,
  setJoin: PropTypes.any,
  actionsData: PropTypes.any,
  resetBoard: PropTypes.any,
  setResetBoard: PropTypes.any,
  templateData: PropTypes.any,
  votesData: PropTypes.any,
  columnsData: PropTypes.any,
  deleteCard: PropTypes.any,
  deleteColumn: PropTypes.any,
  onlineUsers: PropTypes.any,
  routerHistroy: PropTypes.any
}

export default Dashboard
