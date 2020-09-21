import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import TemplateSelector from './TempleteSelector'
import Board from './Board'
import { Container, Row, Col } from 'react-bootstrap'
import Warrimoo from '../assets/warrimoo.gif'
import RetroooGta from '../assets/retroooo-gta-thick.png'
import '../assets/warrimoo.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/style.css'

const Dashboard = props => {
  const defaultVotes = { limit: 5, total: 0, disable: false }
  const defaultColumns = [{ title: '', cards: [{ value: '', totalVotes: 0, id: '', votes: {} }] }] // votes: { [userId]: 0 }

  const [id, setId] = useState()
  const [template, setTemplate] = useState('')
  const [votes, setVotes] = useState(defaultVotes)
  const [columns, setColumns] = useState(defaultColumns)

  // Handling Socket Join Events
  useEffect(() => {
    if (props.join) {
      const data = props.join

      setId(data.id)

      // Getting state from server
      if (data.state.template && data.state.template !== template) {
        setTemplate(data.state.template)
      }

      if (data.state.votes && data.state.votes.limit !== votes.limit) {
        data.state.votes.total = votes.total
        setVotes(data.state.votes)
      }

      if (data.state.columns && data.state.columns !== columns) {
        setColumns(data.state.columns)
      }

      // Sending current state to server
      if (!data.state.template && template) {
        props.socket.emit('setTemplate', template)
        props.socket.emit('setVotes', votes)
      }
    }
  }, [props.join])

  // Dashboard Functions
  const resetBoard = () => {
    setTemplate('')
    setVotes(defaultVotes)
  }

  const upVote = () => {
    if (votes.total < votes.limit) {
      votes.total += 1
      setVotes({ ...votes })
    }
  }

  const downVote = (downVotes = 1) => {
    if (votes.total > 0) {
      votes.total -= downVotes
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
    const isJoinColumn = props.join && props.join.state.columns
    if ((template && !isJoinColumn) || (template && props.resetBoard)) {
      const columnsObjects = []
      columnsTitle.forEach(title => {
        columnsObjects.push({ title: title, cards: [] })
      })
      setColumns(columnsObjects)
      if (props.resetBoard) props.setResetBoard(false)
      props.socket.emit('setColumns', columnsObjects)
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
    if (props.deleteCard) {
      const data = props.deleteCard
      const column = columns[data.column]
      if (column) {
        const card = column.cards[data.card]
        if (card && card.id === data.id) {
          if (card.votes[id]) {
            votes.total -= card.votes[id]
            setVotes({ ...votes })
          }
          column.cards.splice(data.card, 1)
          columns[data.column] = column
          setColumns([...columns])
          props.socket.emit('updateColumns', columns)
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
          count += (card.votes[id]) ? card.votes[id] : 0
        })
        votes.total -= count
        setVotes({ ...votes })
        columns.splice(data.id, 1)
        const updatedColumns = [...columns]
        setColumns(updatedColumns)
        props.socket.emit('updateColumns', updatedColumns)
      }
    }
  }, [props.deleteColumn])

  return (
    <Container fluid className="appContainer">
      <Row>
        <Col>
          <Row className="justify-content-md-center">
            <img className="logoImage" src={Warrimoo} />
          </Row>
          <Row className="justify-content-md-center">
            <img className="logo" src={RetroooGta} />
          </Row>
        </Col>
      </Row>
      {!template
        ? <TemplateSelector setTemplate={setTemplate} votes={votes} setVotes={setVotes} socket={props.socket} />
        : <Board type={template} votes={votes} voteFunctions={{ upVote: upVote, downVote: downVote }} resetBoard={resetBoard} socket={props.socket} columns={columns} setColumns={setColumns} id={id} deleteColumn={props.deleteColumn} />
      }
    </Container>
  )
}

Dashboard.propTypes = {
  socket: PropTypes.any,
  join: PropTypes.any,
  setJoin: PropTypes.any,
  resetBoard: PropTypes.any,
  setResetBoard: PropTypes.any,
  templateData: PropTypes.any,
  votesData: PropTypes.any,
  columnsData: PropTypes.any,
  deleteCard: PropTypes.any,
  deleteColumn: PropTypes.any
}

export default Dashboard
