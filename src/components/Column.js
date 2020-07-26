import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { toTitleCase } from '../lib/helpers'
import Card from './Card'
import CardBootstrap from 'react-bootstrap/Card'
import { Row, Col, Button } from 'react-bootstrap'

const Column = props => {
  const CardsComponent = []
  const [edit, setEdit] = useState(false)

  const addCard = () => {
    props.column.cards.push({ value: '', upVote: 0 })
    props.columnFunctions.update(props.index, props.column)
  }

  const updateCard = (index, card) => {
    props.column.cards[index] = card
    props.columnFunctions.update(props.index, props.column)
  }

  const deleteCard = (index) => {
    props.column.cards.splice(index, 1)
    props.columnFunctions.update(props.index, props.column)
  }

  const deleteColumn = () => {
    props.column.cards.map(card => {
      for (let index = card.upVote; index > 0; index--) {
        props.voteFunctions.downVote()
      }
    })
    props.columnFunctions.delete(props.index)
  }

  const updateColumnTitle = title => {
    props.column.title = title
    props.columnFunctions.update(props.index, props.column)
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
      />
    )
  })

  const DeleteButton = <Button className="float-right" size="sm" variant="danger" onClick={() => deleteColumn()}>Delete</Button>

  const EditTitle = <div>
    <input type="text" value={toTitleCase(props.column.title)} onChange={(e) => updateColumnTitle(e.target.value)} />
    {DeleteButton}
    <Button className="float-right" size="sm" variant="info" onClick={() => setEdit(false)}>Edit</Button>
  </div>

  const DisplayTitle = <div>
    <h5 className="inlineBlock">{toTitleCase(props.column.title)}</h5>
    {DeleteButton}
    <Button className="float-right" size="sm" variant="info" onClick={() => setEdit(true)}>Edit</Button>
  </div>

  return (
    <CardBootstrap className="boardCard">
      <CardBootstrap.Header>
        {edit ? EditTitle : DisplayTitle}
        <Button variant="dark" className="addCardButton" onClick={() => addCard()}>+</Button>
      </CardBootstrap.Header>
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
  columnFunctions: PropTypes.any
}

export default Column
