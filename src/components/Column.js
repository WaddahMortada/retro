import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { toTitleCase } from '../lib/helpers'
import Card from './Card'
import { Col, Button } from 'react-bootstrap'

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

  const EditTitle = <div>
    <input type="text" value={toTitleCase(props.column.title)} onChange={(e) => updateColumnTitle(e.target.value)} />
    <Button variant="info" onClick={() => setEdit(false)}>Edit</Button>
  </div>

  const DisplayTitle = <div className="inlineBlock">
    <h5 className="inlineBlock">{toTitleCase(props.column.title)}</h5>
    <Button variant="info" className="inlineBlock" onClick={() => setEdit(true)}>Edit</Button>
  </div>

  return (
    <Col>
      {edit ? EditTitle : DisplayTitle}
      <Button variant="danger" className="inlineBlock" onClick={() => deleteColumn()}>Delete</Button>
      <div className="block">
        <Button variant="dark" className="addCardButton" onClick={() => addCard()}>+</Button>
        {CardsComponent}
      </div>
    </Col>
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
