import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { toTitleCase } from '../lib/helpers'
import Card from './Card'
import Confirm from './Confirm'
import CardBootstrap from 'react-bootstrap/Card'
import { Row, Col, Button } from 'react-bootstrap'
import { faPlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Column = props => {
  const CardsComponent = []
  const [cards, setCards] = useState([{ votes: 0 }])
  const [edit, setEdit] = useState(false)
  const [title, setTitle] = useState()
  const [displayConfirm, setDisplayConfirm] = useState(false)

  const handleClose = () => setDisplayConfirm(false)
  const handleShow = () => setDisplayConfirm(true)

  useEffect(() => {
    setTitle(props.column.title)
  }, [props.column.title])

  props.socket.on('updateColummnTitle', column => {
    if (props.index === column.index) {
      props.column.title = column.title
      props.columnFunctions.update(column.index, props.column)
    }
  })

  props.socket.on('addCard', data => {
    if (props.index === data.index) {
      props.column.cards.push(data.card)
      props.columnFunctions.update(data.index, props.column, false)
    }
  })

  props.socket.on('updateCard', data => {
    if (props.index === data.index) {
      props.column.cards[data.index] = data.card
      props.columnFunctions.update(data.index, props.column)
    }
  })

  props.socket.on('deleteCard', data => {
    if (props.index === data.columnIndex) {
      props.column.cards.splice(data.cardIndex, 1)
      props.columnFunctions.update(data.columnIndex, props.column)
    }
  })

  props.socket.on('deleteColumn', index => {
    if (props.index === index) {
      props.column.cards.map((card, key) => {
        for (let i = cards[key].votes; i > 0; i--) {
          props.voteFunctions.downVote()
        }
      })
      props.columnFunctions.delete(index)
    }
  })

  const submit = (event) => {
    event.preventDefault()
    props.column.title = title
    props.columnFunctions.update(props.index, props.column)

    // emit update title column event
    props.socket.emit('updateColummnTitle', { index: props.index, title: title })

    setEdit(false)
  }

  const addCard = () => {
    cards.push({ votes: 0 })
    setCards([...cards])

    props.column.cards.push({ value: '', totalCardVotes: 0, id: props.id })
    props.columnFunctions.update(props.index, props.column, false)

    // emit add card event
    props.socket.emit('addCard', { index: props.index, card: { value: '', totalCardVotes: 0, id: props.id } })
  }

  const updateCard = (index, card, votes) => {
    cards[index] = { votes: votes}
    setCards([...cards])

    props.column.cards[index] = card
    props.columnFunctions.update(props.index, props.column)

    // emit update card event
    props.socket.emit('updateCard', { index: index, card: card })
  }

  const deleteCard = (index) => {
    cards.splice(index, 1)
    setCards([...cards])

    props.column.cards.splice(index, 1)
    props.columnFunctions.update(props.index, props.column)

    // emit delete card event
    props.socket.emit('deleteCard', { columnIndex: props.index, cardIndex: index })
  }

  const deleteColumn = () => {
    props.column.cards.map((card, key) => {
      for (let i = cards[key].votes; i > 0; i--) {
        props.voteFunctions.downVote()
      }
    })
    props.columnFunctions.delete(props.index)

    // emit delete column event
    props.socket.emit('deleteColumn', props.index)

    setCards([{ votes: 0 }])
    setEdit(false)
    handleClose()
  }

  props.column.cards.forEach((card, key) => {
    // if (cards[key] === 'undefined') {
    //   cards.push({ votes: 0 })
    //   setCards([...cards])
    // }
    CardsComponent.push(
      <Card
        key={key}
        index={key}
        card={card}
        cardFunctions={{ update: updateCard, delete: deleteCard }}
        voteFunctions={props.voteFunctions}
        votes={props.votes}
        localVotes={cards[key] ? cards[key].votes : 0}
        id={props.id}
        socket={props.socket}
      />
    )
  })

  const EditTitle = <form onSubmit={submit}>
    <input className="editColumnInput" type="text" autoFocus value={title} onChange={(e) => setTitle(e.target.value)} required />
    <Button className="float-right columnButton" size="sm" variant="danger" onClick={handleShow}>
      <FontAwesomeIcon className="icon-thumb" icon={faTrash} />
    </Button>
    <Button className="float-right" size="sm" variant="info" onClick={submit}>
      <FontAwesomeIcon className="icon-thumb" icon={faPen} />
    </Button>
  </form>

  const DisplayTitle = <div>
    <h5 className="inlineBlock">{toTitleCase(props.column.title)}</h5>
    <Button className="float-right" size="sm" variant="flat" onClick={() => setEdit(true)}>
      <FontAwesomeIcon className="icon-thumb" icon={faPen} />
    </Button>
  </div>

  return (
    <CardBootstrap className="columnCard fullHeight">
      <CardBootstrap.Header>
        {edit ? EditTitle : DisplayTitle}
        <Button variant="dark" className="addCardButton" onClick={() => addCard()}>
          <FontAwesomeIcon className="icon-thumb" icon={faPlus} />
        </Button>
      </CardBootstrap.Header>
      {displayConfirm ? <Confirm type="delete" submit={deleteColumn} show={displayConfirm} handleClose={handleClose} /> : null}
      <CardBootstrap.Body>
        <Row>
          <Col>
            {CardsComponent}
          </Col>
        </Row>
      </CardBootstrap.Body>
    </CardBootstrap>
  )
}

Column.propTypes = {
  index: PropTypes.any,
  column: PropTypes.any,
  voteFunctions: PropTypes.any,
  votes: PropTypes.any,
  setColumnTitle: PropTypes.any,
  columnFunctions: PropTypes.any,
  id: PropTypes.any,
  socket: PropTypes.any
}

export default Column
