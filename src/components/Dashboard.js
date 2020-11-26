import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import TemplateSelector from './TempleteSelector'
import Board from './Board'
import { toTitleCase, didUserVote } from '../lib/helpers'
import { Container, Row, Col } from 'react-bootstrap'
import '../assets/warrimoo.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/style.css'

const Dashboard = props => {
  const defaultVotes = { limit: 5, total: 0, disable: false }
  const defaultColumns = [{ title: '', cards: [{ value: '', totalVotes: 0, id: '', votes: {} }] }] // votes: { [userId]: 0 }

  const [board, setBoard] = useState('1111')
  const [id, setId] = useState()
  const [admin, setAdmin] = useState(true)
  const [template, setTemplate] = useState('')
  const [votes, setVotes] = useState(defaultVotes)
  const [columns, setColumns] = useState(defaultColumns)
  const [actions, setActions] = useState()

  // Handling Socket Join Events
  useEffect(() => {
    if (props.join) {
      const data = props.join

      setId(data.id)
      props.socket.emit('getStateByBoard', board)
    }
  }, [props.join])

  useEffect(() => {
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
    if ((template && !isJoinColumn) || (template && props.resetBoard)) {
      const columnsObjects = []
      columnsTitle.forEach(title => {
        columnsObjects.push({ title: toTitleCase(title), cards: [] })
      })
      setColumns(columnsObjects)
      props.socket.emit('setColumns', { board: board, columns: columnsObjects })
    } else {
      props.setJoin()
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
    if ((props.actionsData && (props.actionsData !== actions)) || props.resetBoard) {
      setActions(props.actionsData)
      if (props.resetBoard) props.setResetBoard(false)
    }
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
  />

  return (
    // <Container fluid className="appContainer">
      !template ? TemplateSelectorComponent : BoardComponent
    // </Container>
  )
}

Dashboard.propTypes = {
  socket: PropTypes.any,
  join: PropTypes.any,
  stateByBoard: PropTypes.any,
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
  onlineUsers: PropTypes.any
}

export default Dashboard
