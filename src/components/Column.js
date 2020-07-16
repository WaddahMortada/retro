import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { toTitleCase } from '../lib/helpers'
import Card from './Card'

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
    <button onClick={() => setEdit(false)}>Edit</button>
  </div>

  const DisplayTitle = <div className="inlineBlock">
    <h3 className="inlineBlock">{toTitleCase(props.column.title)}</h3>
    <button className="inlineBlock" onClick={() => setEdit(true)}>Edit</button>
  </div>

  return (
    <div className="column">
      {edit ? EditTitle : DisplayTitle}
      <button className="inlineBlock" onClick={() => deleteColumn()}>Delete</button>
      <div className="block">
        <button className="addCardButton" onClick={() => addCard()}>+</button>
        {CardsComponent}
      </div>
    </div>
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
