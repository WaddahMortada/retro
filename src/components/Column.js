import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { toTitleCase } from '../lib/helpers'
import Card from './Card'

const Column = props => {
  const CardsComponent = []
  const [cards, setCards] = useState([])
  const [edit, setEdit] = useState(false)

  const addCard = () => {
    setCards([...cards, { value: null, upVote: 0 }])
  }

  const updateCard = (card, index) => {
    cards[index] = card
    setCards([...cards])
  }

  const deleteCard = (index) => {
    cards.splice(index, 1)
    setCards([...cards])
  }

  cards.forEach((card, key) => {
    CardsComponent.push(
      <Card
        key={key}
        index={key}
        card={card}
        OnUpdateCard={updateCard}
        OnDeleteCard={deleteCard}
        votefunctions={props.votefunctions}
        votes={props.votes}
      />
    )
  })

  const EditTitle = <div>
    <input type="text" value={toTitleCase(props.title)} onChange={(e) => props.setColumnTitle(props.index, e.target.value)} />
    <button onClick={() => setEdit(false)}>Edit</button>
  </div>

  const DisplayTitle = <div>
    <h3>{toTitleCase(props.title)}</h3>
    <button onClick={() => setEdit(true)}>Edit</button>
  </div>

  return (
    <div className="column">
      {edit ? EditTitle : DisplayTitle}
      <button onClick={() => props.deleteColumn(props.index)}>Delete</button>
      <button onClick={() => addCard()}>+</button>
      {CardsComponent}
    </div>
  )
}

Column.propTypes = {
  index: PropTypes.any,
  title: PropTypes.any,
  votefunctions: PropTypes.any,
  votes: PropTypes.any,
  setColumnTitle: PropTypes.any,
  deleteColumn: PropTypes.any
}

export default Column
