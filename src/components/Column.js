import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { toTitleCase } from '../lib/helpers'
import Card from './Card'

const Column = props => {
  const CardsComponent = []
  const [cards, setCards] = useState([])

  const addCard = () => {
    setCards([...cards, { value: null, upVote: 0, downVote: 0 }])
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

  return (
    <div>
      <h3>{toTitleCase(props.title)}</h3>
      <button onClick={() => addCard()}>+</button>
      {CardsComponent}
    </div>
  )
}

Column.propTypes = {
  title: PropTypes.any,
  votefunctions: PropTypes.any,
  votes: PropTypes.any
}

export default Column
