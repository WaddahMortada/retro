import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Card from './Card'
import Confirm from './Confirm'
import { didUserVote } from '../lib/helpers'
import CardBootstrap from 'react-bootstrap/Card'
import { Row, Col, Button } from 'react-bootstrap'
import { faPlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Column = props => {
  const CardsComponent = []
  const [tempCard, setTempCard] = useState()
  const [tempCardValue, setTempCardValue] = useState()
  const [position, setPosition] = useState()
  const [edit, setEdit] = useState(false)
  const [title, setTitle] = useState()
  const [displayConfirm, setDisplayConfirm] = useState(false)

  const handleClose = () => setDisplayConfirm(false)
  const handleShow = () => setDisplayConfirm(true)

  useEffect(() => {
    setTitle(props.column.title)
  }, [props.column.title])

  const submit = event => {
    event.preventDefault()
    props.column.title = title
    props.columnFunctions.update(props.index, props.column)
    setEdit(false)
  }

  const addCard = () => {
    setTempCard({ value: '', totalVotes: 0, id: props.id, votes: {}, group: { id: 0, colour: '' } })
  }

  const updateTempCard = card => {
    deleteTempCard()
    props.column.cards.push(card)
    props.columnFunctions.update(props.index, props.column)
  }

  const deleteTempCard = () => {
    setTempCard()
    setTempCardValue()
  }

  const updateCard = (card, index) => {
    props.column.cards[index] = card
    props.columnFunctions.update(props.index, props.column)
  }

  const deleteCard = index => {
    const id = props.column.cards[index].id
    props.column.cards.splice(index, 1)
    props.columnFunctions.update(props.index, props.column, false)
    props.socket.emit('deleteCard', { board: props.board, column: props.index, card: index, id: id })
  }

  const deleteColumn = () => {
    props.column.cards.map(card => {
      if (didUserVote(props.id, card.votes)) props.voteFunctions.downVote()
    })
    props.columnFunctions.delete(props.index)
    props.socket.emit('deleteColumn', { board: props.board, id: props.index, title: props.column.title })
    setEdit(false)
    handleClose()
  }

  props.column.cards.forEach((card, key) => {
    CardsComponent.push(
      <Card
        key={key}
        index={key}
        card={card}
        cardFunctions={{ update: updateCard, delete: deleteCard }}
        voteFunctions={props.voteFunctions}
        votes={props.votes}
        id={props.id}
        admin={props.admin}
        position={position}
        setPosition={setPosition}
      />
    )
  })

  if (tempCard) {
    CardsComponent.push(
      <Card
        key={CardsComponent.length}
        index={CardsComponent.length}
        card={tempCard}
        cardFunctions={{ update: updateTempCard, delete: deleteTempCard }}
        voteFunctions={props.voteFunctions}
        votes={props.votes}
        id={props.id}
        tempCard={true}
        tempCardValue={tempCardValue}
        setTempCardValue={setTempCardValue}
        position={position}
        setPosition={setPosition}
      />
    )
  }

  useEffect(() => {
    if (props.deleteColumn && props.deleteColumn.id === props.index) {
      deleteTempCard()
    }
  }, [props.deleteColumn])

  const EditTitle = <form onSubmit={submit}>
    <input className="editColumnInput" type="text" autoFocus value={title} onChange={(e) => setTitle(e.target.value)} required />
    <Button className="float-right columnButton" size="sm" variant="danger" onClick={handleShow}>
      <FontAwesomeIcon className="icon-thumb" icon={faTrash} />
    </Button>
    <Button className="float-right" size="sm" variant="edit" onClick={submit}>
      <FontAwesomeIcon className="icon-thumb" icon={faPen} />
    </Button>
  </form>

  const EditButton = <Button className="float-right" size="sm" variant="flat" onClick={() => setEdit(true)}>
    <FontAwesomeIcon className="icon-thumb" icon={faPen} />
  </Button>

  const DisplayTitle = <div>
    <h5 className="inlineBlock">{props.column.title}</h5>
    {props.admin ? EditButton : null}
  </div>

  return (
    <CardBootstrap className="columnCard fullHeight">
      <CardBootstrap.Header className="columnCardHeader">
        {edit ? EditTitle : DisplayTitle}
        <Button variant="dark" className="addCardButton" onClick={() => addCard()}>
          <FontAwesomeIcon className="icon-thumb" icon={faPlus} />
        </Button>
      </CardBootstrap.Header>
      {displayConfirm ? <Confirm type="delete" submit={deleteColumn} show={displayConfirm} handleClose={handleClose} /> : null}
      <CardBootstrap.Body className="cardBody">
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
  admin: PropTypes.any,
  socket: PropTypes.any,
  deleteColumn: PropTypes.any,
  board: PropTypes.any
}

export default Column
