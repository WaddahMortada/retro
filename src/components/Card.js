import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AddEditCard from './Action/Card/AddEdit'
import ViewCard from './Action/Card/View'

const Card = props => {
  const [edit, setEdit] = useState(false)

  const updateCardValue = card => {
    props.OnUpdateCard(card)
    if (edit) setEdit(false)
  }

  const deleteCard = () => {
    setEdit(false)
    props.OnDeleteCard(props.index)
  }

  return (
    <div>
      {(props.card.value && !edit) ? <ViewCard OnUpVote={updateCardValue} card={props.card} setEdit={setEdit} votefunctions={props.votefunctions} votes={props.votes} /> : <AddEditCard index={props.index} card={props.card} updateCardValue={updateCardValue} deleteCard={deleteCard} />}
    </div>
  )
}

Card.propTypes = {
  card: PropTypes.any,
  index: PropTypes.any,
  OnUpdateCard: PropTypes.any,
  OnDeleteCard: PropTypes.any,
  votefunctions: PropTypes.any,
  votes: PropTypes.any
}

export default Card
